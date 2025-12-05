import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Html } from '@react-three/drei';
import { Suspense, useState, useRef, useEffect } from 'react';
import CarModel from './CarModel';
import ControlPanel from './ControlPanel';
import CameraControls from './CameraControls';

function LoadingIndicator() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-semibold">Loading 3D Model...</p>
      </div>
    </Html>
  );
}

export default function CarViewer() {
  const [carColor, setCarColor] = useState('#e74c3c');
  const [paintFinish, setPaintFinish] = useState<'matte' | 'gloss' | 'metallic' | 'chrome'>('gloss');
  const [environment] = useState<'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park'>('city');
  const [showShadow] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [windowTint, setWindowTint] = useState(0.3); // 0 = clear, 1 = darkest
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([5, 2, 5]);
  const [autoSpin, setAutoSpin] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [brightness, setBrightness] = useState(1.5);
  const [shadowIntensity, setShadowIntensity] = useState(0.3);
  const [fov, setFov] = useState(50);
  const controlsRef = useRef<any>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (color: string) => {
    setCarColor(color);
  };

  const handleFinishChange = (finish: 'matte' | 'gloss' | 'metallic' | 'chrome') => {
    setPaintFinish(finish);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only handle wheel events when not over the control panel
      const target = e.target as HTMLElement;
      if (target.closest('.control-panel')) return;

      e.preventDefault();
      const delta = e.deltaY;
      const newFov = Math.max(30, Math.min(75, fov + delta * 0.05));
      setFov(newFov);
    };

    const canvasElement = canvasRef.current;
    if (canvasElement) {
      canvasElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [fov]);

  const handleCameraPreset = (preset: string) => {
    const presets: Record<string, [number, number, number]> = {
      front: [0, 1, 6],
      side: [7, 1, 0],
      rear: [0, 1, -6],
      top: [0, 8, 0],
      default: [5, 2, 5],
    };

    // Force remount of CarModel to reset rotation
    setResetKey(prev => prev + 1);

    // Update camera position
    setCameraPosition(presets[preset] || presets.default);

    // Reset orbit controls
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0.5, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div ref={canvasRef} className="w-full h-screen">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />

        {/* Lighting Setup */}
        <ambientLight intensity={0.4 * brightness} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={brightness}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          position={[-5, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5 * brightness}
          castShadow
        />

        {/* Environment for reflections */}
        <Environment preset={environment} />

        {/* Car Model */}
        <Suspense fallback={<LoadingIndicator />}>
          <CarModel key={resetKey} color={carColor} finish={paintFinish} wireframe={wireframe} windowTint={windowTint} autoSpin={autoSpin} rotationSpeed={rotationSpeed} />
        </Suspense>

        {/* Ground plane */}
        {showShadow && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <shadowMaterial opacity={shadowIntensity} />
          </mesh>
        )}

        {/* Camera Controls */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.1}
          target={[0, 0.5, 0]}
        />
      </Canvas>


      {/* Camera Controls - Auto-hiding top center */}
      <CameraControls
        onCameraPreset={handleCameraPreset}
        autoSpin={autoSpin}
        onToggleAutoSpin={() => setAutoSpin(!autoSpin)}
        wireframe={wireframe}
        onToggleWireframe={() => setWireframe(!wireframe)}
      />

      {/* Control Panel */}
      <ControlPanel
        onColorChange={handleColorChange}
        onFinishChange={handleFinishChange}
        onWindowTintChange={setWindowTint}
        onRotationSpeedChange={setRotationSpeed}
        onBrightnessChange={setBrightness}
        onShadowIntensityChange={setShadowIntensity}
        onFovChange={setFov}
        currentColor={carColor}
        windowTint={windowTint}
        rotationSpeed={rotationSpeed}
        brightness={brightness}
        shadowIntensity={shadowIntensity}
        fov={fov}
      />
    </div>
  );
}

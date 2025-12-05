import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Html } from '@react-three/drei';
import { Suspense, useState, useRef } from 'react';
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
  const [selectedParts, setSelectedParts] = useState({
    wheels: 'stock',
    spoiler: 'none',
  });
  const [environment, setEnvironment] = useState<'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park'>('city');
  const [showShadow, setShowShadow] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [windowTint, setWindowTint] = useState(0.3); // 0 = clear, 1 = darkest
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([5, 2, 5]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [autoSpin, setAutoSpin] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<any>(null);

  const handleColorChange = (color: string) => {
    setCarColor(color);
  };

  const handleFinishChange = (finish: 'matte' | 'gloss' | 'metallic' | 'chrome') => {
    setPaintFinish(finish);
  };

  const handlePartChange = (category: string, partId: string) => {
    setSelectedParts(prev => ({ ...prev, [category]: partId }));
    console.log(`${category} changed to:`, partId);
  };

  const handleScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `car-customization-${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const handleCameraPreset = (preset: string) => {
    const presets: Record<string, [number, number, number]> = {
      front: [0, 1, 6],
      side: [7, 1, 0],
      rear: [0, 1, -6],
      top: [0, 8, 0],
      default: [5, 2, 5],
    };
    setCameraPosition(presets[preset] || presets.default);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0.5, 0);
    }
  };

  const handleExportConfig = () => {
    const config = {
      color: carColor,
      finish: paintFinish,
      environment,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `car-config-${Date.now()}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />

        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          position={[-5, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Environment for reflections */}
        <Environment preset={environment} />

        {/* Car Model */}
        <Suspense fallback={<LoadingIndicator />}>
          <CarModel color={carColor} finish={paintFinish} wireframe={wireframe} windowTint={windowTint} autoSpin={autoSpin} />
        </Suspense>

        {/* Ground plane */}
        {showShadow && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
        )}

        {/* Camera Controls */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2.1}
          target={[0, 0.5, 0]}
        />
      </Canvas>

      {/* Logo */}
      <div className="absolute top-4 left-4 text-white pointer-events-none z-30">
        <h1 className="text-2xl font-bold">Car Customizer</h1>
        <p className="text-sm text-gray-400">Phase 1 MVP</p>
      </div>

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
        onPartChange={handlePartChange}
        onScreenshot={handleScreenshot}
        onWindowTintChange={setWindowTint}
        onSidebarToggle={setSidebarOpen}
        currentColor={carColor}
        windowTint={windowTint}
      />
    </div>
  );
}

import { useState, useEffect } from 'react';

interface CameraControlsProps {
  onCameraPreset?: (preset: string) => void;
  autoSpin?: boolean;
  onToggleAutoSpin?: () => void;
  wireframe?: boolean;
  onToggleWireframe?: () => void;
}

export default function CameraControls({ onCameraPreset, autoSpin, onToggleAutoSpin, wireframe, onToggleWireframe }: CameraControlsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show when mouse is near the top (within 80px)
      if (e.clientY < 80) {
        setIsVisible(true);
      } else if (e.clientY > 150) {
        // Hide when mouse moves away
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-300 flex gap-2 ${
      isVisible ? 'top-4' : '-top-20'
    }`}>
      <button
        onClick={() => onCameraPreset?.('front')}
        className="px-4 h-12 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center group"
        title="Front View"
      >
        <span className="text-sm font-semibold text-gray-400 group-hover:text-white">FRONT</span>
      </button>
      <button
        onClick={() => onCameraPreset?.('side')}
        className="px-4 h-12 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center group"
        title="Side View"
      >
        <span className="text-sm font-semibold text-gray-400 group-hover:text-white">SIDE</span>
      </button>
      <button
        onClick={() => onCameraPreset?.('rear')}
        className="px-4 h-12 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center group"
        title="Rear View"
      >
        <span className="text-sm font-semibold text-gray-400 group-hover:text-white">REAR</span>
      </button>
      <button
        onClick={() => onCameraPreset?.('top')}
        className="px-4 h-12 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center group"
        title="Top View"
      >
        <span className="text-sm font-semibold text-gray-400 group-hover:text-white">TOP</span>
      </button>
      <button
        onClick={() => onCameraPreset?.('default')}
        className="px-4 h-12 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center group"
        title="Reset View"
      >
        <span className="text-sm font-semibold text-gray-400 group-hover:text-white">RESET</span>
      </button>
      <button
        onClick={onToggleAutoSpin}
        className={`px-4 h-12 rounded-lg transition-colors flex items-center justify-center group ${
          autoSpin ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-800 hover:bg-orange-600'
        }`}
        title={autoSpin ? "Stop Auto-Spin" : "Start Auto-Spin"}
      >
        <span className="text-sm font-semibold text-white">SPIN</span>
      </button>
      <button
        onClick={onToggleWireframe}
        className={`px-4 h-12 rounded-lg transition-colors flex items-center justify-center group ${
          wireframe ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-800 hover:bg-orange-600'
        }`}
        title={wireframe ? "Disable Wireframe" : "Enable Wireframe"}
      >
        <span className="text-sm font-semibold text-white">WIRE</span>
      </button>
    </div>
  );
}

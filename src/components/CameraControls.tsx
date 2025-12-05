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
    <div className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
      isVisible ? 'top-6' : '-top-24'
    }`}>
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl px-4 py-3 border border-gray-800">
        <div className="flex gap-3">
          {/* View Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => onCameraPreset?.('front')}
              className="px-4 h-11 bg-gray-800/80 hover:bg-orange-600 rounded-xl transition-all flex items-center justify-center group shadow-lg hover:shadow-orange-600/50"
              title="Front View"
            >
              <span className="text-sm font-semibold text-gray-300 group-hover:text-white">FRONT</span>
            </button>
            <button
              onClick={() => onCameraPreset?.('side')}
              className="px-4 h-11 bg-gray-800/80 hover:bg-orange-600 rounded-xl transition-all flex items-center justify-center group shadow-lg hover:shadow-orange-600/50"
              title="Side View"
            >
              <span className="text-sm font-semibold text-gray-300 group-hover:text-white">SIDE</span>
            </button>
            <button
              onClick={() => onCameraPreset?.('rear')}
              className="px-4 h-11 bg-gray-800/80 hover:bg-orange-600 rounded-xl transition-all flex items-center justify-center group shadow-lg hover:shadow-orange-600/50"
              title="Rear View"
            >
              <span className="text-sm font-semibold text-gray-300 group-hover:text-white">REAR</span>
            </button>
            <button
              onClick={() => onCameraPreset?.('top')}
              className="px-4 h-11 bg-gray-800/80 hover:bg-orange-600 rounded-xl transition-all flex items-center justify-center group shadow-lg hover:shadow-orange-600/50"
              title="Top View"
            >
              <span className="text-sm font-semibold text-gray-300 group-hover:text-white">TOP</span>
            </button>
            <button
              onClick={() => onCameraPreset?.('default')}
              className="px-4 h-11 bg-gray-800/80 hover:bg-orange-600 rounded-xl transition-all flex items-center justify-center group shadow-lg hover:shadow-orange-600/50"
              title="Reset View"
            >
              <span className="text-sm font-semibold text-gray-300 group-hover:text-white">RESET</span>
            </button>
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-700"></div>

          {/* Toggle Controls */}
          <div className="flex gap-2">
            <button
              onClick={onToggleAutoSpin}
              className={`px-4 h-11 rounded-xl transition-all flex items-center justify-center shadow-lg ${
                autoSpin
                  ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/50'
                  : 'bg-gray-800/80 hover:bg-orange-600 hover:shadow-orange-600/50'
              }`}
              title={autoSpin ? "Stop Auto-Spin" : "Start Auto-Spin"}
            >
              <span className="text-sm font-semibold text-white">SPIN</span>
            </button>
            <button
              onClick={onToggleWireframe}
              className={`px-4 h-11 rounded-xl transition-all flex items-center justify-center shadow-lg ${
                wireframe
                  ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/50'
                  : 'bg-gray-800/80 hover:bg-orange-600 hover:shadow-orange-600/50'
              }`}
              title={wireframe ? "Disable Wireframe" : "Enable Wireframe"}
            >
              <span className="text-sm font-semibold text-white">WIRE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

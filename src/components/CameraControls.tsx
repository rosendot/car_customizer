import { useState, useEffect } from 'react';

interface CameraControlsProps {
  onCameraPreset?: (preset: string) => void;
}

export default function CameraControls({ onCameraPreset }: CameraControlsProps) {
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
        className="w-12 h-12 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center group"
        title="Front View"
      >
        <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
      <button
        onClick={() => onCameraPreset?.('side')}
        className="w-12 h-12 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center group"
        title="Side View"
      >
        <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </button>
      <button
        onClick={() => onCameraPreset?.('rear')}
        className="w-12 h-12 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center group"
        title="Rear View"
      >
        <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
      </button>
      <button
        onClick={() => onCameraPreset?.('top')}
        className="w-12 h-12 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center group"
        title="Top View"
      >
        <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      <button
        onClick={() => onCameraPreset?.('default')}
        className="w-12 h-12 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center group"
        title="Reset View"
      >
        <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
}

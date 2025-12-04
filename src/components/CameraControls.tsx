interface CameraControlsProps {
  onCameraPreset?: (preset: string) => void;
  sidebarOpen?: boolean;
}

export default function CameraControls({ onCameraPreset, sidebarOpen }: CameraControlsProps) {
  return (
    <div className={`fixed top-20 z-40 flex flex-col gap-2 transition-all duration-300 ${
      sidebarOpen ? 'right-[336px]' : 'right-4'
    }`}>
      {/* Camera preset buttons in a compact grid */}
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <div className="grid grid-cols-2 gap-2">
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
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={() => onCameraPreset?.('default')}
        className="bg-gray-900/90 backdrop-blur-sm hover:bg-orange-600 rounded-lg transition-colors px-4 py-2 shadow-lg text-sm font-medium text-gray-300 hover:text-white"
        title="Reset View"
      >
        🔄 Reset
      </button>
    </div>
  );
}

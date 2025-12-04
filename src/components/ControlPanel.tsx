import { useState } from 'react';

interface ControlPanelProps {
  onColorChange?: (color: string) => void;
  onFinishChange?: (finish: 'matte' | 'gloss' | 'metallic' | 'chrome') => void;
  onPartChange?: (category: string, partId: string) => void;
  onScreenshot?: () => void;
  onCameraPreset?: (preset: string) => void;
  onEnvironmentChange?: (env: string) => void;
  onToggleShadow?: () => void;
  onToggleWireframe?: () => void;
  onExportConfig?: () => void;
  currentColor?: string;
  currentEnvironment?: string;
  showShadow?: boolean;
  wireframe?: boolean;
}

export default function ControlPanel({
  onColorChange,
  onFinishChange,
  onPartChange,
  onScreenshot,
  onCameraPreset,
  onEnvironmentChange,
  onToggleShadow,
  onToggleWireframe,
  onExportConfig,
  currentColor,
  currentEnvironment,
  showShadow,
  wireframe
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [customColor, setCustomColor] = useState(currentColor || '#e74c3c');

  // Function to determine if color is light or dark for text contrast
  const isLightColor = (hexColor: string) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  const paintColors = [
    { name: 'Red', value: '#e74c3c' },
    { name: 'Blue', value: '#3498db' },
    { name: 'Black', value: '#1a1a1a' },
    { name: 'White', value: '#ecf0f1' },
    { name: 'Yellow', value: '#f1c40f' },
    { name: 'Green', value: '#2ecc71' },
    { name: 'Orange', value: '#e67e22' },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
      >
        {isOpen ? '✕ Close' : '⚙ Customize'}
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold">Customize</h2>
            <p className="text-gray-400 text-sm mt-1">2010 Ford Fusion</p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Paint Color</h3>
                <div className="grid grid-cols-4 gap-3">
                  {paintColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => onColorChange?.(color.value)}
                      className="aspect-square rounded-lg border-2 border-gray-700 hover:border-orange-500 transition-all hover:scale-110"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                  {/* Custom Color Picker as last square */}
                  <div className="relative aspect-square rounded-lg border-2 border-gray-700 hover:border-orange-500 transition-all hover:scale-110 overflow-hidden">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value);
                        onColorChange?.(e.target.value);
                      }}
                      className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                      title="Custom Color"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-4">Finish</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      name: 'Matte',
                      value: 'matte' as const,
                      description: 'Flat, no shine',
                      getGradient: (color: string) => `linear-gradient(135deg, ${color} 0%, ${color} 100%)`
                    },
                    {
                      name: 'Gloss',
                      value: 'gloss' as const,
                      description: 'Shiny, reflective',
                      getGradient: (color: string) => `linear-gradient(135deg, #ffffff 0%, ${color} 50%, ${color}dd 100%)`
                    },
                    {
                      name: 'Metallic',
                      value: 'metallic' as const,
                      description: 'Metal flake',
                      getGradient: (color: string) => `linear-gradient(135deg, ${color}ff 0%, ${color}cc 40%, ${color}88 60%, ${color}cc 100%)`
                    },
                    {
                      name: 'Chrome',
                      value: 'chrome' as const,
                      description: 'Mirror finish',
                      getGradient: (color: string) => `linear-gradient(135deg, #ffffff 0%, ${color}aa 20%, #ffffff 40%, ${color}88 60%, #ffffff 80%, ${color}aa 100%)`
                    }
                  ].map((finish) => {
                    const activeColor = currentColor || customColor;
                    const textColor = isLightColor(activeColor) ? 'text-gray-900' : 'text-white';
                    return (
                      <button
                        key={finish.value}
                        onClick={() => onFinishChange?.(finish.value)}
                        className="relative overflow-hidden rounded-lg border-2 border-gray-700 hover:border-orange-500 transition-all hover:scale-105 group"
                      >
                        <div
                          className="absolute inset-0 transition-all duration-300"
                          style={{ background: finish.getGradient(activeColor) }}
                        />
                        <div className="relative py-4 px-3 text-center">
                          <div className={`font-semibold ${textColor} drop-shadow-lg transition-colors duration-300`}>{finish.name}</div>
                          <div className={`text-xs ${textColor} drop-shadow-md mt-1 transition-colors duration-300`}>{finish.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Camera Presets */}
                <h3 className="text-lg font-semibold mt-6 mb-4">Camera Views</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Front', value: 'front' },
                    { name: 'Side', value: 'side' },
                    { name: 'Rear', value: 'rear' },
                    { name: 'Top', value: 'top' },
                  ].map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => onCameraPreset?.(preset.value)}
                      className="py-2 px-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => onCameraPreset?.('default')}
                  className="w-full mt-2 py-2 px-3 bg-gray-800 rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  Reset View
                </button>

                {/* Environment */}
                <h3 className="text-lg font-semibold mt-6 mb-4">Environment</h3>
                <select
                  value={currentEnvironment}
                  onChange={(e) => onEnvironmentChange?.(e.target.value)}
                  className="w-full py-3 px-4 bg-gray-800 rounded-lg border-2 border-gray-700 focus:border-orange-500 outline-none cursor-pointer"
                >
                  <option value="sunset">Sunset</option>
                  <option value="dawn">Dawn</option>
                  <option value="night">Night</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="forest">Forest</option>
                  <option value="apartment">Apartment</option>
                  <option value="studio">Studio</option>
                  <option value="city">City</option>
                  <option value="park">Park</option>
                </select>

                {/* View Options */}
                <h3 className="text-lg font-semibold mt-6 mb-4">View Options</h3>
                <div className="space-y-2">
                  <button
                    onClick={onToggleShadow}
                    className={`w-full py-3 px-4 rounded-lg transition-colors text-left ${
                      showShadow ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {showShadow ? '✓' : '○'} Ground Shadow
                  </button>
                  <button
                    onClick={onToggleWireframe}
                    className={`w-full py-3 px-4 rounded-lg transition-colors text-left ${
                      wireframe ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {wireframe ? '✓' : '○'} Wireframe Mode
                  </button>
                </div>
              </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700 space-y-2">
            <button
              onClick={onScreenshot}
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors"
            >
              📸 Screenshot
            </button>
            <button
              onClick={onExportConfig}
              className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
            >
              💾 Export Config
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

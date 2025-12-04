import { useState } from 'react';

interface ControlPanelProps {
  onColorChange?: (color: string) => void;
  onFinishChange?: (finish: 'matte' | 'gloss' | 'metallic' | 'chrome') => void;
  onPartChange?: (category: string, partId: string) => void;
  onScreenshot?: () => void;
  onEnvironmentChange?: (env: string) => void;
  onToggleShadow?: () => void;
  onToggleWireframe?: () => void;
  onWindowTintChange?: (tint: number) => void;
  onExportConfig?: () => void;
  onSidebarToggle?: (isOpen: boolean) => void;
  currentColor?: string;
  currentEnvironment?: string;
  showShadow?: boolean;
  wireframe?: boolean;
  windowTint?: number;
}

export default function ControlPanel({
  onColorChange,
  onFinishChange,
  onPartChange,
  onScreenshot,
  onEnvironmentChange,
  onToggleShadow,
  onToggleWireframe,
  onWindowTintChange,
  onExportConfig,
  onSidebarToggle,
  currentColor,
  currentEnvironment,
  showShadow,
  wireframe,
  windowTint
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [customColor, setCustomColor] = useState(currentColor || '#e74c3c');
  const [finishIndex, setFinishIndex] = useState(0);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onSidebarToggle?.(newState);
  };

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

  const finishOptions = [
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
  ];

  const handlePrevFinish = () => {
    const newIndex = (finishIndex - 1 + finishOptions.length) % finishOptions.length;
    setFinishIndex(newIndex);
    onFinishChange?.(finishOptions[newIndex].value);
  };

  const handleNextFinish = () => {
    const newIndex = (finishIndex + 1) % finishOptions.length;
    setFinishIndex(newIndex);
    onFinishChange?.(finishOptions[newIndex].value);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
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
                <div className="relative">
                  {/* Carousel */}
                  <div className="flex items-center gap-3">
                    {/* Previous Button */}
                    <button
                      onClick={handlePrevFinish}
                      className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center"
                      aria-label="Previous finish"
                    >
                      <span className="text-xl">‹</span>
                    </button>

                    {/* Current Finish Display */}
                    <div className="flex-1 relative overflow-hidden rounded-lg border-2 border-gray-700 min-h-[120px]">
                      {finishOptions.map((finish, index) => {
                        const activeColor = currentColor || customColor;
                        const textColor = isLightColor(activeColor) ? 'text-gray-900' : 'text-white';
                        const isActive = index === finishIndex;

                        return (
                          <div
                            key={finish.value}
                            className={`absolute inset-0 transition-all duration-500 ${
                              isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
                            }`}
                          >
                            <div
                              className="absolute inset-0 transition-all duration-300"
                              style={{ background: finish.getGradient(activeColor) }}
                            />
                            <div className="relative h-full flex flex-col items-center justify-center py-6 px-4 text-center">
                              <div className={`text-2xl font-bold ${textColor} drop-shadow-lg transition-colors duration-300`}>
                                {finish.name}
                              </div>
                              <div className={`text-sm ${textColor} drop-shadow-md mt-2 transition-colors duration-300`}>
                                {finish.description}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={handleNextFinish}
                      className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center"
                      aria-label="Next finish"
                    >
                      <span className="text-xl">›</span>
                    </button>
                  </div>

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-4">
                    {finishOptions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setFinishIndex(index);
                          onFinishChange?.(finishOptions[index].value);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === finishIndex ? 'bg-orange-500 w-6' : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        aria-label={`Go to ${finishOptions[index].name}`}
                      />
                    ))}
                  </div>
                </div>

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

                {/* Window Tint */}
                <h3 className="text-lg font-semibold mt-6 mb-4">Window Tint</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={windowTint}
                    onChange={(e) => onWindowTintChange?.(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Clear</span>
                    <span className="text-white font-semibold">{Math.round((windowTint || 0) * 100)}%</span>
                    <span>Dark</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Clear', value: 0 },
                      { label: 'Light', value: 0.35 },
                      { label: 'Medium', value: 0.65 },
                      { label: 'Dark', value: 0.9 }
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => onWindowTintChange?.(preset.value)}
                        className="py-2 px-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-xs"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

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

import { useState } from 'react';

interface ControlPanelProps {
  onColorChange?: (color: string) => void;
  onFinishChange?: (finish: 'matte' | 'gloss' | 'metallic' | 'chrome') => void;
  onWindowTintChange?: (tint: number) => void;
  currentColor?: string;
  windowTint?: number;
}

export default function ControlPanel({
  onColorChange,
  onFinishChange,
  onWindowTintChange,
  currentColor,
  windowTint
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [customColor, setCustomColor] = useState(currentColor || '#e74c3c');
  const [finishIndex, setFinishIndex] = useState(0);

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
                      className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center z-10"
                      aria-label="Previous finish"
                    >
                      <span className="text-xl">‹</span>
                    </button>

                    {/* Circular Carousel Display */}
                    <div className="flex-1 relative h-[140px] flex items-center justify-center" style={{ perspective: '1000px' }}>
                      {finishOptions.map((finish, index) => {
                        const activeColor = currentColor || customColor;
                        const textColor = isLightColor(activeColor) ? 'text-gray-900' : 'text-white';

                        // Calculate position relative to current index
                        const diff = (index - finishIndex + finishOptions.length) % finishOptions.length;
                        const adjustedDiff = diff > finishOptions.length / 2 ? diff - finishOptions.length : diff;

                        // Determine if this card should be visible
                        const isCenter = adjustedDiff === 0;
                        const isPrev = adjustedDiff === -1;
                        const isNext = adjustedDiff === 1;
                        const isVisible = isCenter || isPrev || isNext;

                        // Calculate styles based on position
                        let transform = 'translateX(-50%)';
                        let zIndex = 0;
                        let opacity = 0;
                        let scale = 0.7;

                        if (isCenter) {
                          transform = 'translateX(-50%) translateZ(0px) scale(1)';
                          zIndex = 30;
                          opacity = 1;
                          scale = 1;
                        } else if (isPrev) {
                          transform = 'translateX(-120%) translateZ(-100px) scale(0.75)';
                          zIndex = 10;
                          opacity = 0.5;
                          scale = 0.75;
                        } else if (isNext) {
                          transform = 'translateX(20%) translateZ(-100px) scale(0.75)';
                          zIndex = 10;
                          opacity = 0.5;
                          scale = 0.75;
                        }

                        return (
                          <div
                            key={finish.value}
                            className={`absolute left-1/2 transition-all duration-500 ease-out ${
                              isVisible ? 'pointer-events-auto' : 'pointer-events-none'
                            }`}
                            style={{
                              transform,
                              zIndex,
                              opacity,
                              width: '100%',
                            }}
                          >
                            <div
                              className="rounded-lg border-2 overflow-hidden transition-all duration-300"
                              style={{
                                borderColor: isCenter ? '#6b7280' : '#374151',
                                transform: `scale(${scale})`,
                              }}
                            >
                              <div
                                className="transition-all duration-300 min-h-[120px]"
                                style={{ background: finish.getGradient(activeColor) }}
                              >
                                <div className="relative h-full flex flex-col items-center justify-center py-6 px-4 text-center">
                                  <div
                                    className={`font-bold drop-shadow-lg transition-all duration-300`}
                                    style={{
                                      fontSize: isCenter ? '1.5rem' : '1.25rem',
                                      color: textColor === 'text-gray-900' ? '#1a1a1a' : '#ffffff',
                                    }}
                                  >
                                    {finish.name}
                                  </div>
                                  <div
                                    className={`drop-shadow-md mt-2 transition-all duration-300`}
                                    style={{
                                      fontSize: isCenter ? '0.875rem' : '0.75rem',
                                      color: textColor === 'text-gray-900' ? '#1a1a1a' : '#ffffff',
                                    }}
                                  >
                                    {finish.description}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={handleNextFinish}
                      className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center z-10"
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

              </div>
          </div>

        </div>
      </div>
    </>
  );
}

import { useState } from 'react';

interface ControlPanelProps {
  onColorChange?: (color: string) => void;
  onFinishChange?: (finish: 'matte' | 'gloss' | 'metallic' | 'chrome') => void;
  onPartChange?: (category: string, partId: string) => void;
  onScreenshot?: () => void;
}

export default function ControlPanel({ onColorChange, onFinishChange, onPartChange, onScreenshot }: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  const paintColors = [
    { name: 'Red', value: '#e74c3c' },
    { name: 'Blue', value: '#3498db' },
    { name: 'Black', value: '#1a1a1a' },
    { name: 'White', value: '#ecf0f1' },
    { name: 'Yellow', value: '#f1c40f' },
    { name: 'Green', value: '#2ecc71' },
    { name: 'Orange', value: '#e67e22' },
    { name: 'Purple', value: '#9b59b6' },
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
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-4">Finish</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Matte', value: 'matte' as const },
                    { name: 'Gloss', value: 'gloss' as const },
                    { name: 'Metallic', value: 'metallic' as const },
                    { name: 'Chrome', value: 'chrome' as const }
                  ].map((finish) => (
                    <button
                      key={finish.value}
                      onClick={() => onFinishChange?.(finish.value)}
                      className="w-full py-3 px-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-left hover:bg-orange-600"
                    >
                      {finish.name}
                    </button>
                  ))}
                </div>
              </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700">
            <button
              onClick={onScreenshot}
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors"
            >
              📸 Download Screenshot
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

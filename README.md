# 3D Product Configurator

**Interactive 3D configurator built with React Three Fiber. This technology can be adapted for ANY product: furniture, fashion, industrial equipment, jewelry, and more.**

## 🚀 Quick Start

```bash
npm run dev      # Start dev server (http://localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
```

## ✨ Features

**Customization:**
- Real-time color system (7 presets + custom picker)
- Material finishes carousel (Matte, Gloss, Metallic, Chrome)
- Window tinting with presets
- Smart material detection (preserves windows, tires, chrome)

**Controls:**
- Auto-hide camera controls (Front, Side, Rear, Top views)
- Interactive sliders with Ctrl+Click reset
- Adjustable rotation speed, brightness, and zoom (0-100 range)
- Auto-spin toggle and wireframe mode

**UX:**
- 60fps performance
- Professional loading indicator
- Clean white background
- Smooth transitions throughout

## 🎮 Usage

1. **Move mouse to right edge** → Customization panel appears
2. **Move mouse to top edge** → Camera controls appear
3. **Ctrl+Click slider titles** → Reset to default (hover shows blue highlight)
4. **Left-drag** → Rotate | **Right-drag** → Pan | **Scroll** → Zoom

## 🛠️ Tech Stack

- Astro 4.16 + React 18.3
- Three.js 0.170 + React Three Fiber 8.17
- React Three Drei 9.117
- Tailwind CSS 3.4
- TypeScript 5.7

## 📁 Project Structure

```
src/
├── components/
│   ├── CarViewer.tsx       # Main 3D canvas + state
│   ├── CarModel.tsx         # Model with paint system
│   ├── ControlPanel.tsx     # Customization UI
│   └── CameraControls.tsx   # Camera presets
└── styles/
    └── global.css
```

## 💼 For Clients

**This car demo showcases technology that works for:**

- **E-Commerce**: Furniture, fashion, jewelry, home decor
- **B2B**: Machinery, architecture, manufacturing equipment
- **Custom Products**: Anything requiring visual customization

### Pricing Examples

- **Basic** ($1,500-$2,500): 5-10 colors, 2-3 finishes, screenshot feature
- **Advanced** ($3,000-$7,000): Multi-product, part swapping, cart integration
- **Enterprise** ($10,000+): Full catalog, AR mode, CRM integration

## 🎨 Technical Highlights

**Smart Material System**
- Auto-detects transparent parts (windows), dark materials (tires), bright materials (chrome)
- Applies paint only to car body without manual masking

**Interactive Sliders**
- Ctrl+Click titles to reset to center values (50% for most, 1.5x for brightness)
- Blue hover highlight with tooltips
- All ranges: 0-100% or 0-3x for clean UX

**Performance**
- 60fps target with optimized rendering
- Lazy loading with loading states
- Efficient material updates

## 🚀 Deploy

```bash
npm run build
vercel --prod
```

Requires Node.js 18+ and WebGL-compatible browser.

## 📚 Resources

- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Blender](https://www.blender.org/) (free 3D modeling)

---

*Portfolio demonstration project. Technology adaptable for client needs.*

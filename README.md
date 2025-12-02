# Car Customizer - 3D Visualization Platform

**GTA 5-inspired car customization tool where you can visualize modifications in real-time 3D, then generate your own parts from photos using AI.**

---

## 🎯 Project Vision

Build a web platform that lets users:
1. **Customize cars in 3D** - Swap parts, change colors, preview modifications
2. **Generate 3D models from photos** - Upload pictures → AI creates 3D parts
3. **Share builds** - Screenshot, share URLs, community marketplace

### The Killer Feature
> Take 30 photos of an aftermarket spoiler → AI generates 3D model → instantly see it on YOUR car

---

## 🚀 Current Status: Phase 1 - Paint System Working! ✓

**Development server running at: http://localhost:4322**

### What's Working Now ✓
- ✅ **3D Scene**: Three.js via React Three Fiber
- ✅ **Professional Lighting**: Ambient + directional + spot lights with shadows
- ✅ **HDR Environment**: Realistic reflections
- ✅ **Camera Controls**: Orbit, pan, zoom
- ✅ **Real Car Model**: 2010 Ford Fusion loaded and rendering
- ✅ **UI Controls**: Slide-out sidebar with tabbed interface
- ✅ **Paint Color Picker**: Real-time color changes (8 colors)
- ✅ **Smart Material Detection**: Automatically preserves windows, tires, chrome

### Try It Now
1. Visit http://localhost:4322
2. Click **⚙ Customize** button (top right)
3. Choose **Paint** tab
4. Click any color swatch - watch the car change instantly!
5. Interact with 3D scene:
   - **Left-click drag**: Rotate camera
   - **Right-click drag**: Pan view
   - **Scroll wheel**: Zoom

---

## 📁 Current Project Structure

```
car-customizer/
├── src/
│   ├── components/
│   │   ├── CarViewer.tsx          # Main 3D canvas + state management
│   │   ├── CarModel.tsx            # Car model with dynamic paint system
│   │   └── ControlPanel.tsx        # UI sidebar (paint, wheels, body)
│   ├── lib/
│   │   ├── carConfig.ts            # Car configurations
│   │   ├── parts.ts                # Parts catalog
│   │   └── materials.ts            # Paint/material system
│   ├── pages/
│   │   └── index.astro             # Main page
│   └── styles/
│       └── global.css
└── public/
    └── models/
        └── cars/
            └── ford-fusion.glb     # 2010 Ford Fusion model (3.1MB)
```

---

## 🛠️ Tech Stack

### Currently Installed
- **Astro 4.16** - Static site generator
- **React 18.3** - UI components
- **Three.js 0.170** - 3D engine
- **React Three Fiber 8.17** - React renderer for Three.js
- **React Three Drei 9.117** - Three.js helpers
- **Tailwind CSS 3.4** - Styling
- **TypeScript 5.7** - Type safety

### Commands
```bash
npm run dev      # Start dev server (http://localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🗺️ Development Roadmap

### **Phase 1: MVP - Prove the Concept** (Current - Months 1-2)
**Goal**: Single car with basic customization working

#### Progress ✓
- ✅ Get a real car 3D model (2010 Ford Fusion loaded)
- ✅ 3D scene rendering at 60fps
- ✅ Build UI Controls (sidebar with tabs)
- ✅ Implement Paint Color Picker (8 colors, real-time)
- ✅ Smart material detection (preserves windows, tires, chrome)

#### Next Steps (In Priority Order)
1. **Paint Finishes** - Wire up matte/gloss/metallic/chrome buttons
2. **Add Part Swapping Logic** - Swap wheels first (easiest)
3. **Get Part Models** - Download 2-3 wheel options from Sketchfab
4. **Screenshot Feature** - Capture canvas → download image
5. **URL Sharing** - Encode build state in URL parameters

**Success Metrics**:
- ✓ One car renders smoothly (60fps)
- ✓ Paint color changes in real-time
- [ ] Can swap at least wheels + spoiler
- [ ] Screenshot downloads work
- [ ] Shareable build URLs

---

### **Phase 2: Catalog Expansion** (Months 2-4)
- [ ] Add 2-3 more car models
- [ ] Expanded parts library (10+ wheels, spoilers, body kits)
- [ ] Advanced materials:
  - Chrome, carbon fiber
  - Custom wraps/decals
- [ ] Environment options (studio, street, sunset)
- [ ] Save builds to local storage
- [ ] Social sharing (generate preview images)

---

### **Phase 3: AI Model Generation** (Months 4-6)

**THIS IS WHERE IT GETS EXCITING**

Add photo-to-3D model generation using Neural Radiance Fields (NeRF) or photogrammetry.

#### Future Architecture (Monorepo)
```
car-customizer/
├── apps/
│   ├── web/                    # Frontend (Astro/React)
│   │   ├── pages/
│   │   │   ├── index.astro           # Landing
│   │   │   ├── customize/            # 3D customizer ← CURRENT
│   │   │   └── generate/             # Photo uploader ← FUTURE
│   │   └── components/
│   │       ├── customizer/           # CarViewer, PartSelector
│   │       └── generator/            # PhotoUploader, ProcessingStatus
│   │
│   └── api/                    # Python backend (FastAPI)
│       ├── routers/
│       │   ├── customizer.py   # Parts API
│       │   └── generator.py    # Photo upload, job status
│       └── services/
│           ├── nerf_pipeline.py      # NeRF training
│           ├── mesh_export.py        # GLTF export
│           └── mesh_optimize.py      # Poly reduction
│
├── packages/                   # Shared code (NPM workspaces)
│   ├── 3d-engine/             # Shared Three.js utilities
│   └── types/                 # Shared TypeScript types
│
├── ml/                        # ML training scripts
│   ├── train_nerf.py          # Nerfstudio wrapper
│   ├── gaussian_splatting.py  # Alternative approach
│   └── export_gltf.py         # Mesh extraction
│
└── public/
    └── models/
        ├── cars/              # Pre-made cars
        ├── parts/             # Pre-made parts
        └── generated/         # User-generated from photos
```

#### Tech Stack Additions (Phase 3)
**Backend**:
- FastAPI (Python web framework)
- Celery + Redis (job queue for long training)
- PostgreSQL/SQLite (database)

**ML Pipeline**:
- **Nerfstudio** or **Gaussian Splatting** (photo → 3D)
- PyTorch (deep learning)
- CUDA (GPU acceleration)
- Open3D/Trimesh (mesh processing)

#### User Flow Example
```
1. User uploads 30 photos of spoiler from different angles
2. Backend starts NeRF training (10-30 min on GPU)
3. Exports optimized GLTF model
4. User clicks "Try on my car"
5. Model instantly loads in customizer
6. User swaps between generated spoiler and stock
```

#### Why Combined Repo?
- **Shared 3D code** (loaders, optimizers, materials)
- **Type safety** (same interfaces for parts, cars, jobs)
- **Seamless UX** (generate → customize in one flow)
- **Single deployment** (easier DevOps for solo/small team)

---

### **Phase 4: Scale & Monetize** (Month 6+)
- [ ] 10+ car models
- [ ] Community marketplace (upload/download builds)
- [ ] Style transfer for custom paint jobs
- [ ] Recommendation engine ("parts that go together")
- [ ] Affiliate links to real parts
- [ ] Premium features (more cars, advanced renders)
- [ ] AR preview mode (WebXR)
- [ ] Mobile optimization

---

## 🚗 Getting 3D Models

### For Immediate Testing (Phase 1)

The placeholder car is just geometric boxes. You need real models.

#### Option 1: Free Models (Quickest)
**Sketchfab** (Recommended):
1. Visit https://sketchfab.com/search?q=car&type=models&features=downloadable
2. Filter: **Downloadable + Free**
3. Search: "lowpoly car" or "jdm car"
4. Download as **GLTF/GLB**
5. Place at `public/models/cars/demo-car.glb`

**Other sources**:
- TurboSquid Free section
- CGTrader Free models
- Poly Haven (limited selection)

#### Model Requirements
- ✓ Format: GLTF (.glb or .gltf)
- ✓ Polycount: Under 100k triangles
- ✓ Proper scale (roughly 4 units long)
- ✓ Centered at origin
- ✓ Parts separated (wheels, body, doors as separate objects)

**Good models**: Sports cars, lowpoly style, single material
**Avoid**: High poly (>200k), multiple textures, animated/rigged

#### Adding Your Model
```typescript
// Update src/components/CarModel.tsx:
import { useGLTF } from '@react-three/drei';

export default function CarModel() {
  const { scene } = useGLTF('/models/cars/demo-car.glb');
  return <primitive object={scene} />;
}
```

---

### For AI Generation (Phase 3)

#### Test NeRF Viability NOW
Before building the pipeline, test if the tech works:

1. **Download Luma AI app** (iOS/Android)
2. Scan an object (30-50 photos, orbit around it)
3. Wait for processing (cloud-based)
4. Download GLTF
5. Test in your customizer

**This proves the concept in 1 hour.**

#### DIY Approach (Later)
**Nerfstudio** (open-source NeRF):
```bash
pip install nerfstudio
ns-download-data nerfstudio
ns-train nerfacto --data nerfstudio/poster
ns-export poisson --load-config outputs/.../config.yml
```

**Hardware needs**:
- **Minimum**: CPU only (SLOW - hours per model)
- **Recommended**: NVIDIA GPU (RTX 3060+, 12GB VRAM)
- **Alternative**: Cloud GPU (Google Colab, RunPod, Vast.ai)

---

## 📊 Performance Targets

### Phase 1 (Current)
- 60fps on mid-range devices
- <5MB initial bundle
- <3s time to interactive

### Optimization Strategy
- **Models**: Draco compression, LOD (Level of Detail)
- **Textures**: Atlas, WebP format
- **Loading**: Lazy load parts, progressive loading
- **Rendering**: Efficient shadows, throttle material updates

---

## 🎨 Features Detail

### Paint System (Phase 1)
```typescript
// Already set up in src/lib/materials.ts
interface MaterialConfig {
  color: string;
  metalness: number;    // 0 = matte, 1 = chrome
  roughness: number;    // 0 = glossy, 1 = rough
  clearcoat?: number;   // Extra gloss layer
}
```

**Finishes ready**:
- Matte
- Gloss
- Metallic
- Chrome

### Part Swapping (Phase 1)
```typescript
// Already set up in src/lib/parts.ts
interface Part {
  id: string;
  name: string;
  category: 'wheels' | 'spoiler' | 'hood' | 'bumper';
  modelPath: string;
  price?: number;
}
```

### Photo Generation (Phase 3)
```typescript
// Future structure in packages/types/
interface GenerationJob {
  id: string;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  type: 'nerf' | 'photogrammetry' | 'gaussian-splatting';
  photos: string[];          // Uploaded images
  progress: number;          // 0-100
  resultModelPath?: string;  // Output GLTF
  error?: string;
}
```

---

## 🎯 Market Opportunity

### Why This Could Be a Business

**Market**:
- Car enthusiasts spend billions on modifications annually
- Existing tools (Luma AI, Polycam) are general-purpose
- No car-specific customization + generation platform exists

**Monetization Ideas**:
- Affiliate links to real parts
- Premium cars/features
- API access for shops/dealerships
- Marketplace fees (user-generated parts)

**Virality**:
- Social sharing (screenshot builds)
- Community marketplace
- "See YOUR car customized" is compelling

**Differentiators**:
- **Integration**: Photo → 3D → customizer (seamless)
- **Car-specific**: Better results than general tools
- **Community**: Share/browse builds
- **Free tier**: Start free, upgrade for advanced features

---

## 🧪 What to Build Next

Choose your path:

### **Path A: Finish Customizer (RECOMMENDED)**
1. Get a car model from Sketchfab
2. Implement part swapping UI
3. Build color picker
4. Add screenshot tool
5. URL sharing

**Timeline**: 2-3 weeks
**Validates**: Core product value

### **Path B: Test AI Generation**
1. Try Luma AI/Polycam on real objects
2. Evaluate output quality
3. Decide: build own or integrate existing?

**Timeline**: 1 weekend
**Validates**: Photo-to-3D feasibility

### **Path C: Add Backend Foundation**
1. Set up FastAPI (`apps/api/`)
2. Create parts database
3. Build REST API for parts catalog
4. Prepare for future ML integration

**Timeline**: 1 week
**Validates**: Full-stack architecture

---

## 📚 Resources

### Learning 3D on Web
- Three.js docs: https://threejs.org/docs/
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber/
- Drei helpers: https://github.com/pmndrs/drei

### NeRF/Photogrammetry
- Nerfstudio: https://docs.nerf.studio/
- Gaussian Splatting: https://github.com/graphdeco-inria/gaussian-splatting
- COLMAP: https://colmap.github.io/

### 3D Model Tools
- Blender: https://www.blender.org/ (free 3D software)
- Sketchfab: https://sketchfab.com (model marketplace)
- Meshroom: https://alicevision.org/#meshroom (free photogrammetry)

---

## 🙋 Getting Help

**Need assistance?**
- "Help me find a [car type] model"
- "How do I add the model I downloaded?"
- "Let's build the color picker"
- "Show me how part swapping works"
- "Set up the Python backend"
- "Explain NeRF integration"

---

## 📈 Success Metrics

### Phase 1 Validation ✓
- [ ] One car renders smoothly (60fps)
- [ ] Can swap at least wheels + spoiler
- [ ] Paint color changes in real-time
- [ ] Screenshot downloads work
- [ ] Shareable build URLs

### Phase 2 Validation
- [ ] 3+ car models
- [ ] 15+ parts total
- [ ] Save/load builds
- [ ] Social sharing works

### Phase 3 Validation
- [ ] Photo → 3D works (10-30 min processing)
- [ ] Generated parts load in customizer
- [ ] Quality acceptable for visualization
- [ ] GPU costs sustainable

---

## 🏗️ Architecture Philosophy

**Current**: Simple Astro + React app
**Future**: Monorepo with frontend + backend + ML

**Why monorepo for Phase 3?**
- Shared code (3D utilities, types)
- Seamless integration (generate → customize)
- Single deployment
- Better for solo/small teams

**When to split**: Only if ML needs separate scaling or you have 5+ developers.

**Migration**: Monorepo → microservices is easy. Reverse is hard. Start combined.

---

## 🎉 What's Done

✅ Astro project initialized
✅ TypeScript strict mode configured
✅ React Three Fiber set up
✅ 3D scene rendering with lighting
✅ Camera controls (orbit, pan, zoom)
✅ Material system ready
✅ Parts catalog structure
✅ Development server running
✅ Zero errors

**The hardest part is done.** Now we build features and get content (models).

---

## 🚀 Next Action

**Recommended**: Get a car model from Sketchfab to replace the placeholder, then build part swapping UI.

**Ready when you are!**

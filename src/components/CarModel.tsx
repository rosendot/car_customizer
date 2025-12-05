import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh, MeshStandardMaterial, Color } from 'three';

interface CarModelProps {
  color?: string;
  finish?: 'matte' | 'gloss' | 'metallic' | 'chrome';
  wireframe?: boolean;
  windowTint?: number;
  autoSpin?: boolean;
  rotationSpeed?: number;
}

// Load the Ford Fusion 3D model
export default function CarModel({ color = '#e74c3c', finish = 'gloss', wireframe = false, windowTint = 0.3, autoSpin = true, rotationSpeed = 0.5 }: CarModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/cars/ford-fusion.glb');

  // Store original materials once
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
          // Store original color if not already stored
          if (!(child.material as any).originalColor) {
            (child.material as any).originalColor = child.material.color.clone();
            (child.material as any).originalOpacity = child.material.opacity;
          }
        }
      });
    }
  }, [scene]);

  // Apply color and finish to appropriate parts
  useEffect(() => {
    if (scene) {
      // Define finish properties
      const finishProps = {
        matte: { metalness: 0.1, roughness: 0.8, clearcoat: 0, clearcoatRoughness: 0 },
        gloss: { metalness: 0.3, roughness: 0.2, clearcoat: 1.0, clearcoatRoughness: 0.1 },
        metallic: { metalness: 0.9, roughness: 0.3, clearcoat: 0, clearcoatRoughness: 0 },
        chrome: { metalness: 1.0, roughness: 0.1, clearcoat: 0, clearcoatRoughness: 0 }
      };

      const props = finishProps[finish];

      scene.traverse((child) => {
        if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
          const mat = child.material;
          const originalColor = (mat as any).originalColor;
          const originalOpacity = (mat as any).originalOpacity;

          if (!originalColor) return;

          // Handle transparent parts (windows) - apply tint
          if (originalOpacity < 0.9) {
            // This is a window - apply tint with much more dramatic effect
            // At 0 tint: keep original opacity (~0.3-0.5)
            // At 100% tint: nearly opaque black (~0.95)
            const tintedOpacity = originalOpacity + (windowTint * (0.95 - originalOpacity));
            mat.opacity = tintedOpacity;
            mat.color = new Color(0, 0, 0);
            mat.transparent = true;
            mat.needsUpdate = true;
            return;
          }

          // Skip very dark parts (tires, rubber)
          const isDark = originalColor.r < 0.15 && originalColor.g < 0.15 && originalColor.b < 0.15;
          if (isDark) return;

          // Skip very bright/white parts (chrome, lights)
          const isBright = originalColor.r > 0.9 && originalColor.g > 0.9 && originalColor.b > 0.9;
          if (isBright) return;

          // Apply color and finish
          mat.color = new Color(color);
          mat.metalness = props.metalness;
          mat.roughness = props.roughness;
          (mat as any).clearcoat = props.clearcoat;
          (mat as any).clearcoatRoughness = props.clearcoatRoughness;
          mat.wireframe = wireframe;
          mat.needsUpdate = true;
        }
      });
    }
  }, [scene, color, finish, wireframe, windowTint]);

  // Auto-spin and subtle hover effect
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle bounce effect
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

      // Auto-spin rotation - scale speed from 0.001 (slow) to 0.01 (fast)
      if (autoSpin) {
        groupRef.current.rotation.y += 0.001 + (rotationSpeed * 0.009);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={100}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      />
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload('/models/cars/ford-fusion.glb');

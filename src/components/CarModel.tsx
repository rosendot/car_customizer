import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh, MeshStandardMaterial, Color } from 'three';

interface CarModelProps {
  color?: string;
  finish?: 'matte' | 'gloss' | 'metallic' | 'chrome';
}

// Load the Ford Fusion 3D model
export default function CarModel({ color = '#e74c3c', finish = 'gloss' }: CarModelProps) {
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

          // Skip transparent parts (windows, lights)
          if (originalOpacity < 0.9) return;

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
          mat.clearcoat = props.clearcoat;
          mat.clearcoatRoughness = props.clearcoatRoughness;
          mat.needsUpdate = true;
        }
      });
    }
  }, [scene, color, finish]);

  // Optional: Add subtle hover effect
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
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

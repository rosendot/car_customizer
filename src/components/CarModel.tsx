import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh, MeshStandardMaterial, Color } from 'three';

interface CarModelProps {
  color?: string;
}

// Load the Ford Fusion 3D model
export default function CarModel({ color = '#e74c3c' }: CarModelProps) {
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

  // Apply color to appropriate parts
  useEffect(() => {
    if (scene) {
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

          // Color the body
          mat.color = new Color(color);
          mat.metalness = 0.6;
          mat.roughness = 0.4;
          mat.needsUpdate = true;
        }
      });
    }
  }, [scene, color]);

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

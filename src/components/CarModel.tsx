import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

// Load the Ford Fusion 3D model
export default function CarModel() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/cars/ford-fusion.glb');

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

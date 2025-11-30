import * as THREE from 'three';

export interface MaterialConfig {
  name: string;
  color: string;
  metalness: number;
  roughness: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
}

export const paintFinishes: Record<string, Omit<MaterialConfig, 'color'>> = {
  matte: {
    name: 'Matte',
    metalness: 0.1,
    roughness: 0.8
  },
  gloss: {
    name: 'Gloss',
    metalness: 0.3,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  },
  metallic: {
    name: 'Metallic',
    metalness: 0.9,
    roughness: 0.3
  },
  chrome: {
    name: 'Chrome',
    metalness: 1.0,
    roughness: 0.1
  }
};

export function createCarMaterial(config: MaterialConfig): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(config.color),
    metalness: config.metalness,
    roughness: config.roughness,
  });

  if (config.clearcoat !== undefined) {
    material.clearcoat = config.clearcoat;
    material.clearcoatRoughness = config.clearcoatRoughness || 0.1;
  }

  return material;
}

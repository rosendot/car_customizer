export interface Part {
  id: string;
  name: string;
  category: 'wheels' | 'spoiler' | 'hood' | 'bumper' | 'bodykit';
  modelPath?: string;
  price?: number;
}

export const parts: Record<string, Part[]> = {
  wheels: [
    { id: 'stock', name: 'Stock Wheels', category: 'wheels' },
    { id: 'sport', name: 'Sport Wheels', category: 'wheels', modelPath: '/models/parts/wheels/sport.glb', price: 1200 },
    { id: 'racing', name: 'Racing Wheels', category: 'wheels', modelPath: '/models/parts/wheels/racing.glb', price: 2500 }
  ],
  spoilers: [
    { id: 'none', name: 'No Spoiler', category: 'spoiler' },
    { id: 'ducktail', name: 'Duck Tail', category: 'spoiler', modelPath: '/models/parts/spoilers/ducktail.glb', price: 800 },
    { id: 'gt_wing', name: 'GT Wing', category: 'spoiler', modelPath: '/models/parts/spoilers/gt-wing.glb', price: 1500 }
  ]
};

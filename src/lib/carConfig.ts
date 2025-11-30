export interface CarModel {
  id: string;
  name: string;
  modelPath: string;
  partAttachments: {
    wheels: string[];
    spoiler?: string;
    hood?: string;
    bumper?: string;
  };
  defaultColor: string;
}

export const cars: Record<string, CarModel> = {
  demo: {
    id: 'demo',
    name: 'Demo Car',
    modelPath: '/models/cars/demo-car.glb',
    partAttachments: {
      wheels: ['wheel_fl', 'wheel_fr', 'wheel_rl', 'wheel_rr'],
      spoiler: 'spoiler_mount',
      hood: 'hood',
      bumper: 'bumper_front'
    },
    defaultColor: '#1a1a1a'
  }
};

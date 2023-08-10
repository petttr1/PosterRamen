import { AmbientLight, PointLight } from "three";

function createLights() {
  const lights = [];
  const light = new PointLight(0xffffff, 100, 1000);
  light.position.set(0, 0, -550);
  lights.push(light);
  const ambient = new AmbientLight(0xffffff);
  lights.push(ambient);

  return lights;
}

export { createLights };

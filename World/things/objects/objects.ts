import { Mesh, SphereGeometry, Vector3 } from "three";
import { HEIGHT, WIDTH } from "~/constants";
import { createMaterial } from "~/World/things/materials/material";

const sampleCoords = (min: number, max: number, r: number) => {
  const { $random } = useNuxtApp();
  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);
  return clamp(
    $random.$getRandom() * (max - min) + min,
    min + r / -2,
    max - r / 2,
  );
};

function makeObject(pos: Vector3, r: number) {
  const geometry = new SphereGeometry(r, 128, 128);
  const material = createMaterial(geometry);
  geometry.translate(...pos);
  return new Mesh(geometry, material);
}
function makeObjects() {
  const { $random } = useNuxtApp();
  const objects = [];
  const amt = Math.floor($random.$getRandom() * 6 + 2);
  for (let i = 0; i < amt; i++) {
    const radius = 50 + $random.$getRandom() * 300;
    const x = sampleCoords(WIDTH / -2, WIDTH / 2, radius);
    const y = sampleCoords(HEIGHT / -2, HEIGHT / 2, radius);
    const z = -$random.$getRandom() * 1000;
    const coords = new Vector3(x, y, z);
    const obj = makeObject(coords, radius);
    objects.push(obj);
  }
  return objects;
}

export { makeObjects, makeObject };

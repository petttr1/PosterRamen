import { Group } from "three";
import { createLights } from "~/World/things";
import { makeObjects } from "~/World/things/objects/objects";

function createLandingWorld(world: Group) {
  const lights = createLights();
  lights.forEach((light) => world.add(light));
  world.add(...makeObjects());
}

export { createLandingWorld };

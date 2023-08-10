import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Vector2 } from "three";
function createBloomPass() {
  const bloomPass = new UnrealBloomPass(
    new Vector2(1000, 1000),
    1.5,
    0.4,
    0.85,
  );
  bloomPass.threshold = 0.3;
  bloomPass.strength = 0.7;
  bloomPass.radius = 0.3;
  bloomPass.renderToScreen = true;
  return bloomPass;
}

export { createBloomPass };

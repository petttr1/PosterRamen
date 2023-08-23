import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Vector2 } from "three";
import { HEIGHT, WIDTH } from "~/constants";
function createBloomPass() {
  const bloomPass = new UnrealBloomPass(
    new Vector2(WIDTH, HEIGHT),
    0.1,
    0.3,
    0.6,
  );
  bloomPass.renderToScreen = true;
  return bloomPass;
}

export { createBloomPass };

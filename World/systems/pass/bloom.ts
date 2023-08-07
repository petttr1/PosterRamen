import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import {Vector2} from "three";
function createBloomPass() {
    const bloomPass = new UnrealBloomPass(new Vector2(1000, 1000), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.9;
    bloomPass.strength = 0.2;
    bloomPass.radius = 0.1;
    bloomPass.renderToScreen = true;
    return bloomPass
}

export { createBloomPass };
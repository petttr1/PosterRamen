import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { useSceneStore } from "~/store/scene";
import { Color, Vector3 } from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix
      * modelViewMatrix
      * vec4( position, 1.0 );
}
`;

const fragmentShader = `
uniform vec3 background;
void main() {
    vec3 bgColor = background;
    gl_FragColor = vec4(1.,1.,1.,1.);
}
`;

function createBackgroundPass() {
  const sceneStore = useSceneStore();
  const effect = {
    uniforms: {
      background: {
        value:
          // sceneStore.scene(sceneStore.activeScene!).background ??
          new Vector3(1, 1, 1),
      },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createBackgroundPass };

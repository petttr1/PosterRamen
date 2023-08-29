import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { useSceneStore } from "~/store/scene";
import { Color, Vector3 } from "three";
import { baseShaderUniforms } from "~/World/systems/pass/helpers";

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
${baseShaderUniforms}
void main() {
    gl_FragColor = vec4(colors.background,1.);
}
`;

function createBackgroundPass() {
  const sceneStore = useSceneStore();
  const effect = {
    uniforms: {
      colors: {
        value: {
          background:
            sceneStore.scene(sceneStore.activeScene!).background ??
            new Vector3(1, 1, 1),
        },
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

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

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
uniform float r;
uniform float g;
uniform float b;
void main() {
    gl_FragColor = vec4(r,g,b,1.);
}
`;

function createBackgroundPass() {
  const effect = {
    uniforms: {
      r: { value: 1 },
      g: { value: 1 },
      b: { value: 1 },
      tDiffuse: { value: null },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createBackgroundPass };

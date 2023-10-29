import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { Camera } from "three";
import { baseShaderUniforms, baseUniforms } from "~/World/systems/pass/helpers";

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
uniform float x;
uniform float y;
uniform float offset;
varying vec2 vUv;
${baseShaderUniforms}

void main() {
    vec2 uv = vUv;
    vec2 p = uv;
    vec4 o = gl_FragColor;
    p /= offset;
    p.x *= sign(cos(length(ceil(p))*99.));
    o =  cos( min( length(p = fract(p)),  length(--p) )  * 31.4*vec4(x, y, .6,0) );
    gl_FragColor = o;
}
`;

function createVernerPass(camera: Camera) {
  const { $random } = useNuxtApp();
  const effect = {
    uniforms: {
      ...baseUniforms(),
      x: { value: camera.position.x },
      y: { value: camera.position.y },
      offset: { value: $random.$getRandom() * 10 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createVernerPass };

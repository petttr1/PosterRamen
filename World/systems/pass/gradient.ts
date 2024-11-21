import { Camera } from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import {
  baseShaderUniforms,
  baseUniforms,
  translateColorspace,
} from "~/World/systems/pass/helpers";

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
uniform float offset;
varying vec2 vUv;
${baseShaderUniforms}
${translateColorspace}
void main() {
    vec2 center = vec2(0.5, 0.5);
    float aspect = width / height;
    vec2 uv = vUv;
    uv.x *= aspect;
    center.x *= aspect;
    vec4 gradientColor = vec4(0.5 - distance(center, uv), 0.0 + 0.5 * sin(position.x), 1.0 + 0.5 * cos(position.y), 1.0);
    vec3 hsv = rgb2hsv(gradientColor.rgb);
    hsv.x *= offset;
    gl_FragColor = vec4(hsv2rgb(hsv), 1.0);
}
`;

function createGradientPass(camera: Camera) {
  const { $random } = useNuxtApp();
  const effect = {
    uniforms: {
      ...baseUniforms(),
      offset: { value: $random.$getRandom() * 10 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    name: "GradientPass",
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createGradientPass };

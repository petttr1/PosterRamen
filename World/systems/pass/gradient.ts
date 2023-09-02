import { Camera } from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { HEIGHT, WIDTH } from "~/constants";
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
uniform float x;
uniform float y;
uniform float offset;
uniform sampler2D tDiffuse;
varying vec2 vUv;
${baseShaderUniforms}
${translateColorspace}
void main() {
    vec2 center = vec2(0.5, 0.5 - (borders.top / (borders.bottom * 100.)));
    float aspect = width / height;
    vec2 uv = vUv;
    uv.x *= aspect;
    center.x *= aspect;
    vec4 gradientColor = vec4(0.5 - distance(center, uv), 0.0 + 0.5 * sin(x), 1.0 + 0.5 * cos(y), 1.0);
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
      x: { value: camera.position.x },
      y: { value: camera.position.y },
      tDiffuse: { value: null },
      offset: { value: $random.$getRandom() * 10 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createGradientPass };

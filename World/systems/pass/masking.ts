import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { HEIGHT, WIDTH } from "~/constants";
import { useSceneStore } from "~/store/scene";
import { Vector3 } from "three";
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
uniform sampler2D tDiffuse;
varying vec2 vUv;
${baseShaderUniforms}

void main() {
    vec4 color = texture2D( tDiffuse, vUv );
    vec2 uv = vUv;
    vec2 bl = step(vec2(borders.left, borders.bottom),uv);
    float padding = bl.x * bl.y;
    vec2 tr = step(vec2(borders.right, borders.top),1.0-uv);
    padding *= tr.x * tr.y;
    color.rgb = borders.show ? step( 0.5, 1. - padding ) <= 0. ? color.rgb : colors.background : color.rgb;
    gl_FragColor = vec4( color.rgb, 1. );
}
`;

function createMaskingPass() {
  const maskingEffect = {
    uniforms: {
      ...baseUniforms(),
      tDiffuse: { value: null },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };
  const maskingPass = new ShaderPass(maskingEffect);
  maskingPass.renderToScreen = true;
  return maskingPass;
}

export { createMaskingPass };

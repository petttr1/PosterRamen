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
uniform float offset;
varying vec2 vUv;
${baseShaderUniforms}

void main() {
    vec2 uv = vUv;
    float t = (position.x * position.y) + offset;
    vec2 center = uv / 4.;
    float g = 3.1;
    center.x+=sin(uv.y*g+position.x);
    center.y+=cos(uv.x*g+position.y);
    float d = distance(uv,center);
    float k = -sin(d*6.283*10. - t);
    float e = smoothstep(0., fwidth(k)*1.5, k);
    float finalVal = sqrt(max(e, 0.));
    vec3 mixed = mix(colors.color.rgb, colors.background.rgb, clamp(finalVal, 0.0, 1.0));
    gl_FragColor = vec4(mixed, 1.);
}
`;

function createZebraPass(camera: Camera) {
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
    name: "ZebraPass",
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createZebraPass };

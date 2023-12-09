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

float stepped(in float s, in float scale, in int steps) {
    return floor( s / ((1.0*scale) / float(steps))) * 1.0 / float(steps-1);
}
void main() {
    float o = offset / 10.;
    float r = o > 0.8 ? sin(offset) : o;
    float g = o > 0.5 ? cos(offset) : sin(offset);
    float b = o > 0.2 ? o : cos(offset);
    vec4 Color1 = normalize(vec4(r, g, b, 1.0));
    vec3 hsv = rgb2hsv(normalize(vec3(r,g,b)));
    hsv.x *= sin((position.x + offset) / 10.);
    Color1 = vec4(hsv2rgb(hsv),1.);
    vec4 Color2 = vec4(colors.background.rgb, 1.0);
    int NumSteps = int(20. * o);
    float aspect = width / height; 
    
    vec2 uv = vUv;
    vec2 center = vec2(0.5, 0.5 - (borders.top / (borders.bottom * 100.)));
    
    uv.x *= aspect;
    center.x *= aspect;
    float dist = distance( uv, center);
    float size = offset / 10. + offset * abs(sin(position.y / 10.));
    float s = stepped(dist, size, NumSteps );
    
    gl_FragColor = mix(Color1, Color2, clamp(s, 0.0, 1.0));
}
`;

function createSteppedPass(camera: Camera) {
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
    name: "SteppedPass",
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createSteppedPass };

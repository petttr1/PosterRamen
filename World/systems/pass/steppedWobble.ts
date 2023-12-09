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

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
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
    size += noise(uv * 2. * offset) * 0.1;
    float s = stepped(dist, size, NumSteps );
    
    gl_FragColor = mix(Color1, Color2, clamp(s, 0.0, 1.0));
}
`;

function createSteppedWobblePass(camera: Camera) {
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
    name: "SteppedWobblePass",
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createSteppedWobblePass };

import { Camera } from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import {
  baseShaderUniforms,
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
${translateColorspace}
${baseShaderUniforms}
#define rot(x) mat2(cos(x), -sin(x), sin(x), cos(x))

float heightS(vec2 p){
    return sin(p.x)+sin(p.x+p.y)+cos(p.y)/1.5+sin(offset+p.x)+5.;
}

float map(vec3 p){
    return p.y-heightS(p.xz);  
}
void main(){
    vec2 uv = vUv;
    vec3 ray = normalize(vec3(uv,1.));
    ray.yz *= rot((sin(position.y)/3.+1.5));
    ray.xz *= rot((sin(position.x)/2.+1.)/5.);
    
    float t = 0.;
    for(int i = 0; i < 29 ; ++i)
        t += map(vec3(position.x,0.,position.x/2.)+ray*t)*.5;
    
    float fog = 1./(1.+t*t*.005);
    vec3 fc = vec3(fog*fog, fog/2., fog);
    vec3 hsl = rgb2hsv(fc);
    hsl.x *= sin(offset);
    gl_FragColor = vec4(hsv2rgb(hsl), 1.);
}
`;

function createSilkPass(camera: Camera) {
  const { $random } = useNuxtApp();
  const effect = {
    uniforms: {
      x: { value: camera.position.x },
      y: { value: camera.position.y },
      offset: { value: $random.$getRandom() * 10 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    name: "SilkPass",
  };
  const pass = new ShaderPass(effect);
  pass.renderToScreen = true;
  return pass;
}

export { createSilkPass };

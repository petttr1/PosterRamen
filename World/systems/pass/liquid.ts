import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { Camera } from "three";
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
    uniform float offset;
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    ${baseShaderUniforms}

    mat2 rot(float deg)
    {
        return mat2(cos(deg),-sin(deg),
                    sin(deg), cos(deg));

    }
    float random( vec2 p )
      {
        vec2 K1 = vec2(
          23.14069263277926,
          2.665144142690225
        );
        return fract( cos( dot(p,K1) ) * 12345.6789 );
      }

  void main() {
    vec4 color = texture2D( tDiffuse, vUv );
    float t = position.x + position.y + offset;
    vec2 uv = vUv;

    uv-=.5 * offset;
    uv*=5. * offset;

    uv*=rot(uv.y/5.-t*.15);
    uv-=sin(sqrt(uv.x*uv.x+uv.y*uv.y)-t*2.)*3.;
    uv.y+=sin(uv.x-t)*1.2;
    uv-=sin(sqrt(uv.x*uv.x+uv.y*uv.y)+t)*.6;
    uv.x+=sin(uv.y*1.4+t)*.6;

    uv*=rot(uv.x/5.-t*.8);
    uv.x/=length(.75*uv);
    uv.y/=length(.75*uv);

    float value = cos(uv.x+uv.y-t*.6);
    color.rgb = vec3(cos(uv.x+uv.y-t*.7),cos(uv.x+uv.y-t*.6),cos(uv.x+uv.y-t*.8));
    // color.rgb = 1. - (1. - 0.1 * vec3(cos(uv.x+uv.y-t*.7),cos(uv.x+uv.y-t*.6),cos(uv.x+uv.y-t*.8))) * (1. - color.rgb);
    gl_FragColor = vec4( color );
  }
`;

function createLiquidPass(camera: Camera) {
  const { $random } = useNuxtApp();
  const liquidEffect = {
    uniforms: {
      x: { value: camera.position.x },
      y: { value: camera.position.y },
      tDiffuse: { value: null },
      offset: { value: $random.$getRandom() * 10 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    name: "LiquidPass",
  };
  const liquidPass = new ShaderPass(liquidEffect);
  liquidPass.renderToScreen = true;
  return liquidPass;
}

export { createLiquidPass };

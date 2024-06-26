import { Vector4 } from "three";
import { useSceneStore } from "~/store/scene";
import { HEIGHT, WIDTH } from "~/constants";

export const translateColorspace = `
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}`;

export const baseUniforms = () => {
  const sceneStore = useSceneStore();
  const showBorders =
    sceneStore.scene(sceneStore.activeScene!).showBorders ?? true;
  return {
    colors: {
      value: {
        background:
          sceneStore.scene(sceneStore.activeScene!).background ??
          new Vector4(1, 1, 1, 1),
        color:
          sceneStore.scene(sceneStore.activeScene!).color ??
          new Vector4(0, 0, 0, 1),
      },
    },
    borders: {
      value: {
        top: 228 / HEIGHT,
        right: 32 / WIDTH,
        bottom: 228 / HEIGHT,
        left: 32 / WIDTH,
        show: showBorders ?? true,
      },
    },
    position: {
      x: 0,
      y: 0,
    },
    width: { value: WIDTH },
    height: { value: HEIGHT },
  };
};

export const baseShaderUniforms = `
struct ColorData {
      vec4 background;
      vec4 color;
};
uniform ColorData colors;

struct BorderData {
  float top;
  float right;
  float bottom;
  float left;
  bool show;
};
uniform BorderData borders;

struct PositionData {
  float x;
  float y;
};
uniform PositionData position;

uniform float width;
uniform float height;
`;

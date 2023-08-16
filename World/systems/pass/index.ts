import { createBloomPass } from "~/World/systems/pass/bloom";
import { createLiquidPass } from "~/World/systems/pass/liquid";
import { createMaskingPass } from "~/World/systems/pass/masking";
import { createGrainPass } from "~/World/systems/pass/grain";
import { Camera, Scene } from "three";
import { createRenderPass } from "~/World/systems/pass/render";
import { createZebraPass } from "~/World/systems/pass/zebra";
import { createLiquidLargePass } from "~/World/systems/pass/liquidLarge";

const basePasses = (scene: Scene, camera: Camera) => {
  return [
    createRenderPass(scene, camera),
    createLiquidPass(camera),
    createZebraPass(camera),
    createLiquidLargePass(camera),
  ];
};

const postprocessPasses = () => {
  return [createBloomPass(), createMaskingPass(), createGrainPass()];
};

export const getPasses = (scene: Scene, camera: Camera) => {
  const { $random } = useNuxtApp();
  const base = basePasses(scene, camera);
  const basePass = base[Math.floor($random.$getRandom() * base.length)];
  return [basePass, ...postprocessPasses()];
};

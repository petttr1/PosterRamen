import { createLiquidPass } from "~/World/systems/pass/liquid";
import { createMaskingPass } from "~/World/systems/pass/masking";
import { createGrainPass } from "~/World/systems/pass/grain";
import { Camera, Scene } from "three";
import { createZebraPass } from "~/World/systems/pass/zebra";
import { createLiquidLargePass } from "~/World/systems/pass/liquidLarge";
import { createGradientPass } from "~/World/systems/pass/gradient";
import { createSteppedPass } from "~/World/systems/pass/stepped";
import { createSilkPass } from "~/World/systems/pass/silk";
import { createDotsPass } from "~/World/systems/pass/dotsGrid";
import { createChessPass } from "~/World/systems/pass/chess";
import { createVernerPass } from "~/World/systems/pass/verner";

const basePasses = (scene: Scene, camera: Camera) => {
  return [
    createLiquidPass(camera),
    createZebraPass(camera),
    createLiquidLargePass(camera),
    createGradientPass(camera),
    createSteppedPass(camera),
    createSilkPass(camera),
    createDotsPass(camera),
    createChessPass(camera),
    createVernerPass(camera),
  ];
};

const postprocessPasses = () => {
  return [createMaskingPass(), createGrainPass()];
};

export const getPasses = (scene: Scene, camera: Camera) => {
  const { $random } = useNuxtApp();
  const base = basePasses(scene, camera);
  const basePass = base[Math.floor($random.$getRandom() * base.length)];
  return [basePass, ...postprocessPasses()];
};

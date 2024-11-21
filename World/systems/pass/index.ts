import { createLiquidPass } from "~/World/systems/pass/liquid";
import { Camera } from "three";
import { createZebraPass } from "~/World/systems/pass/zebra";
import { createLiquidLargePass } from "~/World/systems/pass/liquidLarge";
import { createGradientPass } from "~/World/systems/pass/gradient";
import { createSteppedPass } from "~/World/systems/pass/stepped";
import { createSilkPass } from "~/World/systems/pass/silk";
import { createDotsPass } from "~/World/systems/pass/dotsGrid";
import { createChessPass } from "~/World/systems/pass/chess";
import { createVernerPass } from "~/World/systems/pass/verner";
import { createSteppedWobblePass } from "~/World/systems/pass/steppedWobble";

const basePasses = (camera: Camera) => {
  return [
    createLiquidPass(camera),
    createZebraPass(camera),
    createLiquidLargePass(camera),
    createGradientPass(camera),
    createSteppedPass(camera),
    createSteppedWobblePass(camera),
    createSilkPass(camera),
    createDotsPass(camera),
    createChessPass(camera),
    createVernerPass(camera),
  ];
};

export const getPasses = (camera: Camera) => {
  const { $random } = useNuxtApp();
  const base = basePasses(camera);
  return [base[Math.floor($random.$getRandom() * base.length)]];
};

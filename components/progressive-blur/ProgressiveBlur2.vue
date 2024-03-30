<template>
  <div class="progressive-blur">
    <div
      v-for="i of filterSteps"
      :key="i"
      class="progressive-blur__blur"
      :style="styleForStep(i)"
    />
  </div>
</template>
<script setup lang="ts">
import {
  getApplicableStylesForStep,
  getFilterSteps,
  getGradientCheckpoints,
} from "~/helpers/progressive-blur";

const props = defineProps<{ src: string }>();

const blurHeight = useState("blur-height", () => 50);
const blurDetail = useState("blur-detail", () => 5);
const blurAmount = useState("blur-amount", () => 1);

const wrapperZIndex = computed(() => {
  return blurDetail.value + 1;
});

const bgImage = computed(() => {
  return `url(${props.src})`;
});

const filterSteps = computed(() => {
  return getFilterSteps(blurDetail.value);
});

const generateGradientCheckpoints = computed(() => {
  return getGradientCheckpoints(blurHeight.value, blurDetail.value);
});

const styleForStep = (step: number) => {
  return getApplicableStylesForStep(
    step,
    generateGradientCheckpoints.value,
    blurAmount.value,
  );
};
</script>
<style lang="scss" scoped>
.progressive-blur {
  position: absolute;
  z-index: v-bind(wrapperZIndex);
  width: 100%;
  height: 100%;
  pointer-events: none;
  inset: auto 0 0 0;
  transform: scale(1.2);

  &__blur {
    background: v-bind(bgImage);
    background-size: cover;
    position: absolute;
    inset: 0;
  }
}
</style>

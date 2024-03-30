<template>
  <div class="progressive-blur">
    <div v-for="i in filterSteps" class="progressive-blur__blur" :style="styleForStep(i)"></div>
  </div>
</template>
<script setup lang="ts">
const blurHeight = useState('blur-height', () => 50);
const blurDetail = useState('blur-detail', () => 5);
const blurAmount = useState('blur-amount', () => 1);

const props = defineProps<{ imageBorderRadius: string }>();

const imageBorderRadius = computed(() => {
  return props.imageBorderRadius;
});

const blurHeightPercent = computed(() => {
  return `${blurHeight.value}%`;
});

const filterSteps = computed(() => {
  return Array.from({ length: blurDetail.value }, (_, i) => i);
});

const generateGradientCheckpoints = (parts: number) => {
  let result = [];
  const increment = 100 / parts;
  for (let i = 0; i <= parts; i++) {
    result.push(increment * i);
  }
  return result;
}

const styleForStep = (step: number) => {
  const steps = generateGradientCheckpoints(blurDetail.value);
  const gradientOffsets = [
    `rgba(0, 0, 0, 0) ${steps[step]}%`,
    `rgba(0, 0, 0, 1) ${steps[step + 1]}%`
  ];
  if (steps[step + 2]) {
    gradientOffsets.push(`rgba(0, 0, 0, 1) ${steps[step + 2]}%`);
  }
  if (steps[step + 3]) {
    gradientOffsets.push(`rgba(0, 0, 0, 0) ${steps[step + 3]}%`);
  }
  return {
    backdropFilter: `blur(${blurAmount.value * Math.pow(2, step)}px)`,
    WebkitBackdropFilter: `blur(${blurAmount.value * Math.pow(2, step)}px)`,
    mask: `linear-gradient(
      to bottom,
      ${gradientOffsets.join(', ')}
    )`,
    'z-index': `${step + 1}`,
  };
};

const wrapperZIndex = computed(() => {
  return blurDetail.value + 1;
});

</script>
<style lang="scss" scoped>
.progressive-blur {
  position: absolute;
  z-index: v-bind(wrapperZIndex);
  width: 100%;
  height: v-bind(blurHeightPercent);
  pointer-events: none;
  inset: auto 0 0 0;
  //clip-path: inset(0 round v-bind(imageBorderRadius));

  &__blur {
    mask-composite: intersect;
    -webkit-mask-composite: source-in;
    position: absolute;
    inset: 0;
  }
}
</style>
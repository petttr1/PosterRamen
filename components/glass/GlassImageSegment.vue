<template>
  <div class="glass-image-segment" />
</template>
<script setup lang="ts">
const props = defineProps<{
  src: string;
  bgPosition: string;
  bgAfterPosition: string;
  bgAfterBase: string;
  reflectWidth: string;
  imageSize: string;
  reflectSize: string;
}>();

const imgSrc = computed(() => `url(${props.src})`);
</script>
<style scoped lang="scss">
.glass-image-segment {
  background-image: v-bind(imgSrc);
  background-size: v-bind(imageSize);
  background-repeat: no-repeat;
  position: relative;
  image-rendering: high-quality;
  background-position: v-bind(bgPosition);

  &:after {
    content: "";
    position: absolute;
    left: v-bind(bgAfterBase);
    background-image: v-bind(imgSrc);
    background-size: v-bind(reflectSize);
    background-repeat: no-repeat;
    transform: scaleX(-1);
    width: v-bind(reflectWidth);
    height: 100%;
    image-rendering: high-quality;
    background-position: v-bind(bgAfterPosition);
  }
}
</style>

<template>
  <div ref="glass" class="wrapper" @click="download">
    <div class="image-wrapper">
      <GlassImageSegment
        v-for="i in Array.from({ length: verticalSegments }, (_, i) => i)"
        :key="i"
        :src="imageSource"
        :bg-after-position="bgAfterPositionForSegment(i)"
        :bg-position="bgPositionForSegment(i)"
        :bg-after-base="bgAfterBase"
        :reflect-width="reflectionWidth"
        :image-size="imageSize"
        :reflect-size="reflectionSize"
      />
    </div>
    <img :src="imageSource" :alt="glassImages[activeIndex].alt" />
  </div>
  <div v-if="credits" class="credits" v-html="credits" />
</template>
<script lang="ts" setup>
import GlassImageSegment from "~/components/glass/GlassImageSegment.vue";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import { glassImages } from "~/helpers/glass/images";

const glass = ref<HTMLDivElement | null>(null);

const verticalSegments = useState("glass-vertical-segments", () => 33);
const verticalOffset = useState("glass-vertical-offset", () => 50);
const verticalBase = useState("glass-vertical-base", () => 70);
const activeIndex = useState("active-image", () => 0);
const customImage = useState("custom-image", () => null);
const borderRadius = useState("border-radius", () => 5);
const reflectWidth = useState("reflect-width", () => 35);
const imageScale = useState("image-scale", () => 800);
const reflectScale = useState("reflect-scale", () => 1400);

const imageSource = computed(() => {
  return customImage.value
    ? customImage.value
    : glassImages[activeIndex.value].src;
});

const credits = computed(() =>
  customImage.value ? `Image by You` : glassImages[activeIndex.value].credits,
);

const imageBorderRadius = computed(() => {
  const imageHeight = glass.value?.offsetHeight || 0;
  const imageWidth = glass.value?.offsetWidth || 0;
  const aspect = imageHeight / imageWidth;
  return `${borderRadius.value * aspect}% / ${borderRadius.value}%`;
});

const verticalStep = computed(() => 100 / verticalSegments.value);

const bgPositionForSegment = (i: number) => {
  const horizontalOffset = i * verticalStep.value + verticalStep.value / 2;
  return `${horizontalOffset}% 50%`;
};

const bgAfterPositionForSegment = (i: number) => {
  const hOffset =
    i * verticalStep.value + (verticalOffset.value / 100) * verticalStep.value;
  return `${hOffset}% 50%`;
};

const bgAfterBase = computed(() => {
  return `${verticalBase.value}%`;
});

const reflectionWidth = computed(() => {
  return `${reflectWidth.value}%`;
});

const imageSize = computed(() => {
  return `${imageScale.value}% 100%`;
});
const reflectionSize = computed(() => {
  return `${reflectScale.value}% 100%`;
});

const download = async () => {
  const image = await domtoimage.toPng(glass.value!);
  saveAs(image, "download.png");
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
  z-index: 10;
  margin: 0 auto;
  overflow: hidden;
  border-radius: v-bind(imageBorderRadius);
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
  }
}

.image-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(v-bind(verticalSegments), auto);
  grid-template-rows: 100%;
  z-index: 1;
}

.credits {
  @include level4;
  margin-top: 0.5rem;
  :deep {
    a {
      text-decoration: underline;
      color: $text;
    }
  }
}
</style>

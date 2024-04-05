<template>
  <div class="blurred-image">
    <div ref="blur" class="blurred-image__wrapper" @click="download">
      <ProgressiveBlur2 :src="src" />
      <img ref="image" :src="src" :alt="alt" />
    </div>
    <div v-if="credits" class="blurred-image__credits" v-html="credits" />
  </div>
</template>
<script setup lang="ts">
import ProgressiveBlur2 from "~/components/progressive-blur/ProgressiveBlur2.vue";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
const props = defineProps<{
  src: string;
  alt: string;
  credits: string | null;
}>();

const image = ref<HTMLImageElement | null>(null);
const blur = ref<HTMLDivElement | null>(null);

const borderRadius = useState("border-radius", () => 0);
const scale = useState("scale", () => 1.2);

const imageBorderRadius = computed(() => {
  const imageHeight = image.value?.offsetHeight || 0;
  const imageWidth = image.value?.offsetWidth || 0;
  const aspect = imageHeight / imageWidth;
  return `${borderRadius.value * aspect}% / ${borderRadius.value}%`;
});

const download = async () => {
  const image = await domtoimage.toPng(blur.value!);
  saveAs(image, "download.png");
};
</script>
<style lang="scss" scoped>
.blurred-image {
  max-width: 1000px;
  margin: 0 auto;

  &__wrapper {
    position: relative;
    border-radius: v-bind(imageBorderRadius);
    overflow: hidden;
    cursor: pointer;
  }

  img {
    height: auto;
    width: 100%;
    transform: scale(v-bind(scale));
  }

  &__credits {
    @include level4;
    margin-top: 0.5rem;
    :deep {
      a {
        text-decoration: underline;
        color: $text;
      }
    }
  }
}
</style>

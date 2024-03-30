<template>
  <div class="blurred-image">
    <div ref="blur" class="blurred-image__wrapper">
      <ProgressiveBlur2 :src="src" />
      <img ref="image" :src="props.src" :alt="props.alt" />
    </div>
    <div class="blurred-image__credits" v-html="props.credits" />
  </div>
</template>
<script setup lang="ts">
import ProgressiveBlur2 from "~/components/progressive-blur/ProgressiveBlur2.vue";
const props = defineProps<{ src: string; alt: string; credits: string }>();

const borderRadius = useState("border-radius", () => 0);
const image = ref<HTMLImageElement | null>(null);

const imageBorderRadius = computed(() => {
  const imageHeight = image.value?.offsetHeight || 0;
  const imageWidth = image.value?.offsetWidth || 0;
  const aspect = imageHeight / imageWidth;
  return `${borderRadius.value * aspect}% / ${borderRadius.value}%`;
});
</script>
<style lang="scss" scoped>
.blurred-image {
  max-width: 1000px;
  margin: 0 auto;

  &__wrapper {
    position: relative;
    border-radius: v-bind(imageBorderRadius);
    overflow: hidden;
  }

  img {
    height: auto;
    width: 100%;
    transform: scale(1.2);
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

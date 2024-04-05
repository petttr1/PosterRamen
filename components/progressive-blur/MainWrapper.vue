<template>
  <div class="main-wrapper">
    <div class="main-wrapper__image">
      <BlurredImage :src="imageSource" :credits="getCredits" :alt="imageAlt" />
    </div>
    <div class="main-wrapper__code">
      <CSSDisplay />
    </div>
    <div class="main-wrapper__controls">
      <Controls />
      <h3>
        <a
          href="https://devslovecoffee.com/blog/making-apple-progressive-blur-on-web"
          target="_blank"
          >Learn More</a
        >
      </h3>
      <h3>
        <a
          href="https://github.com/petttr1/PosterRamen/tree/main/components/progressive-blur"
          target="_blank"
          >See Source</a
        >
      </h3>
    </div>
  </div>
</template>
<script setup lang="ts">
import Controls from "~/components/progressive-blur/Controls.vue";
import CSSDisplay from "~/components/progressive-blur/CSSDisplay.vue";
import BlurredImage from "~/components/progressive-blur/BlurredImage.vue";
import defaultImages from "~/helpers/progressive-blur/images";

const activeIndex = useState("active-image", () => 0);
const customImage = useState("custom-image", () => null);

const imageSource = computed(() => {
  return customImage.value
    ? customImage.value
    : defaultImages[activeIndex.value].src;
});

const imageAlt = computed(() => {
  return customImage.value
    ? "Custom Image"
    : defaultImages[activeIndex.value].alt;
});

const getCredits = computed(() =>
  customImage.value ? `Image by You` : defaultImages[activeIndex.value].credits,
);
</script>
<style lang="scss">
.main-wrapper {
  width: 100%;
  min-height: 100vh;
  position: relative;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto auto;
  grid-template-areas:
    "image image"
    "controls controls"
    "code code";
  justify-items: stretch;

  @media (min-width: $medium) {
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr auto;
    grid-template-areas:
      "image controls"
      "code .";
    justify-items: start;
    justify-content: space-between;
  }

  &__image {
    grid-area: image;
    height: 100%;
    width: 100%;
    padding: 1rem 1rem 0;
  }

  &__code {
    grid-area: code;
    padding: 0 1rem;
    width: 100%;
  }

  &__controls {
    grid-area: controls;

    a {
      color: $text;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        background: none;
        color: $active;
      }
    }

    @media (min-width: $medium) {
      position: sticky;
      top: 60px;
    }
  }
}
</style>

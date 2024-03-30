<template>
  <div class="main-wrapper">
    <div class="main-wrapper__image">
      <BlurredImage
        :src="defaultImages[activeIndex].src"
        :credits="defaultImages[activeIndex].credits"
        :alt="defaultImages[activeIndex].alt"
      />
    </div>
    <div class="main-wrapper__code">
      <CSSDisplay />
    </div>
    <div class="main-wrapper__controls">
      <Controls />
    </div>
  </div>
</template>
<script setup lang="ts">
import Controls from "~/components/progressive-blur/Controls.vue";
import CSSDisplay from "~/components/progressive-blur/CSSDisplay.vue";
import BlurredImage from "~/components/progressive-blur/BlurredImage.vue";

import defaultImages from "~/helpers/progressive-blur/images";

const activeIndex = useState("active-image", () => 0);
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
    grid-template-columns: 1fr min-content;
    grid-template-rows: 1fr auto;
    grid-template-areas:
      "image controls"
      "code .";
    justify-items: start;
  }

  &__image {
    grid-area: image;
    height: 100%;
    width: 100%;
    padding: 1rem 1rem 0;

    @media (min-width: $medium) {
      width: 100%;
    }
  }

  &__code {
    grid-area: code;
    padding: 0 1rem;
  }

  &__controls {
    grid-area: controls;

    @media (min-width: $medium) {
      position: sticky;
      top: 60px;
    }
  }
}
</style>

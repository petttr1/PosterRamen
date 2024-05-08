<template>
  <div class="css-display">
    <div v-if="customImage" class="css-display__warning">
      <p>
        <Icon name="material-symbols-light:warning" size="18" />
        Custom image is being used. You will need to edit URLs in the source
        code to reflect this.
      </p>
    </div>
    <div class="css-display__section">
      HTML
      <button @click="copyHTML">COPY</button>
    </div>
    <div class="css-display__html">
      <pre><code>{{ htmlSource }}</code></pre>
    </div>
    <div class="css-display__section">
      CSS
      <button @click="copyCSS">COPY</button>
    </div>
    <div class="css-display__css">
      <pre><code>{{ cssSource }}</code></pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import { css_beautify, html_beautify } from "js-beautify";
import {
  getBaseImageSegmentAfterStyle,
  getBaseImageSegmentStyle,
  getCssString,
  getGlassHTMLString,
  getGlassWrapperStyle,
  getImageSegmentAfterStyle,
  getImageSegmentStyle,
  getImageStyle,
  getWrapperStyle,
} from "~/helpers/glass";
import { glassImages } from "~/helpers/glass/images";

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

const imageAlt = computed(() => {
  return customImage.value
    ? "Custom Image"
    : glassImages[activeIndex.value].alt;
});

const htmlSource = computed(() => {
  return html_beautify(
    getGlassHTMLString(
      verticalSegments.value,
      imageSource.value,
      imageAlt.value,
    ),
  );
});

const cssSource = computed(() => {
  const wrapperStyle = getWrapperStyle(borderRadius.value);
  const imageStyle = getImageStyle();
  const imageWrapperStyle = getGlassWrapperStyle(verticalSegments.value);
  const imageSegmentBaseStyle = getBaseImageSegmentStyle(
    imageScale.value,
    imageSource.value,
  );
  const imageSegmentStyle = getImageSegmentStyle(verticalSegments.value);
  const imageSegmentAfterBaseStyle = getBaseImageSegmentAfterStyle(
    verticalBase.value,
    reflectWidth.value,
    reflectScale.value,
    imageSource.value,
  );
  const imageSegmentAfterStyle = getImageSegmentAfterStyle(
    verticalSegments.value,
    verticalOffset.value,
  );
  return css_beautify(
    getCssString({
      ...wrapperStyle,
      ...imageStyle,
      ...imageWrapperStyle,
      ...imageSegmentBaseStyle,
      ...imageSegmentAfterBaseStyle,
      ...imageSegmentStyle,
      ...imageSegmentAfterStyle,
    }),
  );
});

const copyHTML = () => {
  if (typeof navigator === "undefined") return;
  navigator.clipboard.writeText(htmlSource.value);
};
const copyCSS = () => {
  if (typeof navigator === "undefined") return;
  navigator.clipboard.writeText(cssSource.value);
};
</script>
<style lang="scss" scoped>
.css-display {
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto;

  &__warning {
    @include level4;
    color: $active;
  }

  &__section {
    @include level4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $text;
    font-weight: bold;
    margin-top: 1rem;

    button {
      padding: 5px 10px;

      &:hover {
        background: $active;
        color: white;
      }
    }
  }

  &__html {
    @include code;
    overflow: hidden;
    border: 1px solid $active;
  }

  &__css {
    @include code;
    overflow: hidden;
    border: 1px solid $active;
  }
}
</style>

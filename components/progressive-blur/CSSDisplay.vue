<template>
  <div class="css-display">
    <div
      v-if="customImage"
      class="css-display__warning"
    >
      <p>
        <Icon
          name="material-symbols-light:warning"
          size="18"
        />
        Custom image is being used. You will need to edit URLs in the source
        code to reflect this.
      </p>
    </div>
    <div class="css-display__section">
      HTML
      <button @click="copyHTML">
        COPY
      </button>
    </div>
    <div class="css-display__html">
      <pre><code>{{ htmlSource }}</code></pre>
    </div>
    <div class="css-display__section">
      CSS
      <button @click="copyCSS">
        COPY
      </button>
    </div>
    <div class="css-display__css">
      <pre><code>{{ cssSource }}</code></pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  getBlurDisplayStyles,
  getBaseBlurStyle,
  getBlurWrapperStyle,
  getWrapperStyle,
  getImageStyle,
  getBlurHTMLString,
  getCssString,
} from "~/helpers/progressive-blur";
import { defaultImages } from "~/helpers/progressive-blur/images";
import { css_beautify, html_beautify } from "js-beautify";

const blurHeight = useState("blur-height", () => 50);
const blurDetail = useState("blur-detail", () => 5);
const blurAmount = useState("blur-amount", () => 1);
const activeIndex = useState("active-image", () => 0);
const borderRadius = useState("border-radius", () => 0);
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

const htmlSource = computed(() => {
  return html_beautify(
    getBlurHTMLString(blurDetail.value, imageSource.value, imageAlt.value),
  );
});

const cssSource = computed(() => {
  const wrapperStyle = getWrapperStyle(borderRadius.value);
  const imageStyle = getImageStyle(1.2);
  const blurWrapperStyle = getBlurWrapperStyle(blurDetail.value, 1.2);
  const baseBlurStyle = getBaseBlurStyle(imageSource.value);
  const individualBlurStyles = getBlurDisplayStyles(
    blurHeight.value,
    blurDetail.value,
    blurAmount.value,
  );
  return css_beautify(
    getCssString({
      ...wrapperStyle,
      ...imageStyle,
      ...blurWrapperStyle,
      ...baseBlurStyle,
      ...individualBlurStyles,
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

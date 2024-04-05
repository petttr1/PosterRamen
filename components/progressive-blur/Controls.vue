<template>
  <div class="controls">
    <h2>Upload Your Image</h2>
    <input
      id="fileInput"
      class="controls__upload"
      type="file"
      accept=".jpg,.jpeg,.png"
      @input="onImageUploaded"
    />
    <label for="fileInput" class="controls__upload-label">UPLOAD</label>
    <span class="controls__section-title">Or Browse Default</span>
    <div v-if="!customImage" class="controls__navigation">
      <button class="controls__navigation__button" @click="prevImage">
        <Icon name="material-symbols:arrow-back" size="24" />
      </button>
      <button class="controls__navigation__button" @click="nextImage">
        <Icon name="material-symbols:arrow-forward" size="24" />
      </button>
    </div>
    <button v-else class="controls__clear" @click="customImage = null">
      CLEAR
    </button>
    <h2>Set Parameters</h2>
    <client-only>
      <span>Border Radius ({{ borderRadius }}%)</span>
      <VueSlider
        :value="borderRadius"
        :min="0"
        :max="50"
        :interval="0.1"
        @change="onBorderRadiusUpdated"
      />
      <span>Blur Height ({{ blurHeight }}%)</span>
      <VueSlider
        :value="blurHeight"
        :min="0"
        :max="100"
        @change="onBlurHeightUpdated"
      />
      <span>Blur Detail ({{ blurDetail }})</span>
      <VueSlider
        :value="blurDetail"
        :min="1"
        :max="10"
        @change="onBlurDetailUpdated"
      />
      <span>Blur Amount ({{ blurAmount }})</span>
      <VueSlider
        :value="blurAmount"
        :min="0.5"
        :max="3"
        :interval="0.5"
        @change="onBlurAmountUpdated"
      />
      <span>Scale ({{ scaleAmount }})</span>
      <VueSlider
        :value="scaleAmount"
        :min="1.0"
        :max="2.0"
        :interval="0.1"
        @change="onScaleAmountUpdated"
      />
    </client-only>
    <h2>Click Image to Download</h2>
  </div>
</template>
<script setup lang="ts">
import VueSlider from "vue-3-slider-component";
import defaultImages from "~/helpers/progressive-blur/images";

const borderRadius = useState("border-radius", () => 0);
const blurHeight = useState("blur-height", () => 50);
const blurDetail = useState("blur-detail", () => 5);
const blurAmount = useState("blur-amount", () => 1);
const scaleAmount = useState("scale", () => 1.2);
const activeIndex = useState("active-image", () => 0);
const customImage = useState("custom-image", () => null);

const onBorderRadiusUpdated = (value: number) => {
  borderRadius.value = value;
};
const onBlurHeightUpdated = (value: number) => {
  blurHeight.value = value;
};

const onBlurDetailUpdated = (value: number) => {
  blurDetail.value = value;
};

const onBlurAmountUpdated = (value: number) => {
  blurAmount.value = value;
};

const onScaleAmountUpdated = (value: number) => {
  scaleAmount.value = value;
};

const prevImage = () => {
  activeIndex.value =
    activeIndex.value === 0 ? defaultImages.length - 1 : activeIndex.value - 1;
};
const nextImage = () => {
  activeIndex.value =
    activeIndex.value === defaultImages.length - 1 ? 0 : activeIndex.value + 1;
};

const onImageUploaded = (value: any) => {
  const file = value.target.files[0];
  customImage.value = URL.createObjectURL(file);
};

onMounted(() => {
  onBorderRadiusUpdated(0);
  onBlurHeightUpdated(50);
  onBlurDetailUpdated(5);
  onBlurAmountUpdated(1);
  onScaleAmountUpdated(1.2);
});
</script>
<style lang="scss" scoped>
.controls {
  position: relative;
  padding: 0.5rem 1rem 1rem;
  //min-width: 17rem;
  //max-width: 1000px;
  //width: 100%;
  border-top: 2px solid $text;

  @media (min-width: $medium) {
    border-left: 2px solid $text;
    border-bottom: 2px solid $text;
    border-top: none;
  }

  h2:not(:first-of-type) {
    margin-top: 1rem;
  }

  span {
    @include level4;
  }

  &__upload {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }

  &__upload-label {
    @include level3;
    background: $active;
    color: $base;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    padding: 10px 24px;
    text-align: center;
    width: 100%;

    &:hover {
      color: $active;
      background: $base;
    }
  }

  &__clear {
    @include level3;
    color: $active;
    background: $base;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    padding: 2px 24px;
    text-align: center;
    width: 100%;

    &:hover {
      background: $active;
      color: $base;
    }
  }

  &__navigation {
    display: flex;
    align-items: center;

    &__button {
      @include level3;
      padding: 10px 24px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      width: 100%;

      &:not(:last-child) {
        border-right: 2px solid $text;
      }

      &:hover {
        background: $active;
        color: white;
      }
    }
  }
}
</style>

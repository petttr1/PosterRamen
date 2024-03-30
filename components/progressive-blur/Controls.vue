<template>
  <div class="controls">
    <span class="controls__section-title">Image</span>
    <div class="controls__navigation">
      <button class="controls__navigation__button" @click="prevImage">
        <Icon name="material-symbols:arrow-back" size="24" />
      </button>
      <button class="controls__navigation__button" @click="nextImage">
        <Icon name="material-symbols:arrow-forward" size="24" />
      </button>
    </div>
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
    </client-only>
  </div>
</template>
<script setup lang="ts">
import VueSlider from "vue-3-slider-component";
import defaultImages from "~/helpers/progressive-blur/images";

const borderRadius = useState("border-radius", () => 0);
const blurHeight = useState("blur-height", () => 50);
const blurDetail = useState("blur-detail", () => 5);
const blurAmount = useState("blur-amount", () => 1);
const activeIndex = useState("active-image", () => 0);
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

const prevImage = () => {
  activeIndex.value =
    activeIndex.value === 0 ? defaultImages.length - 1 : activeIndex.value - 1;
};
const nextImage = () => {
  activeIndex.value =
    activeIndex.value === defaultImages.length - 1 ? 0 : activeIndex.value + 1;
};

onMounted(() => {
  onBorderRadiusUpdated(0);
  onBlurHeightUpdated(50);
  onBlurDetailUpdated(5);
  onBlurAmountUpdated(1);
});
</script>
<style lang="scss" scoped>
.controls {
  padding: 1rem;
  max-width: 1000px;
  width: 100%;
  border-top: 2px solid $text;

  @media (min-width: $medium) {
    border-left: 2px solid $text;
    border-bottom: 2px solid $text;
    border-top: none;
  }

  span {
    @include level4;
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

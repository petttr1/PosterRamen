<template>
  <div class="controls">
    <h2>Upload Your Image</h2>
    <input
      id="fileInput"
      class="controls__upload"
      type="file"
      accept=".jpg,.jpeg,.png, .webp"
      @input="onImageUploaded"
    >
    <label
      for="fileInput"
      class="controls__upload-label"
    >UPLOAD</label>
    <span class="controls__section-title">Or Browse Default</span>
    <div
      v-if="!customImage"
      class="controls__navigation"
    >
      <button
        class="controls__navigation__button"
        @click="prevImage"
      >
        <Icon
          name="material-symbols:arrow-back"
          size="24"
        />
      </button>
      <button
        class="controls__navigation__button"
        @click="nextImage"
      >
        <Icon
          name="material-symbols:arrow-forward"
          size="24"
        />
      </button>
    </div>
    <button
      v-else
      class="controls__clear"
      @click="customImage = null"
    >
      CLEAR
    </button>
    <h2>Set Parameters</h2>
    <client-only>
      <span>Border Radius ({{ borderRadius }}%)</span>
      <VueSlider
        :dot-size="26"
        :dot-style="dotStyle"
        :tooltip-style="tooltipStyle"
        :rail-style="railStyle"
        :process-style="processStyle"
        :value="borderRadius"
        :min="0"
        :max="50"
        :interval="0.1"
        @change="onBorderRadiusUpdated"
      />
      <span>Segments ({{ verticalSegments }})</span>
      <VueSlider
        :dot-size="26"
        :dot-style="dotStyle"
        :tooltip-style="tooltipStyle"
        :rail-style="railStyle"
        :process-style="processStyle"
        :value="verticalSegments"
        :min="10"
        :max="100"
        @change="onVerticalSegmentsUpdated"
      />
      <span>Base ({{ verticalBase }})</span>
      <VueSlider
        :dot-size="26"
        :dot-style="dotStyle"
        :tooltip-style="tooltipStyle"
        :rail-style="railStyle"
        :process-style="processStyle"
        :value="verticalBase"
        :min="1"
        :max="100"
        @change="onVerticalBaseUpdated"
      />
      <span>Offset ({{ verticalOffset }}%)</span>
      <VueSlider
        :dot-size="26"
        :dot-style="dotStyle"
        :tooltip-style="tooltipStyle"
        :rail-style="railStyle"
        :process-style="processStyle"
        :value="verticalOffset"
        :min="0"
        :max="200"
        @change="onVerticalOffsetUpdated"
      />
      <span>Reflection Width ({{ reflectWidth }}%)</span>
      <VueSlider
        :dot-size="26"
        :dot-style="dotStyle"
        :tooltip-style="tooltipStyle"
        :rail-style="railStyle"
        :process-style="processStyle"
        :value="reflectWidth"
        :min="0"
        :max="100"
        @change="onReflectWidthUpdated"
      />
      <span>Image Scale ({{ imageScale }}%)</span>
      <VueSlider
        :dot-size="26"
        :dot-style="dotStyle"
        :tooltip-style="tooltipStyle"
        :rail-style="railStyle"
        :process-style="processStyle"
        :value="imageScale"
        :min="500"
        :max="1000"
        @change="onImageScaleUpdated"
      />
      <span>Reflection Scale ({{ reflectScale }}%)</span>
      <VueSlider
        :dot-size="26"
        :dot-style="dotStyle"
        :tooltip-style="tooltipStyle"
        :rail-style="railStyle"
        :process-style="processStyle"
        :value="reflectScale"
        :min="700"
        :max="2000"
        @change="onReflectScaleUpdated"
      />
    </client-only>
    <h2>Click Image to Download</h2>
  </div>
</template>
<script setup lang="ts">
import VueSlider from "vue-3-slider-component";
import { glassImages } from "~/helpers/glass/images";

const borderRadius = useState("border-radius", () => 0);
const verticalSegments = useState("glass-vertical-segments", () => 33);
const verticalOffset = useState("glass-vertical-offset", () => 50);
const verticalBase = useState("glass-vertical-base", () => 70);
const activeIndex = useState("active-image", () => 0);
const customImage = useState("custom-image", () => null);
const reflectWidth = useState("reflect-width", () => 35);
const imageScale = useState("image-scale", () => 800);
const reflectScale = useState("reflect-scale", () => 1400);

const dotStyle = {
  width: "26px",
  height: "26px",
  borderRadius: 0,
  "box-shadow": "none",
  "-webkit-box-shadow": "none",
  backgroundColor: "#FF6E50",
};

const tooltipStyle = {
  borderRadius: 0,
  color: "#F8F7F4",
  backgroundColor: "#FF6E50",
};

const railStyle = {
  backgroundColor: "#3111B9",
  borderRadius: 0,
};

const processStyle = {
  backgroundColor: "#FF6E50",
  borderRadius: 0,
};

const onBorderRadiusUpdated = (value: number) => {
  borderRadius.value = value;
};

const onVerticalSegmentsUpdated = (value: number) => {
  verticalSegments.value = value;
};

const onVerticalOffsetUpdated = (value: number) => {
  verticalOffset.value = value;
};

const onVerticalBaseUpdated = (value: number) => {
  verticalBase.value = value;
};

const onReflectWidthUpdated = (value: number) => {
  reflectWidth.value = value;
};

const onImageScaleUpdated = (value: number) => {
  imageScale.value = value;
};

const onReflectScaleUpdated = (value: number) => {
  reflectScale.value = value;
};

const prevImage = () => {
  activeIndex.value =
    activeIndex.value === 0 ? glassImages.length - 1 : activeIndex.value - 1;
};
const nextImage = () => {
  activeIndex.value =
    activeIndex.value === glassImages.length - 1 ? 0 : activeIndex.value + 1;
};

const onImageUploaded = (value: any) => {
  const file = value.target.files[0];
  customImage.value = URL.createObjectURL(file);
};

onMounted(() => {
  onBorderRadiusUpdated(0);
  onVerticalSegmentsUpdated(33);
  onVerticalOffsetUpdated(50);
  onVerticalBaseUpdated(70);
  onReflectWidthUpdated(35);
  onImageScaleUpdated(800);
  onReflectScaleUpdated(1400);
});
</script>
<style lang="scss" scoped>
:deep(.vue-slider-dot-tooltip-inner:after) {
  display: none;
}

.controls {
  position: relative;
  padding: 0.5rem 1rem 1rem;
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

<template>
  <div class="controls">
    <button
      class="refreshButton"
      @click="refreshScene"
    >
      Randomize
    </button>
    <span>Text Color</span>
    <TextColorPicker />
    <span>Frame Color</span>
    <ColorPicker />
    <span>Text align</span>
    <TextAlignOptions />
    <span>Actions</span>
    <button
      class="downloadButton"
      @click="downloadSnapshot"
    >
      Export as PDF
    </button>
    <p>Dragging the image will augment it.</p>
    <p>Click the text to edit.</p>
  </div>
</template>

<script setup lang="ts">
import TextColorPicker from "~/components/controls/TextColorPicker.vue";
import ColorPicker from "~/components/controls/ColorPicker.vue";
import TextAlignOptions from "~/components/controls/TextAlignOptions.vue";

const { $bus } = useNuxtApp();
const refreshScene = () => {
  $bus.$emit('refreshScene');
}
const downloadSnapshot = () => {
  $bus.$emit('download');
}
</script>

<style lang="scss" scoped>
span {
  color: $white;
  font-size: 0.8rem;
  margin: 24px 0 8px;
}
.controls {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 8px 0;
  border-left: 2px solid $highlight;
  height: 100%;
  width: 100%;

  button {
    @include button(9px, 9px, 8px);
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: 8px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  p {
    color: $white;
    text-wrap: nowrap;

  }
}
</style>

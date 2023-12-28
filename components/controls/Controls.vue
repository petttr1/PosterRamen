<template>
  <div class="controls">
    <p>Edit the design by dragging.</p>
    <p>Edit and move the text.</p>
    <p>Download exports separate layers as PDFs.</p>
    <p>Go crazy in post-process.</p>
    <ExportOptions />
    <span>Colors</span>
    <ColorsPicker />
  </div>
</template>

<script setup lang="ts">
import ExportOptions from "~/components/controls/ExportOptions.vue";
import ColorPicker from "~/components/controls/ColorPicker.vue";
import ColorsPicker from "~/components/controls/ColorsPicker.vue";
</script>

<style lang="scss" scoped>
span {
  color: $white;
  font-size: 0.8rem;
  margin: 16px 0 8px;
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
  }

  p {
    color: $white;
    line-height: 180%;
    text-wrap: nowrap;
    &:last-of-type {
      margin-bottom: 24px;
    }
  }
}
</style>

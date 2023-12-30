<template>
  <div class="controls">
    <ul>
      <li>Edit the design by dragging.</li>
      <li>Edit and move the text.</li>
      <li>Download layers as PDF.</li>
      <li>Go crazy in post-process.</li>
    </ul>
    <ExportOptions />
    <ColorsPicker />
  </div>
</template>

<script setup lang="ts">
import ExportOptions from "~/components/controls/ExportOptions.vue";
import ColorsPicker from "~/components/controls/ColorsPicker.vue";
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  border-left: 2px solid $text;
  border-bottom: 2px solid $text;

  @media (max-width: 769px) {
    flex-direction: column-reverse;
    border-left: none;
    border-bottom: none;
    border-top: 2px solid $text;
  }

  ul {
    list-style-type: none;
    padding: 16px 0 16px 20px;

    li {
      text-align: left;
      white-space: nowrap;
      &:before {
        content: "\2733";
        padding-right: 8px;
      }
    }
  }
}
</style>

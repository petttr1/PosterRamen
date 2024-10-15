<template>
  <div class="controls">
    <ul>
      <li>
        <Icon name="mdi:asterisk" size="24" />Edit the design by dragging.
      </li>
      <li><Icon name="mdi:asterisk" size="24" />Edit and move the text.</li>
      <li><Icon name="mdi:asterisk" size="24" />Download layers as PDF.</li>
    </ul>
    <ExportOptions />
    <ColorsPicker />
  </div>
</template>

<script setup lang="ts">
import ExportOptions from "~/components/poster/controls/ExportOptions.vue";
import ColorsPicker from "~/components/poster/controls/ColorsPicker.vue";
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  width: 100%;
  border-top: 2px solid $text;

  @media (min-width: $medium) {
    border-left: 2px solid $text;
    border-bottom: 2px solid $text;
    border-top: none;
    flex-direction: column;
    align-items: flex-start;
  }

  ul {
    list-style-type: none;
    padding: 16px 0 16px 20px;

    li {
      text-align: left;
      white-space: nowrap;
      .icon {
        margin-right: 8px;
      }
    }
  }
}
</style>

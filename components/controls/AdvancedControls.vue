<template>
  <button class="advanced-toggle" @click="toggleAdvanced">
    Advanced Options <Icon v-if="showAdvanced" name="mdi:arrow-down" />
    <Icon v-else name="mdi:arrow-right" />
  </button>
  <div v-show="showAdvanced" class="advanced-controls">
    <span>Pattern</span>
    <PatternControls />
    <span>Frame</span>
    <BorderControls />
    <ColorPicker />
    <span>Text</span>
    <TextVisibilityControls />
    <TextColorPicker />
    <TextAlignOptions />
    <VerticalFlowControls />
  </div>
</template>

<script setup lang="ts">
import TextColorPicker from "~/components/controls/TextColorPicker.vue";
import ColorPicker from "~/components/controls/ColorPicker.vue";
import TextAlignOptions from "~/components/controls/TextAlignOptions.vue";
import BorderControls from "~/components/controls/BorderControls.vue";
import VerticalFlowControls from "~/components/controls/VerticalFlowControls.vue";
import PatternControls from "~/components/controls/PatternControls.vue";
import TextVisibilityControls from "~/components/controls/TextVisibilityControls.vue";

const showAdvanced = ref<boolean>(false);

const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value;
};
</script>

<style lang="scss" scoped>
.advanced-toggle {
  margin-top: 8px;
  color: $white-80;

  &:hover {
    color: $white;
  }
}

.advanced-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 8px 0;
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
    text-wrap: nowrap;
  }

  span {
    color: $white;
    font-size: 0.8rem;
    margin: 16px 0 8px;
  }
}
</style>

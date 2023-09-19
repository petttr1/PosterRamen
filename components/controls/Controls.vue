<template>
  <div class="controls">
    <p>Dragging the pattern will augment it.</p>
    <p>Click the text to edit.</p>
    <span>Pattern</span>
    <PatternControls />
    <AdvancedControls />
    <span>Poster Options</span>
    <button
      class="saveButton"
      @click="newDesign"
    >
      <Icon name="material-symbols:add-photo-alternate-outline" />
      New
    </button>
    <span>Save Poster for Later Edit</span>
    <button
      v-if="user"
      class="saveButton"
      @click="saveDesign"
    >
      <Icon name="bi:cloud-check-fill" />
      Save For Later
    </button>
    <button
      v-else
      class="saveButton"
      @click="saveDesign"
    >
      Log in to Save
    </button>
    <span>Export</span>
    <ExportOptions />
  </div>
</template>

<script setup lang="ts">
import TextColorPicker from "~/components/controls/TextColorPicker.vue";
import ColorPicker from "~/components/controls/ColorPicker.vue";
import TextAlignOptions from "~/components/controls/TextAlignOptions.vue";
import BorderControls from "~/components/controls/BorderControls.vue";
import VerticalFlowControls from "~/components/controls/VerticalFlowControls.vue";
import FontOptions from "~/components/controls/FontOptions.vue";
import PatternControls from "~/components/controls/PatternControls.vue";
import ExportOptions from "~/components/controls/ExportOptions.vue";
import AdvancedControls from "~/components/controls/AdvancedControls.vue";

const user = useSupabaseUser();

const saveDesign = () => {
  const { $bus } = useNuxtApp();
  $bus.$emit('save');
}

const newDesign = () => {
  const { $bus } = useNuxtApp();
  $bus.$emit('new');
}
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
    text-wrap: nowrap;

  }
}
</style>

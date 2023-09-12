<template>
  <div class="font-options">
    <select
      v-model="selected"
      class="font-options__font-select"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <button
      class="font-options__random"
      @click="selectRandom"
    >
      Random
    </button>
  </div>
</template>
<script setup lang="ts">
import {fonts} from "~/helpers/fonts";
import {useSceneStore} from "~/store/scene";

const selected = ref('Goldman')

watch(selected, () => {
  updateFont();
})
const selectRandom = () => {
  selected.value = fonts[Math.floor(Math.random() * fonts.length)];
}
const updateFont = () => {
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  if (!scene) return;
  sceneStore.storeScene({id: scene.id, font: selected.value});
}

const options = ref(fonts)
</script>
<style lang="scss" scoped>
.font-options {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  &__font-select {
    color: $white;
    outline: none;
    padding: 4px 8px;
    border: 2px solid $highlight-50;
    border-radius: 8px;

    &:hover {
      background: $highlight-30;
    }
  }

  &__random {
    @include button(4px, 8px, 6px);
  }
}
</style>
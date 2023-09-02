<template>
  <div class="vertical-flow">
    <button
      v-for="opt of options"
      :key="opt.id"
      :class="{selected: opt.value === selectedOption}"
      @click="updateAlign(opt)"
    >
      {{ opt }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {useSceneStore} from "~/store/scene";

const options = ref<any[]>([
  {id: 0, name: '↑', value: 'bottom'},
  {id: 1, name: '↓', value: 'top'},
]);
const sceneStore = useSceneStore();

const selectedOption = computed(() => sceneStore.scene(sceneStore.activeScene!).verticalFlow);
const updateAlign = (option: any) => {
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  if (!scene) return;
  sceneStore.storeScene({id: scene.id, verticalFlow: option.value});
}
</script>

<style lang="scss" scoped>
.text-align {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;

  button {
    @include button(4px, 8px);
    flex-shrink: 0;
    border-radius: 2px;
    cursor: default;
    text-transform: capitalize;

    &.selected {
      background: $white;
      color: $highlight;
    }

    &:first-of-type {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &:last-of-type {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
}
</style>

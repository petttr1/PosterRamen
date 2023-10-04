<template>
  <div class="vertical-flow">
    <button
      @click="switchFlow"
    >
      <Icon
        name="carbon:rotate-clockwise-filled"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import {useSceneStore} from "~/store/scene";
let flowIndex = 0;
const options = ref<any[]>([
  {id: 0, vertical: 'column-reverse', horizontal: 'row-reverse'},
  {id: 1, vertical: 'column', horizontal: 'row'},
  {id: 2, vertical: 'column',  horizontal: 'row-reverse'},
  {id: 3, vertical: 'column-reverse', horizontal: 'row'},
]);
const sceneStore = useSceneStore();
const switchFlow = () => {
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  if (!scene) return;
  flowIndex = (flowIndex + 1) % options.value.length;
  sceneStore.storeScene({
    id: scene.id,
    verticalFlow: options.value[flowIndex].vertical,
    horizontalFlow: options.value[flowIndex].horizontal
  });
}
</script>

<style lang="scss" scoped>
.vertical-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;

  button {
    @include button(8px, 8px);
    flex-shrink: 0;
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

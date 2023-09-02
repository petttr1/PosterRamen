<template>
  <div class="borders">
    <button
      v-for="opt of borderOptions"
      :key="opt.id"
      :class="{active: showBorders === opt.id}"
      :style="{'grid-area': `row${opt.row}`}"
      @click="updateShowBorders(opt.value)"
    >
      {{ opt.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {useSceneStore} from "~/store/scene";

const showBorders = computed(() => {
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  return scene.showBorders ? 0 : 1;
})

const borderOptions = ref<any[]>([
  {id: 0, name: 'show', value: true},
  {id: 1, name: 'hide', value: false},
]);

const updateShowBorders = (show: boolean) => {
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  if (!scene) return;
  sceneStore.storeScene({id: scene.id, showBorders: show });
}
</script>

<style lang="scss" scoped>
.borders {
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

    &.active {
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

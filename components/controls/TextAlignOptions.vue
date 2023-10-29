<template>
  <label>
    Align
    <div class="text-align">
      <button
        v-for="opt of options"
        :key="opt"
        :class="{selected: opt === selectedOption}"
        @click="updateAlign(opt)"
      >
        <Icon :name="`material-symbols:format-align-${opt}`" />
      </button>
    </div>
  </label>
</template>

<script setup lang="ts">
import {useSceneStore} from "~/store/scene";

const options = ref<string[]>([
  'left', 'center', 'right'
]);
const sceneStore = useSceneStore();

const selectedOption = computed(() => sceneStore.scene(sceneStore.activeScene!).textAlign);
const updateAlign = (option: "left" | "center" | "right") => {
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  if (!scene) return;
  sceneStore.storeScene({id: scene.id, textAlign: option});
}
</script>

<style lang="scss" scoped>
label {
  @include label;
}
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

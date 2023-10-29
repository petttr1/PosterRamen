<template>
  <label>
    Show Text
    <div class="show-text">
      <button
        v-for="opt of textOptions"
        :key="opt.id"
        :class="{active: showText === opt.id}"
        :style="{'grid-area': `row${opt.row}`}"
        @click="updateShowText(opt.value)"
      >
        <Icon :name="opt.icon" />
      </button>
    </div>
  </label>
</template>

<script setup lang="ts">
import {useSceneStore} from "~/store/scene";

const showText = computed(() => {
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  return scene.showText ? 0 : 1;
})

const textOptions = ref<any[]>([
  {id: 0, name: 'show', value: true, icon: 'ion:md-eye'},
  {id: 1, name: 'hide', value: false, icon: 'ion:md-eye-off'},
]);

const updateShowText = (show: boolean) => {
  const sceneStore = useSceneStore();
  const scene = sceneStore.scene(sceneStore.activeScene!);
  if (!scene) return;
  sceneStore.storeScene({id: scene.id, showText: show });
}
</script>

<style lang="scss" scoped>
label {
  @include label;
}
.show-text {
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

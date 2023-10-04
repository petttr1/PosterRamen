<template>
  <div class="profile">
    <button
      v-for="(scene, index) of scenes"
      :key="scene.id"
      @click="openScene(scene.id)"
    >
      {{ index }}{{ scene.title }}
    </button>
  </div>
</template>
<script lang="ts" setup>
import {getDatabaseScenes} from "~/helpers/db";
import {useSceneStore} from "~/store/scene";

const scenes = await getDatabaseScenes();
const openScene = (id: string) => {
  const sceneStore = useSceneStore();
  sceneStore.setActiveScene(id);
  return navigateTo({
    path: '/app',
  })
}
</script>
<style lang="scss" scoped>
.profile {
  margin: 128px auto 0;
  color: $white;
}
</style>
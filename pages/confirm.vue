<template>
  <div>
    <p class="u-text-black">
      Your work is resuming.
    </p>
  </div>
</template>

<script setup lang="ts">
import {watchEffect} from "vue";
import { useSceneStore } from '~/store/scene'
const route = useRoute()
const confirmUser = useSupabaseUser()
watchEffect( () => {
  if (confirmUser.value) {
    const sceneStore = useSceneStore()
    if (sceneStore.activeScene) {
      return navigateTo({
        path: '/app',
        params: {
          id: sceneStore.activeScene
        }
      })
    }
    return navigateTo('/')
  }
})
</script>

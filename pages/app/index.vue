<template>
  <AppContainer />
</template>
<script setup lang="ts">
import AppContainer from "~/components/AppContainer.vue";
import {loadScenesToStore} from "~/helpers/db";
onMounted(async () => {
  const user = useSupabaseUser();
  if (user.value) {
    await loadScenesToStore();
  }
})
</script>
<style lang="scss"></style>

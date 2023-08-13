<template>
  <div>
    <p class="u-text-black">
      Your work is resuming.
    </p>
  </div>
</template>

<script setup lang="ts">
import {watchEffect} from "vue";

const confirmUser = useSupabaseUser()
watchEffect( () => {
  if (confirmUser.value) {
    navigateTo('/')
  }
})
</script>

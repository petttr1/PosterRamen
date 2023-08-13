<template>
  Logging out...
</template>
<script setup lang="ts">
import {onMounted} from "vue";

const handleLogOut = async () => {
  const { error } = await supabase.auth.signOut()
  return navigateTo('/')
}

onMounted(() => {
  handleLogOut();
})
</script>

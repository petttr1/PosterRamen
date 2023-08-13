<template>
  <PasswordLogin />
  <hr>
  <span>Don't have an account?</span>
  <PasswordSignup />
</template>
<script setup lang="ts">
import PasswordLogin from "~/components/PasswordLogin.vue";
import PasswordSignup from "~/components/PasswordSignup.vue";
</script>

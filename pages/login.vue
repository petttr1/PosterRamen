<template>
  <div class="login">
    <h1>Log in</h1>
    <PasswordLogin />
    <hr>
    <span>Don't have an account?</span>
    <PasswordSignup />
  </div>
</template>
<script setup lang="ts">
import PasswordLogin from "~/components/PasswordLogin.vue";
import PasswordSignup from "~/components/PasswordSignup.vue";
</script>
<style lang="scss" scoped>
.login {
  max-width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h1 {
    color: $yellow;
  }

  hr {
    border-color: $yellow;
    margin: 16px 0;
  }

  span {
    color: $yellow;
    text-align: center;
    width: 100%;
    margin-top: 8px;
    font-size: 1.4rem;
  }
}
</style>

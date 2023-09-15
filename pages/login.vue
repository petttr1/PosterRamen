<template>
  <div class="login">
    <nuxt-link
      to="/app"
      class="login__back"
    >
      <Icon
        name="ion:md-arrow-back"
        size="24"
      />
    </nuxt-link>
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

  &__back {
    color: $white;

  }

  h1 {
    color: $white;
    padding-top: 16px;
  }

  hr {
    border-color: $white;
    margin: 16px 0;
  }

  span {
    color: $white;
    text-align: center;
    width: 100%;
    margin-top: 8px;
    font-size: 1.4rem;
  }
}
</style>

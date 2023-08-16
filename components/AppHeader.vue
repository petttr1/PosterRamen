<template>
  <div class="header">
    <div class="header__navigation">
      <nuxt-link
        to="/"
        class="header__navigation__title"
      >
        Poster Ramen
      </nuxt-link>
    </div>
    <div class="header__user-controls">
      <nuxt-link
        to="/about"
      >
        About
      </nuxt-link>
      <nuxt-link
        v-if="user"
        to="/logout"
      >
        Log out
      </nuxt-link>
      <nuxt-link
        v-else
        to="/login"
      >
        Log in
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser()
const goHome = () => {
  return navigateTo('/')
}
</script>
<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  z-index: 1;
  height: 40px;
  width: 100%;
  background: rgba($background, 0.8);
  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);
  display: flex;
  justify-content: space-between;
  align-items: center;

  a, button {
   @include button(9px 9px);
  }

  &__navigation {
    a {
      background: none;
      padding: 0 16px;
      font-weight: 400;
      line-height: 40px;
      font-size: 2rem;
      text-decoration: none;

      &:hover {
        color: $yellow;
        background: none;
      }
    }
  }

  &__user-controls {
    padding: 8px 16px;

    button, a {
      line-height: 20px;
      font-weight: 500;
      font-size: 1.2rem;
      padding: 9px;
      text-decoration: none;
      cursor: default;
    }
  }
}
</style>
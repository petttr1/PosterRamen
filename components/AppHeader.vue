<template>
  <div class="header">
    <div class="header__navigation">
      <nuxt-link to="/" class="header__navigation__title">
        Poster Ramen
      </nuxt-link>
    </div>
    <div class="header__menu">
      <nuxt-link :to="{ path: '/', hash: '#tools' }"> Tools </nuxt-link>
      <nuxt-link to="/showcase"> Showcase </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  z-index: 1000;
  height: 59px;
  width: 100%;
  background: rgba($base, 0.75);
  backdrop-filter: blur(35px);
  -webkit-backdrop-filter: blur(35px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid $active;
  padding: 0 16px;

  &__navigation {
    a {
      color: $text;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        background: none;
        color: $active;
      }
    }
  }

  &__menu {
    display: flex;
    align-items: center;
    gap: 20px;

    a {
      color: $text;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        background: none;
        color: $active;
      }
    }
  }
}
</style>

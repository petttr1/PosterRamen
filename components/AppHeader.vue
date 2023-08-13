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
        to="/pricing"
      >
        Pricing
      </nuxt-link>
      <button
        v-if="user"
        @click="handleLogOut"
      >
        Log out
      </button>
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

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const handleLogOut = async () => {
  const { error } = await supabase.auth.signOut()
  return navigateTo('/')
}

const goHome = () => {
  return navigateTo('/')
}
</script>
<style scoped lang="scss">
.header {
  height: 40px;
  width: 100%;
  background: $background;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
   @include button(9px 9px);
  }

  &__navigation {
    a {
      background: none;
      padding: 0 16px;
      font-weight: 400;
      line-height: 40px;
      font-size: 32px;
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
      font-weight: 500;
      font-size: 18px;
      padding: 9px;
      text-decoration: none;
      cursor: default;
    }
  }
}
</style>
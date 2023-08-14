<template>
  <AppHeader />
  <div
    id="app"
    class="app"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.app {
  height: 100vh;
}
</style>
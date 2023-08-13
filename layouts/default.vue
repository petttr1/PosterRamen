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
  height: calc(100vh - 40px);
  overflow: hidden;
}
</style>
<template>
  <div class="export-options">
    <button class="download-button" @click="download">
      Download <Icon name="ion:download" />
    </button>
    <button class="refreshButton" @click="refreshScene">
      <Icon name="ion:dice-sharp" />
      Random
    </button>
  </div>
</template>

<script setup lang="ts">
const download = () => {
  const { $bus } = useNuxtApp();
  $bus.$emit("download");
};
const refreshScene = () => {
  const { $bus } = useNuxtApp();
  $bus.$emit("refreshScene");
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $base-50;
  z-index: 1;
}

.extended-options {
  position: absolute;
  top: 42px;
  right: 0;
  padding: 8px;
  background: $highlight;
  z-index: 2;
  border-radius: 12px;

  button {
    margin: 0 !important;
  }
}
.export-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  position: relative;

  &__extended {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  button {
    @include button(9px, 9px, 8px);
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: 8px;
  }
}
</style>

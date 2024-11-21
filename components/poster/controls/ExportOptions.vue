<template>
  <div class="export-options">
    <button @click="download">
      DOWNLOAD
      <Icon
        name="material-symbols:arrow-outward"
        class="icon download-icon"
      />
    </button>
    <button @click="refreshScene">
      RANDOM
      <Icon
        name="fad:random-2dice"
        class="icon random-icon"
      />
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
.export-options {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-top: 2px solid $text;
  border-bottom: 2px solid $text;
  cursor: default;

  .icon {
    display: none;
    @media (min-width: $large) {
      display: block;
    }
  }

  .download-icon {
    transform: rotate(135deg);
  }

  .random-icon {
    transform: rotate(50deg);
  }

  button {
    @include level3;
    padding: 33px 20px 35px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;

    &:not(:last-child) {
      border-right: 2px solid $text;
    }

    &:hover {
      background: $active;
      color: white;
    }
  }
}
</style>

<template>
  <div class="export-options">
    <button
      v-if="!user"
      class="downloadButton"
      @click="downloadSnapshot"
    >
      Export as JPEG
    </button>
    <div
      v-else
      class="export-options__extended"
    >
      <button

        class="downloadButton"
        @click="downloadSnapshot"
      >
        <Icon name="ion:download" />
        Download as PDF
      </button>
      <button

        class="downloadButton"
        @click="downloadSnapshot"
      >
        <Icon name="ion:caret-down-outline" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const downloadSnapshot = () => {
  const { $bus } = useNuxtApp();
  $bus.$emit('download');
}
</script>

<style lang="scss" scoped>
.export-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;

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

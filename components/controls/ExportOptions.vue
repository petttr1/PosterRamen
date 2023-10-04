<template>
  <div
    v-if="showOptions"
    class="backdrop"
    @click="hideOptions"
  />
  <div class="export-options">
    <button
      v-if="!user"
      class="download-button"
      @click="downloadJpeg"
    >
      Download as JPEG
    </button>
    <div
      v-else
      class="export-options__extended"
    >
      <button

        class="download-button"
        @click="downloadSnapshot"
      >
        <Icon name="ion:download" />
        Download as PDF
      </button>
      <button
        class="export-options__extended__more-options"
        @click="showExtendedOptions"
      >
        <Icon name="ion:caret-down-outline" />
      </button>
    </div>
    <div
      v-if="showOptions"
      class="extended-options"
    >
      <button
        class="download-button"
        @click="downloadJpeg"
      >
        Download as JPEG
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const showOptions = ref<boolean>(false);
const downloadSnapshot = () => {
  const { $bus } = useNuxtApp();
  $bus.$emit('download');
}

const downloadJpeg = () => {
  const { $bus } = useNuxtApp();
  $bus.$emit('download-jpeg');
}

const showExtendedOptions = () => {
  showOptions.value = true;
}

const hideOptions = () => {
  showOptions.value = false;
}
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  background: $base-50;
  z-index:1;
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
  gap: 2px;
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

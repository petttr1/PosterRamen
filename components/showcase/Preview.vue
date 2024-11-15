<template>
  <div class="preview">
    <div class="preview__content" v-html="code" />
    <h3 class="preview__title">
      {{ title }}
    </h3>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string;
  style: string;
  title: string;
}>();

onMounted(() => {
  if (typeof window !== "undefined") {
    const style = document.createElement("style");
    style.innerHTML = props.style;
    document.head.appendChild(style);
  }
});
</script>

<style scoped lang="scss">
.preview {
  &__content {
    width: fit-content;
  }

  &__title {
    @include level4;
  }
}
</style>

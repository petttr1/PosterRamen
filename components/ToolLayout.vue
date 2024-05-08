<template>
  <div class="main-wrapper">
    <div class="main-wrapper__content">
      <slot name="content" />
    </div>
    <div class="main-wrapper__code">
      <slot name="code" />
    </div>
    <div class="main-wrapper__controls">
      <slot name="controls" />
      <h3 v-if="blogLink">
        <a :href="blogLink" target="_blank">Learn More</a>
      </h3>
      <h3 v-if="sourceLink">
        <a :href="sourceLink" target="_blank">See Source</a>
      </h3>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  blogLink?: string;
  sourceLink?: string;
}>();
</script>
<style lang="scss">
.main-wrapper {
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr auto auto;
  grid-template-areas:
    "image"
    "controls"
    "code";
  justify-items: stretch;

  @media (min-width: $medium) {
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr auto;
    grid-template-areas:
      "image controls"
      "code .";
    justify-items: start;
    justify-content: space-between;
  }

  &__content {
    grid-area: image;
    height: 100%;
    width: 100%;
    padding: 1rem 1rem 0;
  }

  &__code {
    grid-area: code;
    padding: 0 1rem;
    width: 100%;
  }

  &__controls {
    grid-area: controls;

    h3 {
      padding-left: 1rem;
    }
    a {
      color: $text;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        background: none;
        color: $active;
      }
    }

    @media (min-width: $medium) {
      position: sticky;
      top: 60px;
    }
  }
}
</style>

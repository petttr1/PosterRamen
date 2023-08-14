<template>
  <div class="cta">
    <h3>Ready to make your first poster?</h3>
    <div class="cta__wrapper">
      <nuxt-link :to="`/app`">
        Let's Cook
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">

import { ref} from "vue";
const title = ref<string>('');
const placeholder = ref<string>('');

</script>

<style lang="scss" scoped>
.cta {
  margin: 64px auto 0;
  max-width: 720px;
  h3 {
    font-size: 1.5rem;
    color: $yellow;
    font-weight: 300;
    text-align: center;
    margin-bottom: 64px;
  }

  &__wrapper {
    max-width: 216px;
    margin: 0 auto;
    a {
      @include button(16px, 32px);
      font-size: 2rem;
    }
  }

  p {
    color: $yellow;
    font-size: 0.8rem;
    margin-top: 8px;
    text-align: center;
  }
}
</style>
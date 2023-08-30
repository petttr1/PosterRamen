<template>
  <div class="cta">
    <h3>Ready to make your first poster?</h3>
    <div class="cta__wrapper">
      <nuxt-link :to="`/app`">
        Let's Cook
      </nuxt-link>
    </div>
    <h2>Currently doesn't support mobile devices. Sorry.</h2>
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
  padding-bottom: 256px;

  h3 {
    font-size: 1.5rem;
    color: $white;
    font-weight: 300;
    text-align: center;
    margin-bottom: 32px;
  }

  &__wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      @include button(16px, 32px);
      font-size: 1.5rem;
      font-weight: 500;
      border-radius: 12px;
      background: $white;
      color: $highlight;

      &:hover {
        background: $highlight;
        color:  $white;
      }
    }
  }

  p {
    color: $white;
    font-size: 0.8rem;
    margin-top: 8px;
    text-align: center;
  }

  h2 {
    font-size: 1rem;
    font-weight: 300;
    color: $white;
    text-align: center;
    margin-top: 16px;
  }
}
</style>
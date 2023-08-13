<template>
  <div class="cta">
    <h3>Enter your title to see it in action:</h3>
    <div class="cta__input">
      <input
        v-model="title"
        :placeholder="placeholder"
      >
      <nuxt-link :to="`/app?title=${redirectTitle}`">
        Make a Poster
      </nuxt-link>
    </div>
    <p>*You will be able to change the title at any time.</p>
  </div>
</template>
<script setup lang="ts">
import {generateName} from "~/helpers/names";
import {computed, onMounted, ref} from "vue";
const title = ref<string>('');
const placeholder = ref<string>('');

onMounted(() => {
  placeholder.value = generateName();
});

const redirectTitle = computed(() => {
  return title.value === '' ? placeholder.value : title.value;
})

</script>

<style lang="scss" scoped>
.cta {
  margin: 64px auto 0;
  max-width: 720px;
  h3 {
    font-size: 24px;
    color: $yellow;
    font-weight: 300;
    text-align: center;
    margin-bottom: 8px;
  }
  &__input {
    padding:0 32px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 0.3fr;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    input {
      border: 2px solid rgba($yellow, 0.5);
      width: 100%;
      line-height: 24px;
      font-size: 18px;
      padding: 4px 8px;
      outline: none;
      color: $yellow;
      caret-color: $yellow;
    }

    a {
      @include button(8px, 16px);
      width: 100%;
    }
  }

  p {
    color: $yellow;
    font-size: 12px;
    margin-top: 8px;
    text-align: center;
  }
}
</style>
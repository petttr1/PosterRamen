<template>
  <label for="highQualityRenderer">Preview Before Export</label>
  <input
    type="checkbox"
    id="highQualityRenderer"
    v-model="checked"
    @input="onChecked"
  />
  <button class="refreshButton" @click="refreshScene">Refresh</button>
  <button class="downloadButton" @click="downloadSnapshot">Download</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
const nuxtApp = useNuxtApp();
const checked = ref(false);

const emit = defineEmits(["highQualityRender"]);
const onChecked = () => {
  emit("highQualityRender");
};
const refreshScene = () => {
  nuxtApp.$refreshScene();
}

const downloadSnapshot = () => {
  nuxtApp.$download();
}
</script>

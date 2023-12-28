<template>
  <div id="texts" class="texts">
    <TextTitle :exporting="exporting" />
  </div>
</template>
<script setup lang="ts">
import TextTitle from "~/components/scene/text/TextTitle.vue";

const props = defineProps({
  exporting: { type: Boolean, default: false },
});
</script>
<style scoped lang="scss">
.texts {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

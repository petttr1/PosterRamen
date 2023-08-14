<template>
  <h1>Looking great!</h1>
  <img
    v-if="exportString"
    :src="`data:image/jpeg;base64,${exportString}`"
  >
  Your work is being downloaded now.
</template>
<script setup lang="ts">
import {computed, onMounted} from "vue";
import { useSceneStore } from '~/store/scene'
import {jsPDF} from "jspdf";
import {HEIGHT, WIDTH} from "~/constants";

const sceneStore = useSceneStore()
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const sceneId = ref<string>('');
const exportString = computed(() => sceneStore.scene(sceneId.value!).exportString)

const route = useRoute()
onMounted(() => {
  sceneId.value = route.params.id;
})

const exportAsPdf = async () => {
  let pdf = new jsPDF({
    unit: "px",
    format: [WIDTH, HEIGHT],
  });
  pdf = await pdf.addImage(
      exportString,
      "jpeg",
      0,
      0,
      WIDTH,
      HEIGHT,
  );
  await pdf.save("rendered.pdf");
}
</script>
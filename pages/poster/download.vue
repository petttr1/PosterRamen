<template>
  <div class="download">
    <h1>Looking great!</h1>
    <div class="download__preview">
      <a
        v-if="exportString && type === 'jpeg'"
        ref="imgDownload"
        :href="exportString"
        download="poster-ramen-export.jpeg"
      />
      <img :src="`${exportString}`">
    </div>
    <div class="download__text">
      <p>Your work is being downloaded now.</p>
      <p>
        Click <a @click="exportPoster">here</a> if the download didn't start
        automatically.
      </p>
    </div>
    <div class="download__back">
      <nuxt-link
        to="/poster"
        class="download__back__button"
      >
        New
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useSceneStore } from "~/store/scene";
import { jsPDF } from "jspdf";
import { HEIGHT, WIDTH } from "~/constants";

definePageMeta({
  layout: "tool",
});

const sceneStore = useSceneStore();

const sceneId = ref<string>("");
const type = ref<string>("pdf");

const exportString = computed(
  () => sceneStore.scene(sceneId.value!).fullExportString,
);
const exportLayers = computed(
  () => sceneStore.scene(sceneId.value!).exportLayers,
);

const imgDownload = ref<HTMLLinkElement | null>(null);
const route = useRoute();

const exportPoster = () => {
  if (!exportString.value) return;
  if (type.value === "pdf") {
    exportAsPdf();
    return;
  }
  if (type.value === "jpeg") {
    exportAsJpeg();
    return;
  }
};

const exportAsJpeg = async () => {
  imgDownload.value!.click();
};

const exportAsPdf = () => {
  let pdf = new jsPDF({
    unit: "px",
    format: [WIDTH, HEIGHT],
  });
  pdf = pdf.addImage(
    exportString.value!,
    "png",
    0,
    0,
    WIDTH,
    HEIGHT,
    undefined,
    "FAST",
  );
  for (const layer of exportLayers.value!) {
    pdf = pdf.addPage([WIDTH, HEIGHT]);
    pdf = pdf.addImage(layer, "png", 0, 0, WIDTH, HEIGHT, undefined, "FAST");
  }
  pdf.save(`poster-ramen-export.pdf`);
};

onMounted(() => {
  sceneId.value = route.query.id;
  if (route.query.type) {
    type.value = route.query.type;
  }
  nextTick(() => {
    exportPoster();
  });
});
</script>

<style scoped lang="scss">
.download {
  margin-top: 72px;

  h1 {
    @include level2;
    margin: 32px auto;
    text-align: center;
  }

  &__preview {
    max-width: 500px;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__text {
    max-width: 500px;
    margin: 32px auto 0;
    text-align: center;

    p {
      margin: 0 auto;
    }

    a {
      cursor: pointer;
    }
  }

  &__back {
    margin: 64px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    max-width: 500px;
    padding-bottom: 64px;

    &__button {
    }
  }
}
</style>

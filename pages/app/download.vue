<template>
  <div class="download">
    <h1>Looking great!</h1>
    <div class="download__preview">
      <!--      <a-->
      <!--        v-if="exportString"-->
      <!--        ref="imgDownload"-->
      <!--        :href="exportString"-->
      <!--        :download="`${scene.title}.jpeg`"-->
      <!--      >-->
      <img

        :src="`${exportString}`"
      >
      <!--      </a>-->
    </div>
    <div class="download__text">
      <p>Your work is being downloaded now.</p>
      <p>Click <a @click="exportAsPdf">here</a> if the download didn't start automatically.</p>
    </div>
    <div class="download__back">
      <nuxt-link
        to="/app"
        class="download__back__button"
      >
        Make New Poster
      </nuxt-link>
      <!--      <nuxt-link-->
      <!--        :to="`/app?id=${sceneId}`"-->
      <!--        class="download__back__button"-->
      <!--      >-->
      <!--        Edit-->
      <!--      </nuxt-link>-->
      <!--      <nuxt-link-->
      <!--        to="/login"-->
      <!--        class="download__back__login"-->
      <!--      >-->
      <!--        Log in to see and re-export your work. (coming soon)-->
      <!--      </nuxt-link>-->
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted} from "vue";
import { useSceneStore } from '~/store/scene'
import {jsPDF} from "jspdf";
import {HEIGHT, WIDTH} from "~/constants";

const sceneStore = useSceneStore()
const supabase = useSupabaseClient()

const sceneId = ref<string>('');
const scene = computed(() => sceneStore.scene(sceneId.value!));
const exportString = computed(() => sceneStore.scene(sceneId.value!).exportString);

// const imgDownload = ref<HTMLLinkElement | null>(null);

const route = useRoute()
onMounted(() => {
  sceneId.value = route.query.id;
})

watchEffect(() => {
  if (exportString.value) {
    exportAsPdf();
  }
})

const exportAsPdf = async () => {
  let pdf = new jsPDF({
    unit: "px",
    format: [WIDTH, HEIGHT],
  });
  pdf = await pdf.addImage(
      exportString.value!,
      "jpeg",
      0,
      0,
      WIDTH,
      HEIGHT,
  );
  pdf.save(`${scene.value.title}.pdf`);
  // imgDownload.value!.click();
}
</script>

<style scoped lang="scss">
.download {
  margin-top: 72px;

  h1 {
    color: $white;
    margin: 32px auto;
    text-align: center;
    font-size: 2.5rem;
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
    color: $white;
    text-align: center;

    p {
      margin: 0 auto;
    }

    a {
      color: $highlight;
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
      @include button(16px, 32px, 8px);
      font-size: 2rem;
    }

    &__login {
      color: $highlight;
      text-decoration: none;
    }
  }
}
</style>
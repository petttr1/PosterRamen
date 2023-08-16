<template>
  <div
    id="render"
    class="render"
    :style="{ width: renderWidth, height: renderHeight }"
  >
    <div
      ref="canvasHolder"
      class="canvasHolder"
    >
      <div
        ref="container"
        class="canvas"
      />
    </div>
    <div
      class="text-wrapper"
      :style="{ width: constantWidth }"
    >
      <input
        v-if="!exporting"
        ref="titleRef"
        v-model="title"
        placeholder="Your Title"
        class="text-wrapper__title"
        @input="onTitleInput"
      >
      <input
        v-if="!exporting"
        v-model="subtitle"
        placeholder="Your Additional Text"
        class="text-wrapper__subtitle"
        @input="onSubtitleInput"
      >
      <h1 v-if="exporting">
        {{ title }}
      </h1>
      <h2 v-if="exporting">
        {{ subtitle }}
      </h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {createCamera, createScene} from "~/World/things";
import {createComposer, createExportComposer} from "~/World/systems/composer";
import {createRandomWorld} from "~/World/worlds/randomWorld";
import {HEIGHT, WIDTH} from "~/constants";
import html2canvas from "html2canvas";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer.js";
import {v4} from 'uuid';
import {useSceneStore} from '~/store/scene'
import {createExportRenderer, createRenderer} from "~/World/systems/renderer";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass.js";
import {Pass} from "three/examples/jsm/postprocessing/Pass";

const props = defineProps({
  titleOverride: { type: String || null, required: false, default: null },
  subtitleOverride: { type: String || null, required: false, default: null },
  width: {type: Number, default: WIDTH},
  height: {type: Number, default: HEIGHT}
});

const sceneStore = useSceneStore();

const sceneId = ref<string | null>(null);
const container = ref<HTMLElement | null>(null);
const controls = ref<OrbitControls | null>(null);
const enableOrbitControls = ref<boolean>(true);
const title = ref<string>('Poster Ramen');
const subtitle = ref<string>('Make Posters Instantly');
const exporting =ref<boolean>(false);
const titleRef = ref<HTMLInputElement | null>(null);

let composer: EffectComposer;

watchEffect(() => {
  if (sceneId.value !== sceneStore.activeScene) {
    sceneStore.setActiveScene(sceneId.value!);
  }
});

const { $random } = useNuxtApp();

const scene = computed(() => sceneStore.scene(sceneId.value!));
const constantWidth = computed(() =>{
  return `${WIDTH}px`;
});
const constantHeight = computed(() => {
  return `${HEIGHT}px`;
});
const renderWidth = computed(() =>{
  return `${props.width}px`;
});
const renderHeight = computed(() => {
  return `${props.height}px`;
});

onMounted(async () => {
  if (typeof window !== "undefined") {
    nextTick(async () => {
      await init();
      if (props.titleOverride) {
        title.value = props.titleOverride;
      }
      if (props.subtitleOverride) {
        subtitle.value = props.subtitleOverride;
      }

      const {$bus} = useNuxtApp()

      titleRef.value!.focus();
      $bus.$on('refreshScene', () => {
        refreshScene();
      })

      $bus.$on('download', () => {
        download();
      })
    });
  }
})
onBeforeUnmount(() => {
  sceneStore.setActiveScene(null);
  const {$bus} = useNuxtApp()
  $bus.$off('refreshScene');
  $bus.$off('download');
})

const onTitleInput = () => {
  sceneStore.storeScene({id: sceneId.value!, title: title.value});
}
const onSubtitleInput = () => {
  sceneStore.storeScene({id: sceneId.value!, subtitle: subtitle.value});
}
const init = async () => {
  const newScene = createScene(0x000000);
  const newCamera = createCamera();
  sceneId.value = v4();
  const seed = Math.random()*2**32|0;
  $random.$setSeed(seed);
  sceneStore.storeScene({id: sceneId.value!, seed, scene: newScene, camera: newCamera, title: title.value, subtitle: subtitle.value});
  createWorld();
  activateRenderer("lowQ");
}
const createWorld = () => {
  const newWorld = new THREE.Group();
  newWorld.position.set(0,0,0);
  const localScene = toRaw(scene.value.scene!);
  localScene.add(newWorld);
  createRandomWorld(newWorld);
  sceneStore.storeScene({id: sceneId.value!, world: newWorld, scene: localScene});
}
const render = (_timestamp: number, _frame: any) => {
  // update orbit controls if enabled
  if (enableOrbitControls.value) {
    controls.value!.update();
  }
  const passes = composer.passes;
  passes.forEach((pass: Pass) => {
    if (pass.uniforms && pass.uniforms.x && pass.uniforms.y) {
      pass.uniforms.x = {value: scene.value.camera!.position.x * 0.01};
      pass.uniforms.y = {value: scene.value.camera!.position.y * 0.01};
    }
  })
  // render scene
  composer.render();
  // render loop
  composer.renderer.setAnimationLoop(render.bind(this));
}
const refreshScene = async () => {
  const newScene = createScene(0x000000);
  const newCamera = createCamera();
  const seed = Math.random()*2**32|0;
  $random.$setSeed(seed);
  sceneId.value = v4();
  newScene.clear();
  sceneStore.storeScene({id: sceneId.value!, seed, scene: newScene, camera: newCamera});
  createWorld();
  activateRenderer("lowQ", true);
}
const activateRenderer = (type: 'lowQ'|'highQ', refresh: boolean = false) => {
  if (composer) {
    composer.renderer.setAnimationLoop(null);
    composer.renderer.clear();
    container.value!.removeChild(composer.renderer.domElement);
    composer.renderer.dispose();
    composer.renderer.forceContextLoss();
  }
  const localScene = toRaw(scene.value.scene!);

  if (!composer || refresh) {
    composer = createComposer(localScene, scene.value.camera!);
  }
  const passes = composer.passes;
  if (type === 'lowQ') {
    composer = createComposer(localScene, scene.value.camera!, passes);
    if (enableOrbitControls.value) {
      controls.value = new OrbitControls(
          scene.value.camera!,
          composer.renderer.domElement,
      );
      controls.value.enableDamping = true;
      controls.value.dampingFactor = 0.1;
      controls.value.enableRotate = false;
    }
    container.value!.appendChild(composer.renderer.domElement);
    composer.renderer.setAnimationLoop(render.bind(this));
    return;
  }
  if (type === 'highQ') {
    composer = createExportComposer(localScene, scene.value.camera!, passes);
    container.value!.appendChild(composer.renderer.domElement);
    composer.render();
    return;
  }
}
const download = async () => {
  exporting.value = true;
  nextTick(async () => {
    activateRenderer('highQ');
    const region = document.getElementById("render");
    const render = await html2canvas(region!, {
      scale: 5,
      backgroundColor: null,
    });
    const exportString = render.toDataURL("image/jpeg");
    sceneStore.storeScene({id: sceneId.value!, exportString});
    return navigateTo({
      path: '/app/download',
      query: {
        id: sceneId.value
      }
    });
  })
}
</script>
<style lang="scss">
canvas {
  display: block;
  margin: 0 auto;
  pointer-events: all;
}
</style>
<style lang="scss" scoped>
.render {
  margin: 0;
  transform-origin: 0 0;
}

.text-wrapper {
  position: relative;
  height: 196px;
  cursor: default;
  user-select: none;
  bottom: 260px;
  color: white;
  left: 50%;
  transform: translateX(-50%);
  font-family: Inter;
  font-weight: 400;
  //pointer-events: none;

  input {
    outline: none;
    caret-color: white;
    color: white;
    width: calc(100% - 128px);
  }

  &__title, h1 {
    position: absolute;
    z-index: 99999;
    top: 32px;
    left: 60px;
    font-size: 6rem;
    margin: 0;
    width: calc(100% - 128px);
  }

  &__subtitle, h2 {
    font-family: Inter;
    font-weight: 400;
    position: absolute;
    z-index: 99999;
    bottom: 0px;
    left: 64px;
    font-size: 2.5rem;
    margin: 0;
    width: calc(100% - 128px);
  }

}
</style>


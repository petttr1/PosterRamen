<template>
  <div
    id="render"
    class="render"
    :style="{ width: renderWidth, height: renderHeight }"
    :class="{showEdge: props.showBorder}"
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
        v-model="title"
        placeholder="Your Title"
        class="text-wrapper__title"
      >
      <input
        v-if="!exporting"
        v-model="subtitle"
        placeholder="Your Additional Text"
        class="text-wrapper__subtitle"
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
import { Clock, Group, OrthographicCamera, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {createCamera, createScene} from "~/World/things";
import {createRenderer} from "~/World/systems";
import {createComposer, createExportComposer} from "~/World/systems/composer";
import {createRandomWorld} from "~/World/worlds/randomWorld";
import {HEIGHT, WIDTH} from "~/constants";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer.js";

const camera = ref<OrthographicCamera | null>(null);
const cameraHolder = ref<Group | null>(null);
const renderer = ref<WebGLRenderer | null>(null);
const container = ref<HTMLElement | null>(null);
const controls = ref<OrbitControls | null>(null);
const clock = ref<Clock | null>(null);
const enableOrbitControls = ref<boolean>(true);

let scene: Scene;
let composer: EffectComposer;
let world: Group;

const props = defineProps({
  titleOverride: { type: String || null, required: false, default: null },
  subtitleOverride: { type: String || null, required: false, default: null },
  showBorder: {type: Boolean, default: false},
  width: {type: Number, default: WIDTH},
  height: {type: Number, default: HEIGHT}
})

const title = ref<string>('Title');
const subtitle = ref<string>('Subtitle');

const exporting =ref<boolean>(false);

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
    nextTick(() => {
      init();
      if (props.titleOverride) {
        title.value = props.titleOverride;
      }
      if (props.subtitleOverride) {
        subtitle.value = props.subtitleOverride;
      }

      const {$bus} = useNuxtApp()
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
  const {$bus} = useNuxtApp()
  $bus.$off('refreshScene');
  $bus.$off('download');
})

const init = () => {
  scene = createScene(0x000000);

  // setup renderer
  clock.value = new Clock();
  renderer.value = createRenderer();

  container.value!.appendChild(renderer.value.domElement);

  // setup camera
  camera.value = createCamera();

  composer = createComposer(renderer.value, scene, camera.value);

  // orbit controls cam
  if (enableOrbitControls.value) {
    controls.value = new OrbitControls(
        camera.value,
        renderer.value.domElement,
    );
    controls.value.enableDamping = true;
    controls.value.dampingFactor = 0.1;
  }

  // create world
  createWorld();
}
const createWorld = async () => {
  // create world
  world = new THREE.Group();
  scene.add(world);
  world.position.set(0, 0, 0);

  createRandomWorld(world);

  // start render
  await renderer.value!.setAnimationLoop(render.bind(this));
}
const render = (_timestamp: number, _frame: any) => {
  // update orbit controls if enabled
  if (enableOrbitControls.value) {
    controls.value!.update();
  }

  // update camera
  camera.value!.updateProjectionMatrix();

  // render scene
  composer.render();

  // render loop
  renderer.value!.setAnimationLoop(render.bind(this));
}
const refreshScene = () => {
  scene.clear();
  createWorld();
}
const activateRenderer = (type: 'lowQ'|'highQ') => {
  renderer.value!.setAnimationLoop(() => {
  });
  renderer.value!.clear();
  container.value!.removeChild(composer.renderer.domElement);
  if (type === 'lowQ') {
    composer = createComposer(renderer.value!, scene, camera.value!);
    container.value!.appendChild(composer.renderer.domElement);
    composer.renderer.setAnimationLoop(render.bind(this));
    return;
  }

  if (type === 'highQ') {
    composer = createExportComposer(scene, camera.value!);
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

    let pdf = new jsPDF({
      unit: "px",
      format: [WIDTH, HEIGHT],
    });
    pdf = await pdf.addImage(
        render.toDataURL("image/jpeg"),
        "jpeg",
        0,
        0,
        WIDTH,
        HEIGHT,
    );
    await pdf.save("rendered.pdf");
    activateRenderer('lowQ');
    exporting.value = false;
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

  &.show-edge {
    -webkit-box-shadow: 0px 0px 0px 4px rgba(70,194,203,1);
    -moz-box-shadow: 0px 0px 0px 4px rgba(70,194,203,1);
    box-shadow: 0px 0px 0px 4px rgba(70,194,203,1);
  }
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


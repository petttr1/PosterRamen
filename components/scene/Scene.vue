<template>
  <div
    id="render"
    class="render"
    :class="{ exporting }"
    :style="{ width: renderWidth, height: renderHeight }"
  >
    <div ref="canvasHolder" class="canvasHolder">
      <div id="canvas" ref="container" class="canvas" />
    </div>
    <SceneText v-if="showText" :exporting="exporting" />
  </div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createCamera, createScene } from "~/World/things";
import { createComposer, createExportComposer } from "~/World/systems/composer";
import { HEIGHT, TITLE_DEFAULT, WIDTH } from "~/constants";
import html2canvas from "html2canvas";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { v4 } from "uuid";
import { useSceneStore } from "~/store/scene";
import { Pass } from "three/examples/jsm/postprocessing/Pass";
import { Camera, Scene, Vector3, Vector4 } from "three";
import { fonts } from "~/helpers/fonts";
import { getPasses } from "~/World/systems/pass";

const props = defineProps({
  width: { type: Number, default: WIDTH },
  height: { type: Number, default: HEIGHT },
});

const sceneStore = useSceneStore();
const sceneId = ref<string | null>(null);

const container = ref<HTMLElement | null>(null);
const controls = ref<OrbitControls | null>(null);
const enableOrbitControls = ref<boolean>(true);
const exporting = ref<boolean>(false);

let composer: EffectComposer;
let scene: Scene;
let camera: Camera;

const storedScene = computed(() => sceneStore.scene(sceneId.value!));

const renderWidth = computed(() => {
  return `${props.width}px`;
});

const renderHeight = computed(() => {
  return `${props.height}px`;
});

const showText = computed(() => storedScene.value.showText);

onMounted(async () => {
  if (typeof window !== "undefined") {
    nextTick(async () => {
      const { $bus } = useNuxtApp();
      $bus.$on("refreshScene", () => {
        newPattern();
      });
      $bus.$on("download", () => {
        download();
      });
      scene = createScene();
      camera = createCamera();
      await newScene();
    });
  }
});

onBeforeUnmount(() => {
  destroyRenderer();
  const { $bus } = useNuxtApp();
  $bus.$off("refreshScene");
  $bus.$off("download");
});

const newSeed = () => {
  return (Math.random() * 2 ** 32) | 0;
};

const newPattern = async () => {
  const { $random } = useNuxtApp();
  const seed = newSeed();
  $random.$setSeed(seed);
  sceneStore.storeScene({
    id: sceneId.value!,
    seed,
    cameraX: 0,
    cameraY: 0,
  });
  await refreshScene();
};
const newScene = async () => {
  const { $random } = useNuxtApp();
  sceneId.value = v4();
  const seed = newSeed();
  $random.$setSeed(seed);
  const font = storedScene.value.font ?? fonts[0];
  sceneStore.storeScene({
    id: sceneId.value!,
    seed,
    cameraX: 0,
    cameraY: 0,
    title: TITLE_DEFAULT,
    font,
    fontColor: "rgb(0, 0, 0)",
    color: new Vector4(0, 0, 0, 1),
    background: new Vector3(1, 1, 1),
    textAlign: "center",
    horizontalFlow: "row",
    verticalFlow: "column",
    showBorders: true,
    showText: true,
  });
  sceneStore.setActiveScene(sceneId.value!);
  await refreshScene();
};
const refreshScene = async () => {
  scene.clear();
  camera.position.set(
    storedScene.value.cameraX ?? 0,
    storedScene.value.cameraY ?? 0,
    0,
  );
  activateRenderer("lowQ", true);
};
const render = (_timestamp: number, _frame: any) => {
  // update orbit controls if enabled
  if (enableOrbitControls.value) {
    controls.value!.update();
  }
  const passes = composer.passes;
  passes.forEach((pass: Pass) => {
    if (pass.uniforms.position) {
      // update camera position uniform
      pass.uniforms.position = {
        value: { x: camera.position.x * 0.01, y: camera.position.y * 0.01 },
      };
      // pass.uniforms.y = { value: camera.position.y * 0.01 };

      // update background uniform
      if (pass.uniforms.colors) {
        pass.uniforms.colors = {
          value: {
            background: storedScene.value.background ?? new Vector4(1, 1, 1, 1),
            color: storedScene.value.color ?? new Vector4(0, 0, 0, 1),
          },
        };
      }
      // update frame uniform
      if (pass.uniforms.borders) {
        pass.uniforms.borders = {
          value: {
            show: storedScene.value.showBorders ?? true,
            top:
              (storedScene.value.verticalFlow === "column" ? 300 : 200) /
              HEIGHT,
            right: 64 / WIDTH,
            bottom:
              (storedScene.value.verticalFlow === "column" ? 200 : 300) /
              HEIGHT,
            left: 64 / WIDTH,
          },
        };
      }
    }
  });
  // render scene
  composer.render();
  // render loop
  composer.renderer.setAnimationLoop(render.bind(this));
};

const destroyRenderer = () => {
  composer.renderer.setAnimationLoop(null);
  composer.renderer.clear();
  container.value?.removeChild(composer.renderer.domElement);
  composer.renderer.dispose();
  composer.renderer.forceContextLoss();
};

const activateRenderer = (type: "lowQ" | "highQ", refresh: boolean = false) => {
  if (composer) {
    destroyRenderer();
  }
  let passes = composer?.passes;
  if (!passes || refresh) {
    passes = getPasses(scene, camera);
  }
  if (type === "lowQ") {
    composer = createComposer(scene, camera, passes);
    if (enableOrbitControls.value) {
      controls.value = new OrbitControls(camera, composer.renderer.domElement);
      controls.value.enableDamping = true;
      controls.value.dampingFactor = 0.1;
      controls.value.enableRotate = false;
      controls.value.enableZoom = false;
      controls.value.mouseButtons = {
        LEFT: THREE.MOUSE.RIGHT,
        MIDDLE: THREE.MOUSE.MIDDLE,
        RIGHT: THREE.MOUSE.LEFT,
      };
    }
    container.value?.appendChild(composer.renderer.domElement);
    composer.renderer.setAnimationLoop(render.bind(this));
    return;
  }
  if (type === "highQ") {
    composer = createExportComposer(scene, camera, passes);
    container.value?.appendChild(composer.renderer.domElement);
    composer.render();
    return;
  }
};
const download = async () => {
  const resetPasses = () => {
    for (let i = 0; i < composer.passes.length; i++) {
      composer.passes[i].enabled = false;
      composer.passes[i].renderToScreen = false;
    }
  };

  exporting.value = true;
  const region = document.getElementById("render");
  const canvas = document.getElementById("canvas");
  const text = document.getElementById("texts");
  nextTick(async () => {
    activateRenderer("highQ");
    const render = await html2canvas(region!, {
      scale: 5,
      backgroundColor: `rgb(${storedScene.value.background.x * 255},${
        storedScene.value.background.y * 255
      },${storedScene.value.background.z * 255})`,
    });
    const exportString = render.toDataURL("image/png");
    const layers = [];

    for (let i = 0; i < composer.passes.length; i++) {
      resetPasses();
      composer.passes[i].enabled = true;
      composer.passes[i].renderToScreen = true;
      composer.render();
      const render = await html2canvas(canvas!, {
        scale: 5,
        backgroundColor: `rgb(${storedScene.value.background.x * 255},${
          storedScene.value.background.y * 255
        },${storedScene.value.background.z * 255})`,
      });
      const exportString = render.toDataURL("image/png");
      layers.push(exportString);
    }
    sceneStore.storeScene({
      id: sceneId.value!,
      fullExportString: exportString,
      exportLayers: layers,
    });
    return navigateTo({
      path: "/app/download",
      query: {
        id: sceneId.value,
      },
    });
  });
};
</script>
<style lang="scss">
canvas {
  display: block;
  margin: 0 auto;
  pointer-events: all;
}
</style>
<style lang="scss" scoped>
img {
  display: block;
}
.render {
  margin: 0;
  transform-origin: 0 0;
  position: relative;
  background: white;
}
</style>

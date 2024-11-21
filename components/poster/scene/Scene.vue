<template>
  <div
    id="render"
    ref="$render"
    class="render"
    :class="{ exporting }"
  >
    <div
      id="canvas"
      ref="$canvas"
      class="canvas"
    />
  </div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createCamera, createScene } from "~/World/things";
import { createComposer, createExportComposer } from "~/World/systems/composer";
import html2canvas from "html2canvas";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { v4 } from "uuid";
import { useSceneStore } from "~/store/scene";
import { Pass } from "three/examples/jsm/postprocessing/Pass";
import { Camera, Scene, Vector3, Vector4 } from "three";
import { getPasses } from "~/World/systems/pass";

const sceneStore = useSceneStore();
const sceneId = ref<string | null>(null);

const $canvas = ref<HTMLElement | null>(null);
const $render = ref<HTMLElement | null>(null);

const exporting = ref<boolean>(false);

let controls: OrbitControls;
let composer: EffectComposer;
let scene: Scene;
let camera: Camera;

const storedScene = computed(() => sceneStore.scene(sceneId.value!));

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
  sceneStore.storeScene({
    id: sceneId.value!,
    seed,
    cameraX: 0,
    cameraY: 0,
    color: new Vector4(0, 0, 0, 1),
    background: new Vector3(1, 1, 1),
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
  controls?.update();

  const passes = composer.passes;
  passes.forEach((pass: Pass) => {
    if (pass.uniforms.position) {
      // update camera position uniform
      pass.uniforms.position = {
        value: { x: camera.position.x * 0.01, y: camera.position.y * 0.01 },
      };

      // update background uniform
      if (pass.uniforms.colors) {
        pass.uniforms.colors = {
          value: {
            background: storedScene.value.background ?? new Vector4(1, 1, 1, 1),
            color: storedScene.value.color ?? new Vector4(0, 0, 0, 1),
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
  $canvas.value?.removeChild(composer.renderer.domElement);
  composer.renderer.dispose();
  composer.renderer.forceContextLoss();
};

const activateRenderer = (type: "lowQ" | "highQ", refresh: boolean = false) => {
  if (composer) {
    destroyRenderer();
  }

  let passes = composer?.passes;
  if (!passes || refresh) {
    passes = getPasses(camera);
  }

  if (type === "lowQ") {
    composer = createComposer(camera, passes);

    controls = new OrbitControls(camera, composer.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.RIGHT,
      MIDDLE: THREE.MOUSE.MIDDLE,
      RIGHT: THREE.MOUSE.LEFT,
    };
    controls.touches.ONE = THREE.TOUCH.PAN;

    $canvas.value?.appendChild(composer.renderer.domElement);
    composer.renderer.setAnimationLoop(render.bind(this));
    return;
  }

  if (type === "highQ") {
    composer = createExportComposer(camera, passes);
    $canvas.value?.appendChild(composer.renderer.domElement);
    composer.render();
    return;
  }
};

const resetPasses = () => {
  for (let i = 0; i < composer.passes.length; i++) {
    composer.passes[i].enabled = false;
    composer.passes[i].renderToScreen = false;
  }
};

const download = async () => {
  exporting.value = true;

  nextTick(async () => {
    activateRenderer("highQ");
    const render = await html2canvas($render.value!, {
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

      const render = await html2canvas($canvas.value!, {
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
      path: "/poster/download",
      query: {
        id: sceneId.value,
      },
    });
  });
};

onBeforeUnmount(() => {
  destroyRenderer();
  const { $bus } = useNuxtApp();
  $bus.$off("refreshScene");
  $bus.$off("download");
});

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
</script>
<style lang="scss">
canvas {
  display: block;
  margin: 0 auto;
  pointer-events: all;
  height: auto !important;
  width: 100% !important;
  max-width: 60vh;
  max-height: 60vh;
  aspect-ratio: 1;
}
</style>
<style lang="scss" scoped>
.render {
  margin: 0 auto;
  transform-origin: 0 0;
  position: relative;
  width: fit-content;
  height: fit-content;
}
</style>

<template>
  <div
    id="render"
    class="render"
    :class="{ exporting}"
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
    <SceneText
      :exporting="exporting"
    />
  </div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {createCamera, createScene} from "~/World/things";
import {createComposer, createExportComposer} from "~/World/systems/composer";
import {HEIGHT, WIDTH} from "~/constants";
import html2canvas from "html2canvas";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer.js";
import {v4} from 'uuid';
import {useSceneStore} from '~/store/scene'
import {Pass} from "three/examples/jsm/postprocessing/Pass";
import {Camera, Group, Scene, Vector3} from "three";
import {sampleFont} from "~/helpers/fonts";
import {getPasses} from "~/World/systems/pass";
import {storeScene} from "~/helpers/db";

const props = defineProps({
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
const paragraph = ref<string>(new Date().toLocaleDateString());
const exporting =ref<boolean>(false);

const seed = ref<number | null>(null);

let composer: EffectComposer;
let scene: Scene;
let camera: Camera;

// watchEffect(() => {
//   if (sceneId.value !== sceneStore.activeScene) {
//     sceneStore.setActiveScene(sceneId.value!);
//   }
// });

const storedScene = computed(() => sceneStore.scene(sceneId.value!));

const renderWidth = computed(() =>{
  return `${props.width}px`;
});
const renderHeight = computed(() => {
  return `${props.height}px`;
});

onMounted(async () => {
  if (typeof window !== "undefined") {
    nextTick(async () => {
      const {$bus} = useNuxtApp()

      $bus.$on('refreshScene', () => {
        newPattern();
      });
      $bus.$on('download', () => {
        download();
      });
      $bus.$on('save', () => {
        save();
      });
      scene = createScene();
      camera = createCamera();
      if (sceneStore.activeScene) {
        await loadScene(sceneStore.activeScene);
        return;
      }
      await newScene();
    });
  }
})
onBeforeUnmount(() => {
  sceneStore.setActiveScene(null);
  const {$bus} = useNuxtApp()
  $bus.$off('refreshScene');
  $bus.$off('download');
})

const newSeed = () => {
  return Math.random()*2**32|0;
}
const loadScene = async (id: string) => {
  const { $random } = useNuxtApp();
  sceneId.value = id;
  seed.value = sceneStore.scene(id).seed;
  $random.$setSeed(seed.value);
  await refreshScene();
}

const newPattern = async () => {
  const { $random } = useNuxtApp();
  const seed = newSeed();
  sceneStore.storeScene({
    id: sceneId.value!,
    seed,
    cameraX: 0,
    cameraY: 0,
  });
  await refreshScene();
}
const newScene = async () => {
  const { $random } = useNuxtApp();
  sceneId.value = v4();
  const seed = newSeed();
  $random.$setSeed(seed);
  const font = sampleFont();
  sceneStore.storeScene({
    id: sceneId.value!,
    seed,
    cameraX: 0,
    cameraY: 0,
    title: title.value,
    subtitle: subtitle.value,
    paragraph: paragraph.value,
    font,
    fontColor:'rgb(0., 0., 0.)',
    background: new Vector3(1, 1, 1),
    textAlign: 'center',
    horizontalFlow: 'row',
    verticalFlow: 'column',
    showBorders: true,
  });
  sceneStore.setActiveScene(sceneId.value!);
  await refreshScene();
}
const refreshScene = async () => {
  scene.clear();
  camera.position.set(0,0,0);
  activateRenderer("lowQ", true);
}
const render = (_timestamp: number, _frame: any) => {
  // update orbit controls if enabled
  if (enableOrbitControls.value) {
    controls.value!.update();
  }
  const passes = composer.passes;
  passes.forEach((pass: Pass) => {
    if (pass.uniforms) {
      // update camera position uniform
      if (pass.uniforms.x && pass.uniforms.y) {
        pass.uniforms.x = {value: camera.position.x * 0.01};
        pass.uniforms.y = {value: camera.position.y * 0.01};
      }
      // update background uniform
      if (pass.uniforms.colors) {
        pass.uniforms.colors = {
          value: {
            background: storedScene.value.background ?? new Vector3(1, 1, 1),
            color: storedScene.value.color ?? new Vector3(0, 0, 0)
          }
        };
      }
      // update frame uniform
      if (pass.uniforms.borders) {
        pass.uniforms.borders = {
          value: {
            show: storedScene.value.showBorders ?? true,
            top: (storedScene.value.verticalFlow === 'column' ?  300 : 200) / HEIGHT,
            right: 64 / WIDTH,
            bottom: (storedScene.value.verticalFlow === 'column' ?  200 : 300) / HEIGHT,
            left: 64 / WIDTH,
          }
        };
      }
    }
  });
  // render scene
  composer.render();
  // render loop
  composer.renderer.setAnimationLoop(render.bind(this));
}

const activateRenderer = (type: 'lowQ'|'highQ', refresh: boolean = false) => {
  if (composer) {
    composer.renderer.setAnimationLoop(null);
    composer.renderer.clear();
    container.value!.removeChild(composer.renderer.domElement);
    composer.renderer.dispose();
    composer.renderer.forceContextLoss();
  }
  let passes = composer?.passes;
  if (!passes || refresh) {
    passes = getPasses(scene, camera);
  }
  if (type === 'lowQ') {
    composer = createComposer(scene, camera, passes);
    if (enableOrbitControls.value) {
      controls.value = new OrbitControls(
          camera,
          composer.renderer.domElement,
      );
      controls.value.enableDamping = true;
      controls.value.dampingFactor = 0.1;
      controls.value.enableRotate = false;
      controls.value.enableZoom = false;
      controls.value.mouseButtons = {
        LEFT: THREE.MOUSE.RIGHT,
        MIDDLE: THREE.MOUSE.MIDDLE,
        RIGHT: THREE.MOUSE.LEFT
      }
    }
    container.value!.appendChild(composer.renderer.domElement);
    composer.renderer.setAnimationLoop(render.bind(this));
    return;
  }
  if (type === 'highQ') {
    composer = createExportComposer(scene, camera, passes);
    container.value!.appendChild(composer.renderer.domElement);
    composer.render();
    return;
  }
}
const download = async () => {
  exporting.value = true;
  const region = document.getElementById("render");
  // region!.style.transform = 'scale(1, 1)';
  nextTick(async () => {
    activateRenderer('highQ');
    // TODO: re-scale to 1 before exporting
    const render = await html2canvas(region!, {
      scale: 10,
      backgroundColor: `rgb(${storedScene.value.background.x * 255},${storedScene.value.background.y * 255},${storedScene.value.background.z * 255})`,
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

const save = async () => {
  const {x,y} = camera.position;
  sceneStore.storeScene({id: sceneId.value!, cameraX: x, cameraY: y});
  const loggedIn = useSupabaseUser();
  if (!loggedIn.value) {
    navigateTo('/login');
  }
  else {
    await storeScene(storedScene.value);
  }
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


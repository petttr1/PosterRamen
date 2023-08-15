<template>
  <div
    id="render"
    class="render"
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
  </div>
</template>
<script setup lang="ts">
import {createLandingComposer} from "~/World/systems/composer";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer.js";
import {createLandingWorld} from "~/World/worlds/landingWorld";
import {Group, OrthographicCamera, Scene} from "three";
import {createCameraParams} from "~/World/things/camera";
import {createLandingScene} from "~/World/things/scene";

const container = ref<HTMLElement | null>(null);

let composer: EffectComposer;
let scene: Scene;
let camera: OrthographicCamera;
let seed: number;

const { $random } = useNuxtApp();

onMounted(async () => {
  if (typeof window !== "undefined") {
    nextTick(async () => {
      await init();
    });
  }
})

const init = async () => {
  scene = createLandingScene();
  const left = -window.innerWidth / 2;
  const right = window.innerWidth / 2;
  const top = window.innerHeight / 2;
  const bottom = -window.innerHeight / 2;
  camera = createCameraParams(left, right, top, bottom);
  seed = Math.random()*2**32|0;
  $random.$setSeed(seed);
  createWorld();
  activateRenderer();
}
const createWorld = () => {
  const newWorld = new Group();
  newWorld.position.set(0,0,0);
  scene.add(newWorld);
  createLandingWorld(newWorld);
}
const render = (_timestamp: number, _frame: any) => {
  // render scene
  composer.render();
}
const activateRenderer = () => {
  composer = createLandingComposer(scene, camera, window.innerWidth, window.innerHeight);
  container.value!.appendChild(composer.renderer.domElement);
  composer.renderer.setAnimationLoop(render.bind(this));
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
  position: fixed;
  top: 0;
  z-index: -1;
  margin: 0;
  scale: 2;
  transform-origin: 50% 50%;

  &.show-edge {
    -webkit-box-shadow: 0px 0px 0px 4px rgba(70,194,203,1);
    -moz-box-shadow: 0px 0px 0px 4px rgba(70,194,203,1);
    box-shadow: 0px 0px 0px 4px rgba(70,194,203,1);
  }
}
</style>


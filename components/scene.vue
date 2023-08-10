<template>
  <div
    class="render"
    id="render"
    :style="{ width: renderWidth, height: renderHeight }"
  >
    <div ref="canvasHolder" class="canvasHolder">
      <div ref="canvas" class="canvas"></div>
    </div>
    <div class="text-wrapper" :style="{ width: renderWidth }">
      <h1>Poster Ramen</h1>
      <h2>Make Posters Instantly</h2>
    </div>
  </div>
</template>
<script>
import * as THREE from "three";
import { Clock } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createCamera, createScene } from "~/World/things";
import { createRenderer } from "~/World/systems";
import { createComposer, createExportComposer } from "~/World/systems/composer";
import { createRandomWorld } from "~/World/worlds/randomWorld";
// import {createAcrWorld} from "~/World/worlds/acrWorld";
import { HEIGHT, WIDTH } from "~/constants";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
// import { Canvg } from 'canvg';

export default {
  components: {},
  props: {},
  data() {
    return {
      camera: null,
      cameraHolder: null,
      renderer: null,
      container: null,
      controls: null,
      sunLight: null,
      ambientLight: null,
      txt_loader: null,
      gltf_loader: null,
      clock: null,
      enableOrbitControls: true, // dev
    };
  },
  created() {},
  computed: {
    renderWidth() {
      return `${WIDTH}px`;
    },
    renderHeight() {
      return `${HEIGHT}px`;
    },
  },
  watch: {},
  async mounted() {
    if (typeof window !== "undefined") {
      this.$nextTick(function () {
        this.init();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.shiftKey) {
        this.download();
      }
    });

    this.$nuxt.provide('refreshScene', this.refreshScene);
    this.$nuxt.provide('download', this.download);

    // <canvas id="text-wrapper-canvas" class="text-wrapper-canvas"></canvas>
    //     <h2>The way developers get things done</h2>
    //     const canvas = document.getElementById('text-wrapper-canvas');
    //     console.log('canv', canvas)
    //
    //     const ctx = canvas.getContext('2d');
    //
    //     const v = await Canvg.from(ctx, `<svg width="1300" height="200" viewBox="0 0 325 50" fill="white" xmlns="http://www.w3.org/2000/svg">
    // <path d="M36.2212 1.21457V4.95951C32.4967 1.82186 27.7479 0 22.161 0C9.87004 0 0 11.1336 0 25C0 38.8664 9.87004 50 22.161 50C27.7479 50 32.4967 48.1781 36.2212 45.0405V48.7854H45.8119V1.21457H36.2212ZM23.5578 40.4858C15.55 40.4858 9.68382 33.502 9.68382 25C9.68382 16.498 15.55 9.51417 23.5578 9.51417C28.3997 9.51417 32.9622 11.336 36.2212 16.3968V33.6032C32.9622 38.664 28.3997 40.4858 23.5578 40.4858Z"/>
    // <path d="M79.4696 40.4858C71.3687 40.4858 66.0612 33.6032 66.0612 25C66.0612 16.3968 71.3687 9.51417 79.4696 9.51417C85.3357 9.51417 89.7121 13.1579 90.9226 18.5223H100.793C99.2097 7.59109 90.457 0 79.4696 0C66.3406 0 56.3774 10.9312 56.3774 25C56.3774 39.17 66.3406 50 79.4696 50C90.457 50 99.2097 42.4089 100.793 31.4777H90.9226C89.7121 36.8421 85.3357 40.4858 79.4696 40.4858Z"/>
    // <path d="M120.852 7.69231V1.21457H111.168V48.7854H120.852V18.8259C124.763 13.2591 130.07 10.4251 137.054 10.1215V0.202429C130.35 0.202429 124.856 2.93522 120.852 7.69231Z"/>
    // <path d="M165.023 0C151.708 0 142.489 10.9312 142.489 25C142.489 39.17 151.801 50 165.581 50C175.079 50 182.808 44.9393 185.601 36.336H174.986C173.217 39.3725 169.958 40.7895 165.675 40.7895C157.481 40.7895 153.29 35.3239 152.359 28.1377H186.718C188.581 12.0445 179.549 0 165.023 0ZM165.116 8.90688C171.913 8.90688 176.569 13.0567 177.128 20.8502H152.546C153.663 14.17 157.853 8.90688 165.116 8.90688Z"/>
    // <path d="M219.326 0C205.732 0 196.048 10.4251 196.048 25C196.048 39.5749 205.732 50 219.326 50C232.921 50 242.605 39.5749 242.605 25C242.605 10.4251 232.921 0 219.326 0ZM219.326 40.4858C211.412 40.4858 205.732 33.9069 205.732 25C205.732 15.9919 211.412 9.51417 219.326 9.51417C227.241 9.51417 232.921 15.9919 232.921 25C232.921 33.9069 227.241 40.4858 219.326 40.4858Z"/>
    // <path d="M305.725 0C299.301 0 294.366 2.32793 290.082 6.88259C286.823 2.32793 281.795 0 275.557 0C269.784 0 265.873 2.02429 262.614 5.26316V1.21457H252.93V48.7854H262.614V16.2955C265.78 11.5385 269.877 9.51417 274.439 9.51417C280.119 9.51417 284.216 12.5506 284.216 20.9514V48.7854H293.807V20.9514C293.807 19.2308 293.714 17.5101 293.435 15.9919C296.693 11.2348 300.79 9.51417 305.074 9.51417C311.312 9.51417 315.409 13.1579 315.409 21.5587V48.7854H325V21.5587C325 7.48988 317.178 0 305.725 0Z"/>
    // </svg>`);
    //
    //     // Start SVG rendering with animations and mouse handling.
    //     v.start();
  },
  methods: {
    init() {
      // setup
      this.container = this.$refs.canvas;
      this.scene = createScene(0x000000);

      // setup renderer
      this.clock = new Clock();
      this.renderer = createRenderer();

      this.container.appendChild(this.renderer.domElement);

      // setup camera
      this.camera = createCamera();

      this.composer = createComposer(this.renderer, this.scene, this.camera);

      if (this.enableOrbitControls) {
        // this.camera.position.set(0, 1.5, 0)
        // this.camera.rotation.set(0, 0, 0)
      } else {
        this.camera.position.set(0, 0, 0);
        this.cameraHolder = new THREE.Group();
        this.cameraHolder.add(this.camera);
        this.cameraHolder.position.set(0, 1.25, 3.5);
        this.camera.rotation.set(-0.16, 0, 0);
        this.scene.add(this.cameraHolder);
      }

      // orbit controls cam
      if (this.enableOrbitControls) {
        this.controls = new OrbitControls(
          this.camera,
          this.renderer.domElement,
        );
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        // this.camera.position.set(0, 1.5, 0)
        // this.camera.rotation.set(0, 0, 0)
      }

      // create world
      this.createWorld();

      // add resize listener
      window.addEventListener("resize", this.resize, false);
    },
    async createWorld() {
      // create world
      this.world = new THREE.Group();
      this.scene.add(this.world);
      this.world.position.set(0, 0, 0);

      createRandomWorld(this.world);
      // createAcrWorld(this.world);

      // start render
      await this.renderer.setAnimationLoop(this.render.bind(this));
      this.resize();

      // hide loading here
      this.$root.$emit("finished-loading");
    },
    render(timestamp, frame) {
      // update orbit controls if enabled
      if (this.enableOrbitControls) {
        this.controls.update();
      }

      // update camera
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();

      // render scene
      this.composer.render();
      // this.renderer.render(toRaw(this.scene), this.camera)

      // render loop
      this.renderer.setAnimationLoop(this.render.bind(this));
    },
    resize() {
      // update camera
      // this.camera.aspect =
      //     this.container.clientWidth / this.container.clientHeight
      this.camera.updateProjectionMatrix();
      // this.renderer.setSize(
      //     this.container.clientWidth,
      //     this.container.clientHeight
      // )
    },
    refreshScene() {
      this.scene.clear();
      this.createWorld();
    },
    async download() {
      this.renderer.setAnimationLoop(() => {});
      this.renderer.clear();
      const exportComposer = createExportComposer(this.scene, this.camera);
      this.container.removeChild(this.renderer.domElement);
      this.container.appendChild(exportComposer.renderer.domElement);
      await this.resize();
      await exportComposer.render();
      const region = await document.getElementById("render");
      const render = await html2canvas(region, {
        scale: "5",
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
    },
  },
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
.render {
  margin: 0 auto;
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
  pointer-events: none;

  //.text-wrapper-canvas {
  //  position: absolute;
  //  z-index: 99999;
  //  top: 72px;
  //  left: 64px;
  //  font-size: 6rem;
  //  margin: 0;
  //  height: 50px !important;
  //  width: 325px !important;
  //}

  h1 {
    position: absolute;
    z-index: 99999;
    top: 32px;
    left: 60px;
    font-size: 6rem;
    margin: 0;
  }

  h2 {
    //font-family: Manrope;
    font-family: Inter;
    font-weight: 400;
    position: absolute;
    z-index: 99999;
    bottom: 0px;
    left: 64px;
    //font-size: 3rem;
    font-size: 2.5rem;
    margin: 0;
  }
}
</style>

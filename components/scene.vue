<template>
  <div @keydown.enter="download" class="render" id="render">
    <div ref="canvasHolder" class="canvasHolder">
      <div ref="canvas" class="canvas"></div>
    </div>
    <div class="text-wrapper" :style="{width: renderWidth}">
        <h1>Poster Ramen</h1>
        <h2>Make Posters with 1 Click</h2>
    </div>
  </div>
</template>
<script>
import * as THREE from 'three'
import {Clock} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {createCamera, createLights, createScene} from "~/World/components";
import {createRenderer} from "~/World/systems";
import {createComposer} from "~/World/systems/composer";
import {createRandomWorld} from "~/World/worlds/randomWorld";
import {createAcrWorld} from "~/World/worlds/acrWorld";
import {HEIGHT, WIDTH} from "~/constants";
import html2canvas from "html2canvas";

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
    }
  },
  created() {

  },
  computed: {
    renderWidth() {
      return `${WIDTH}px`;
    },
    renderHeight() {
      return `${HEIGHT}px`;
    }
  },
  watch: {},
  mounted() {
    const self = this
    if (typeof window !== 'undefined') {
      self.$nextTick(function () {
        self.init()
      })
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.shiftKey) {
        this.download()
      }
    });
  },
  methods: {
    init() {
      const self = this
      // setup
      self.container = self.$refs.canvas
      self.scene = createScene(0x000000);

      // setup renderer
      self.clock = new Clock()
      self.renderer = createRenderer();

      self.container.appendChild(self.renderer.domElement)

      // setup camera
      self.camera = createCamera();

      self.composer = createComposer(self.renderer, self.scene, self.camera);

      if (self.enableOrbitControls) {
        // self.camera.position.set(0, 1.5, 0)
        // self.camera.rotation.set(0, 0, 0)
      } else {
        self.camera.position.set(0, 0, 0)
        self.cameraHolder = new THREE.Group()
        self.cameraHolder.add(self.camera)
        self.cameraHolder.position.set(0, 1.25, 3.5)
        self.camera.rotation.set(-0.16, 0, 0)
        self.scene.add(self.cameraHolder)
      }

      // orbit controls cam
      if (self.enableOrbitControls) {
        self.controls = new OrbitControls(
            self.camera,
            self.renderer.domElement
        )
        self.controls.enableDamping = true
        self.controls.dampingFactor = 0.1
        // self.camera.position.set(0, 1.5, 0)
        // self.camera.rotation.set(0, 0, 0)
      }

      // create world
      self.createWorld()

      // add resize listener
      window.addEventListener('resize', self.resize, false)
    },
    async createWorld() {
      const self = this
      // create world
      self.world = new THREE.Group()
      self.scene.add(self.world)
      self.world.position.set(0, 0, 0)

      createRandomWorld(self.world);
      // createAcrWorld(self.world);

      // start render
      await self.renderer.setAnimationLoop(self.render.bind(self))
      self.resize()

      // hide loading here
      self.$root.$emit('finished-loading')
    },
    render(timestamp, frame) {
      const self = this
      // update orbit controls if enabled
      if (self.enableOrbitControls) {
        self.controls.update()
      }

      // update camera
      self.camera.aspect =
          self.container.clientWidth / self.container.clientHeight
      self.camera.updateProjectionMatrix()

      // render scene
      self.composer.render();
      // self.renderer.render(toRaw(self.scene), self.camera)

      // render loop
      self.renderer.setAnimationLoop(self.render.bind(self))
    },
    resize() {
      const self = this
      // update camera
      // self.camera.aspect =
      //     self.container.clientWidth / self.container.clientHeight
      self.camera.updateProjectionMatrix()
      // self.renderer.setSize(
      //     self.container.clientWidth,
      //     self.container.clientHeight
      // )
    },
    async download() {
      let region = document.querySelector("body"); // whole screen
      const render  = await html2canvas(region, {
        scale: "5"
      });
      const tmpLink = document.createElement('a');
      tmpLink.download = 'rendered.png';
      tmpLink.href = render.toDataURL("image/png");
      tmpLink.type = "image/png";
      document.body.appendChild(tmpLink);
      tmpLink.click();
      document.body.removeChild(tmpLink);
    }
  },
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

  h1 {
    position: absolute;
    z-index: 99999;
    top: 32px;
    left: 64px;
    font-size: 6rem;
    margin: 0;
  }

  h2 {
    position: absolute;
    z-index: 99999;
    bottom: 0px;
    left: 64px;
    font-size: 3rem;
    margin: 0;
  }
}
</style>
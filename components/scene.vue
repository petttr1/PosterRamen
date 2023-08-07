<template>
  <div ref="canvasHolder" class="canvasHolder">
    <div ref="canvas" class="canvas"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import {Clock, ACESFilmicToneMapping, Object3D} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {createCamera, createLights, createScene} from "~/World/components";
import {createRenderer} from "~/World/systems";
import {createRenderPass} from "~/World/systems/pass/render";
import {createComposer} from "~/World/systems/composer";

export default {
  components: {},
  props: {},
  data() {
    return {
      camera: null,
      cameraHolder: null,
      // scene: null,
      // world: null,
      renderer: null,
      // composer: null,
      container: null,
      controls: null,
      sunLight: null,
      ambientLight: null,
      txt_loader: null,
      gltf_loader: null,
      clock: null,
      enableOrbitControls: true, // dev
      // renderPass: null,
      effectPasses: [],
    }
  },
  computed: {},
  watch: {},
  mounted() {
    const self = this
    if (typeof window !== 'undefined') {
      self.$nextTick(function () {
        self.init()
      })
    }
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
        self.camera.position.set(0, 1.5, 0)
        self.camera.rotation.set(0, 0, 0)
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
        self.camera.position.set(0, 1.5, 0)
        self.camera.rotation.set(0, 0, 0)
      }

      // create world
      self.createWorld()

      // add resize listener
      window.addEventListener('resize', self.resize, false)
    },
    setupLightShadow() {
      const self = this
      const lights = createLights();
      lights.forEach(light => self.world.add(light));
    },
    async createWorld() {
      const self = this
      // create world
      self.world = new THREE.Group()
      self.scene.add(self.world)
      self.world.position.set(0, 0, 0)
      await self.setupLightShadow()

      // dev grid
      const size = 1000
      const divisions = 1000
      const gridHelper = new THREE.GridHelper(size, divisions)
      self.world.add(gridHelper)

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
      self.camera.aspect =
          self.container.clientWidth / self.container.clientHeight
      self.camera.updateProjectionMatrix()
      self.renderer.setSize(
          self.container.clientWidth,
          self.container.clientHeight
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.canvasHolder,
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
  z-index: 1;
}
</style>
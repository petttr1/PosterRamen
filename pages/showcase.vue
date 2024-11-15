<template>
  <div class="showcase">
    <h1 class="showcase__heading">Showcase</h1>
    <div class="showcase__items">
      <Preview
        v-for="preview in previews"
        :key="preview.id"
        :code="preview.code"
        :style="preview.style"
        :title="preview.title"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Preview from "~/components/showcase/Preview.vue";

const previews = ref([
  {
    id: 1,
    title: "AppStore Card with Progressive Blur",
    code: `<div class="container">
  <div class="wrapper">
    <div class="progressive-blur">
      <div class="blur"></div>
      <div class="blur"></div>
      <div class="blur"></div>
      <div class="blur"></div>
      <div class="blur"></div>
      <div class="blur"></div>
      <div class="blur"></div>
      <div class="blur"></div>
    </div>
    <img src="https://i.imgur.com/wTK464q.png" alt="A beautiful image" />
    <div class="text">
      <h2>OUTRUN ESSENTIALS</h2>
      <h1>3047: City of Dreams</h1>
    </div>
  </div>
</div>`,
    style: `@import url("https://rsms.me/inter/inter.css");

/*
image generated with krea.ai using the following prompt:
preview of an action mobile game with 2 heroes fighting each other. Background is a cyberpunk post-apocalyptic city. Bright colors, blue-purple tones, futuristic, cyberpunk.
*/
:root {
  --image: url("https://i.imgur.com/wTK464q.png");
  --scale: scale(1.2);
}

body {
  font-family: "Inter", sans-serif;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/*
  Base for the code generated using progressive blur generator @ https://www.posterramen.com/progressive-blur
*/
.wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  width: 400px;
  height: auto;
}

.wrapper > img {
  width: 100%;
  height: auto;
  transform: var(--scale);
}

.text {
  position: absolute;
  bottom: 32px;
  left: 32px;
  z-index: 10;
  color: white;
}

h2 {
  font-size: 12px;
}

h1 {
  font-size: 24px;
  opacity: 0.8;
  margin-top: 8px;
  font-weight: 500;
}

.progressive-blur {
  position: absolute;
  z-index: 9;
  width: 100%;
  height: 100%;
  pointer-events: none;
  inset: auto 0 0 0;
  transform: var(--scale);
}

.blur {
  background: var(--image);
  background-size: cover;
  position: absolute;
  inset: 0;
}

.progressive-blur > div:nth-child(1) {
  filter: blur(1.5px);
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 75%,
    rgba(0, 0, 0, 1) 78.125%,
    rgba(0, 0, 0, 1) 81.25%,
    rgba(0, 0, 0, 0) 84.375%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 75%,
    rgba(0, 0, 0, 1) 78.125%,
    rgba(0, 0, 0, 1) 81.25%,
    rgba(0, 0, 0, 0) 84.375%
  );
  z-index: 1;
}

.progressive-blur > div:nth-child(2) {
  filter: blur(3px);
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 78.125%,
    rgba(0, 0, 0, 1) 81.25%,
    rgba(0, 0, 0, 1) 84.375%,
    rgba(0, 0, 0, 0) 87.5%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 78.125%,
    rgba(0, 0, 0, 1) 81.25%,
    rgba(0, 0, 0, 1) 84.375%,
    rgba(0, 0, 0, 0) 87.5%
  );
  z-index: 2;
}

.progressive-blur > div:nth-child(3) {
  filter: blur(6px);
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 81.25%,
    rgba(0, 0, 0, 1) 84.375%,
    rgba(0, 0, 0, 1) 87.5%,
    rgba(0, 0, 0, 0) 90.625%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 81.25%,
    rgba(0, 0, 0, 1) 84.375%,
    rgba(0, 0, 0, 1) 87.5%,
    rgba(0, 0, 0, 0) 90.625%
  );
  z-index: 3;
}

.progressive-blur > div:nth-child(4) {
  filter: blur(12px);
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 84.375%,
    rgba(0, 0, 0, 1) 87.5%,
    rgba(0, 0, 0, 1) 90.625%,
    rgba(0, 0, 0, 0) 93.75%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 84.375%,
    rgba(0, 0, 0, 1) 87.5%,
    rgba(0, 0, 0, 1) 90.625%,
    rgba(0, 0, 0, 0) 93.75%
  );
  z-index: 4;
}

.progressive-blur > div:nth-child(5) {
  filter: blur(24px);
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 87.5%,
    rgba(0, 0, 0, 1) 90.625%,
    rgba(0, 0, 0, 1) 93.75%,
    rgba(0, 0, 0, 0) 96.875%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 87.5%,
    rgba(0, 0, 0, 1) 90.625%,
    rgba(0, 0, 0, 1) 93.75%,
    rgba(0, 0, 0, 0) 96.875%
  );
  z-index: 5;
}

.progressive-blur > div:nth-child(6) {
  filter: blur(48px);
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 90.625%,
    rgba(0, 0, 0, 1) 93.75%,
    rgba(0, 0, 0, 1) 96.875%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 90.625%,
    rgba(0, 0, 0, 1) 93.75%,
    rgba(0, 0, 0, 1) 96.875%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 6;
}

.progressive-blur > div:nth-child(7) {
  filter: blur(96px);
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 93.75%,
    rgba(0, 0, 0, 1) 96.875%,
    rgba(0, 0, 0, 1) 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 93.75%,
    rgba(0, 0, 0, 1) 96.875%,
    rgba(0, 0, 0, 1) 100%
  );
  z-index: 7;
}

.progressive-blur > div:nth-child(8) {
  filter: blur(192px);
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 96.875%,
    rgba(0, 0, 0, 1) 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 96.875%,
    rgba(0, 0, 0, 1) 100%
  );
  z-index: 8;
}`,
  },
  {
    id: 2,
    title: "Hello World",
    code: `<h1>Goodbye, World!</h1>`,
    style: `color: red; background: black;`,
  },
]);
</script>

<style scoped lang="scss">
.showcase {
  min-height: 100vh;

  &__heading {
    @include level3;
    text-align: center;
    margin: 3rem auto 0;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>

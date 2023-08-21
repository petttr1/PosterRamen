<template>
  <div class="controls">
    <button
      class="refreshButton"
      @click="refreshScene"
    >
      Randomize
    </button>
    <button
      class="downloadButton"
      @click="downloadSnapshot"
    >
      Download as PDF
    </button>
    <button
      class="appearanceButton"
      @click="swapAppearance"
    >
      Change mode
    </button>
    <p>Dragging the image will augment it.</p>
    <p>Click the text to edit.</p>
    <!--    <div class="controls__advanced">-->
    <!--      Advanced Controls-->
    <!--    </div>-->
    <!--    <button-->
    <!--        class="swapButton"-->
    <!--        @click="swapRenderer"-->
    <!--    >-->
    <!--      Swap renderer-->
    <!--    </button>-->
  </div>
</template>

<script setup lang="ts">
const { $bus } = useNuxtApp();
const refreshScene = () => {
  $bus.$emit('refreshScene');
}

const downloadSnapshot = () => {
  $bus.$emit('download');
}

const swapRenderer = () => {
  $bus.$emit('swap');
}

const swapAppearance = () => {
  $bus.$emit('toggle-appearance')
}
</script>

<style lang="scss" scoped>
.controls {
  display: block;
  padding: 8px 8px 0;
  border-left: 2px solid $blue;
  height: 100%;
  width: 100%;


  button {
    @include button(9px, 9px, 8px);
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: 8px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  p {

    color: $yellow;
    text-wrap: nowrap;

    &:first-of-type {
      margin-top: 16px;
    }
  }
}
</style>

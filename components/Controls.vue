<template>
  <div class="controls">
    <button
      class="refreshButton"
      @click="refreshScene"
    >
      Randomize
    </button>
    <button
      class="appearanceButton"
      @click="swapAppearance"
    >
      Toggle Dark Mode
    </button>
    <p>Dragging the image will augment it.</p>
    <p>Click the text to edit.</p>
    <span>Actions</span>
    <!--    <button-->
    <!--      class="saveButton"-->
    <!--      @click="saveScene"-->
    <!--    >-->
    <!--      Save For Later Edit-->
    <!--    </button>-->
    <button
      class="downloadButton"
      @click="downloadSnapshot"
    >
      Export as PDF
    </button>
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
span {
  color: $yellow;
  font-size: 0.8rem;
  margin: 24px 0 8px;
}
.controls {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

  }
}
</style>

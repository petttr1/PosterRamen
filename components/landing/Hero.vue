<template>
  <div class="hero">
    <div class="hero__titles">
      <div class="hero__titles__background" />
      <h1 class="hero__title">Design Explore Prototype</h1>
      <h2 class="hero__subtitle">
        <b>Poster Ramen</b> is a set of single-purpose tools helping you quickly
        prototype and explore designs & typography.
      </h2>
    </div>
    <div class="hero__features">
      <ul>
        <li>4 TOOLS</li>
        <li>FREE</li>
        <li>OPEN SOURCE</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 15px auto 0;
  border-bottom: 2px solid $text;
  padding: 0 16px;

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__titles {
    width: 100%;
    position: relative;

    @media (min-width: 420px) {
      border-right: 2px solid $text;
    }
    @media (max-width: 420px) {
      border-bottom: 2px solid $text;
    }

    &__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("/star.png") repeat-x 100% 50%;
      background-size: auto 100%;
      z-index: -1;
    }
  }
  &__title {
    @include level1;
    text-align: left;
    max-width: 520px;
    margin-bottom: 27px;
  }
  &__subtitle {
    @include level3;
    text-align: left;
    max-width: 510px;
    margin-bottom: 58px;
  }

  &__features {
    min-width: fit-content;
    margin-left: 16px;
    ul {
      list-style-type: none;
      padding: 0;

      li {
        @include level2;
        text-align: left;
        &:before {
          content: "\2733";
          padding-right: 8px;
        }
      }
    }
  }
}
</style>

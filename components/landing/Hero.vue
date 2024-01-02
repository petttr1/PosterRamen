<template>
  <div class="hero">
    <div class="hero__title">
      <div class="hero__title__background" />
      <h1 class="hero__title__text">Design Explore Prototype</h1>
    </div>
    <h2 class="hero__subtitle">
      <b>Poster Ramen</b> is a set of single-purpose tools helping you quickly
      prototype and explore designs & typography.
    </h2>
    <div class="hero__features">
      <ul>
        <li><Icon name="mdi:asterisk" size="38" />4 TOOLS</li>
        <li><Icon name="mdi:asterisk" size="38" />FREE</li>
        <li><Icon name="mdi:asterisk" size="38" />OPEN SOURCE</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.hero {
  display: grid;
  border-bottom: 2px solid $text;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    "title title"
    "subtitle subtitle"
    "features features";
  padding: 0;

  @media (min-width: $medium) {
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
      "title subtitle"
      "features features";
  }

  @media (min-width: $large) {
    grid-template-areas:
      "title features"
      "title subtitle";
  }

  &__title {
    grid-area: title;
    position: relative;
    border-bottom: 2px solid $text;

    @media (min-width: $medium) {
      border-bottom: none;
      border-right: 2px solid $text;
    }

    &__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("/star.png") repeat-x 100% 50%;
      background-size: auto 100%;
      z-index: -2;
    }

    &__text {
      @include level1;
      text-align: left;
      padding: 16px;
      max-width: 500px;

      @media (min-width: $large) {
        max-width: none;
      }

      @media (min-width: $huge) {
        @include level-extra;
      }
    }
  }

  &__subtitle {
    grid-area: subtitle;
    @include level3;
    padding: 16px;
    @media (min-width: $large) {
      border-top: 2px solid $text;
    }
  }

  &__features {
    grid-area: features;
    padding: 16px;
    border-top: 2px solid $text;
    @media (min-width: $large) {
      border-top: none;
    }
    ul {
      list-style-type: none;
      li {
        @include level2;
        text-align: left;
        .icon {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>

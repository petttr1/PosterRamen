<template>
  <div class="about">
    <div class="about__wrapper">
      <p>
        Made by
        <a
          href="https://www.x.com/devslovecoffee"
          target="_blank"
        >@devslovecoffee</a>.
      </p>
      <p>
        Check out my
        <a
          href="https://devslovecoffee.com"
          target="_blank"
        >blog</a> to learn
        more about what I do.
      </p>
      <p>Feedback is appreciated.</p>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.about {
  min-height: 100vh;
  padding: 16px 16px 0;
  line-height: 150%;
  position: relative;

  &__wrapper {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  p {
    a {
      text-decoration: underline;
      color: $text;
    }
  }
}
</style>

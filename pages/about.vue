<template>
  <div class="about">
    <div class="about__wrapper">
      <p>
        Made by
        <a href="https://www.twitter.com/devslovecoffee" target="_blank"
          >@devslovecoffee</a
        >.
      </p>
      <p>
        Check out my
        <a href="https://devslovecoffee.com" target="_blank">blog</a> to learn
        more about what I do.
      </p>
      <p>
        Looking for inspiration? See the
        <nuxt-link to="/use-cases"> Use Cases. </nuxt-link>
      </p>
      <p>
        Feedback is appreciated. You can reach me feedback [at]
        devslovecoffee.com
      </p>

      <p>See how to contribute here (soon).</p>
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

<template>
  <div class="about">
    <p>
      Looking for inspiration? See the <nuxt-link to="/use-cases">
        Use Cases.
      </nuxt-link>
    </p>
    <p>
      Made by <a
        href="https://www.twitter.com/devslovecoffee"
        target="_blank"
      >@devslovecoffee</a>.
    </p><p>
      Check out my <a
        href="https://devslovecoffee.com"
        target="_blank"
      >blog</a> to learn more about what I do.
    </p>
    <p>Feedback is appreciated. You can reach me at: </p>
    <p>feedback [at] devslovecoffee.com</p>
    <br>
    <p>
      <a
        href="https://www.buymeacoffee.com/devslovecoffee"
        target="_blank"
      >Buy me a coffee</a> to keep this project running.
    </p>
  </div>
</template>
<style scoped lang="scss">
.about {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  max-width: 720px;
  p {
    color: $white;
    margin-bottom: 16px;
    font-size: 1.5rem;
    font-weight: 300;

    a {
      color: $highlight;
      text-decoration: none;
    }
  }
}
</style>
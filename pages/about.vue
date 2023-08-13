<template>
  <div class="about">
    <p>
      Made by <a
        href="https://www.twitter.com/devslovecoffee"
        target="_blank"
      >@devslovecoffee</a>. Check out my <a
        href="https://www.devslovecoffee.com"
        target="_blank"
      >blog</a> to learn more about what I do.
    </p>
    <p>This tool is in its early stages so any feedback is appreciated. You can reach me at: <br>feedback [at] devslovecoffee.com</p>
    <p>
      Please also consider <a href="https://www.buymeacoffee.com/devslovecoffee">Buying me a coffee</a> to keep this project running.
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
    color: $yellow;
    margin-bottom: 16px;
    font-size: 24px;

    a {
      color: $blue;
      text-decoration: none;
    }
  }
}
</style>
<template>
  <div class="pricing">
    <p>
      Poster Ramen is free for now, but some paid tier may come with upcoming features.
    </p>
    <p>
      You can <a
        href="https://www.buymeacoffee.com/devslovecoffee"
        target="_blank"
      >Buy me a coffee</a> to support the project.
    </p>
  </div>
</template>
<style scoped lang="scss">
.pricing {
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
<template>
  <div class="footer">
    <div class="footer__socials">
      <a href="https://twitter.com/DevsLoveCoffee"
        ><Icon name="ri:twitter-x-line" size="32"
      /></a>
      <a href="https://github.com/petttr1"
        ><Icon name="bi:github" size="32"
      /></a>
    </div>
    <div class="footer__links">
      <a href="https://devslovecoffee.com"
        >Made by DevsLoveCoffee<Icon
          name="material-symbols:arrow-outward"
          size="32"
          class="arrow-icon"
      /></a>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.footer {
  margin-top: auto;
  width: 100%;
  border-top: 2px solid $active;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px;
  a {
    text-decoration: none;
    color: $text;
    .arrow-icon {
      transition: transform 0.1s cubic-bezier(0, -0.3, 1, 1.3);
    }
    &:hover {
      text-decoration: underline;
      .arrow-icon {
        transform: translateX(0.2862rem) rotate(45deg);
      }
    }
  }
  &__socials {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  &__links {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>

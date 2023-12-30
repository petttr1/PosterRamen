<template>
  <div class="tool" :class="{ disabled: !link }">
    <div class="tool__name">
      {{ name }}
    </div>
    <div class="tool__description">
      {{ description }}
    </div>
    <div class="tool__link">
      <Icon
        v-if="link"
        name="material-symbols:arrow-outward"
        size="42"
        class="icon"
      />
      <div v-else class="tool__link--soon">SOON</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: null,
  },
});
</script>
<style lang="scss" scoped>
.tool {
  display: grid;
  grid-template-columns: 13rem 1fr 3.2rem;
  grid-template-areas: "name description link";
  align-items: center;
  width: 100%;
  padding: 27px 16px 26px;
  border-bottom: 2px solid $text;

  @media (max-width: 420px) {
    grid-template-columns: 1fr min-content;
    grid-template-rows: auto auto;
    grid-template-areas:
      "name link"
      "description description";
  }

  &:hover:not(.disabled) {
    cursor: pointer;
    background: rgba($active, 0.2);

    .tool__link {
      .icon {
        transform: translateX(1.6862rem) rotate(45deg);
      }
    }
  }

  &__name {
    @include level3;
    font-weight: 700;
    grid-area: name;

    @media (max-width: 420px) {
      @include level2;
      margin-bottom: 19px;
    }
  }
  &__description {
    grid-area: description;
    @media (max-width: 420px) {
      grid-column: span 2;
    }
  }

  &__link {
    grid-area: link;
    .icon {
      transition: transform 0.1s cubic-bezier(0, -0.3, 1, 1.3);
      @media (min-width: 419px) {
        transform: translateX(1.6862rem);
      }
    }
    a {
      text-decoration: none;
      color: $text;
    }
    &--soon {
      @include level4;
      border-radius: 24px 0 16px 24px;
      padding: 8px 8px 7px 15px;
      border: 3px solid $text;

      @media (max-width: 420px) {
        padding: 6px 12px 5px 15px;
      }
    }
  }
}
</style>

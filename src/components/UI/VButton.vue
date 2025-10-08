<script setup lang="ts">
const { text, loading } = defineProps<{ text: string, loading?: boolean }>()
</script>

<template>
  <button type="submit" class="btn" :aria-label="text" :title="text" :disabled="loading">
    <slot>{{ text }}</slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5AB828;
  padding: 15px 18px;
  border-radius: 10px;
  font-family: "Roboto-Medium", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease-in-out;

  &:active {
    background-color: #4DA41E;
  }

  @media (hover: hover) {
    &:hover {
      background-color: #4BD700;
    }
  }

  @media (hover: none) {
    &:active {
      background-color: #4BD700;
    }
  }
}
</style>

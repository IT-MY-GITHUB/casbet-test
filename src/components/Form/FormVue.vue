<script setup lang="ts">
const emit = defineEmits(['submit'])
</script>

<template>
  <form class="form" @submit.prevent="emit('submit')">
    <div class="form__inputs">
      <slot></slot>
    </div>

    <div class="checkboxes">
      <slot name="checkboxes"></slot>
    </div>
    <slot class="btn" name="button"></slot>
  </form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  margin-top: 22px;
  max-width: 380px;

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  & .checkboxes {
    margin-top: 22px;
    margin-bottom: 22px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>

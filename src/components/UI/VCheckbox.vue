<script setup lang="ts">
const { modelValue } = defineProps<{
  modelValue: boolean,
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <label class="checkbox-wrapper">
    <input type="checkbox" :checked="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)" />
    <span class="custom-checkbox"></span>
    <span class="checkbox-label">
      <slot></slot>
    </span>
  </label>
</template>

<style lang="scss">
.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 8px;
  font-size: 10px;
}

.checkbox-wrapper input[type='checkbox'] {
  display: none;
}

.custom-checkbox {
  min-width: 18px;
  min-height: 18px;
  border-radius: 4px;
  background-color: white;
  position: relative;
  transition: background-color 0.3s;
}

.custom-checkbox::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 3px;
  width: 6px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.2s;
}

.checkbox-wrapper input[type='checkbox']:checked+.custom-checkbox {
  background-color: #5AB828;
  border-color: #5AB828;
}

.checkbox-wrapper input[type='checkbox']:checked+.custom-checkbox::after {
  opacity: 1;
}

.checkbox-label {
  line-height: 1;
  font-size: 11px;
  line-height: 14px;
  color: #BBC6F2;
  text-align: left;

  & a {
    text-decoration: underline;
  }
}
</style>

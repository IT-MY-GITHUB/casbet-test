<script setup lang="ts">
import closeEyeImage from '@/assets/images/svg/close-eye.svg'
import openEyeImage from '@/assets/images/svg/open-eye.svg'
import { computed, ref } from 'vue'

const { label = 'Пароль', placeholder, min = "6", modelValue, required = true } = defineProps<{ label?: string, placeholder?: string, min?: string, modelValue?: string, required?: boolean }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const password = ref(modelValue)
const isOpenEye = ref(false)
const error = ref<boolean>(false)

const inputAttributes = computed(() => {
  if (isOpenEye.value) {
    return {
      type: 'text',
      src: openEyeImage
    }
  } else {
    return {
      type: 'password',
      src: closeEyeImage
    }
  }
})

const validate = computed(() => {
  if (password.value && password.value.length >= Number(min)) {
    return true
  } else {
    return false
  }
})

const onInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value
  password.value = val
  if (!validate.value) {
    emit('update:modelValue', '')
  } else {
    emit('update:modelValue', val)
  }
  error.value = !validate.value
}
</script>

<template>
  <div class="input-wrapper">
    <label for="password">{{ label }}</label>
    <input name="password" class="input input-password" :class="{ 'error': error }" id="password"
      :type="inputAttributes.type" @input="onInput" :value="password" :placeholder="placeholder"
      autocomplete="current-password" :required="required" />
    <p v-if="error" class="error-text">Пароль должен содержать минимум {{ min }} символов</p>

    <img width="16" height="10" class="input-image" :src="inputAttributes.src" alt="Open\Close Button"
      title="Open\Close Button" aria-label="Open\Close Button" @click="isOpenEye = !isOpenEye">
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;

  & .input-image {
    position: absolute;
    top: 35px;
    right: 10px;
    cursor: pointer;
    z-index: 44;
  }
}
</style>

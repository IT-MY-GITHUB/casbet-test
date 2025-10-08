<script setup lang="ts">
import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
import { onBeforeUnmount, onMounted, ref } from 'vue'


const { label = 'Номер телефона', modelValue, required = true } = defineProps<{ label?: string, modelValue?: string, required?: boolean }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const phone = ref<HTMLInputElement | null>(null)
let iti: ReturnType<typeof intlTelInput> | null = null
const error = ref<boolean>(false)
const isValid = ref<boolean>(true)

onMounted(() => {
  iti = intlTelInput(phone.value!, {
    initialCountry: 'auto',
    nationalMode: false,
    autoPlaceholder: 'false',
    geoIpLookup: (callback) => {
      fetch('https://ipapi.co/json')
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback('by'))
    },
    separateDialCode: true,
    loadUtils: async () => await import("intl-tel-input/utils"),
  })

  const handleInput = () => {
    if (!iti) return
    const number = iti.getNumber()
    const valid = iti.isValidNumber()
    isValid.value = !!valid

    if (!valid && phone.value!.value.trim() !== '') {
      error.value = true
      emit('update:modelValue', '')
    } else {
      error.value = false
      emit('update:modelValue', number)
    }
  }

  phone.value!.addEventListener('input', handleInput)

  if (modelValue) {
    iti.setNumber(modelValue)
  }
})

onBeforeUnmount(() => {
  iti?.destroy()
})
</script>

<template>
  <div class="input-wrapper">
    <label for="phone">{{ label }}</label>
    <input ref="phone" name="phone" class="input input-phone" :class="{ 'error': error }" id="phone" type="tel"
      placeholder="" :required="required" />
    <p v-if="error" class="error-text">Введите корректный номер телефона</p>
  </div>
</template>

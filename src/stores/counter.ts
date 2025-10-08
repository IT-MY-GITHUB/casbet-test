import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', () => {
  const phone = ref('')
  const password = ref('')
  const agreePolicy = ref(false)
  const agreeEvent = ref(false)

  return { phone, password, agreePolicy, agreeEvent }
})

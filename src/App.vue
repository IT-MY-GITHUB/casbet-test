<script setup lang="ts">
import { ref } from 'vue'
import HeaderVue from '@/components/Header/HeaderVue.vue'

import freeSpinsImageMobile from '@/assets/images/freespins--mobile.webp'
import zeusImageMobile from '@/assets/images/zeus--mobile.webp'
import wavesImageMobile from '@/assets/images/waves--mobile.webp'
import almazImageMobile from '@/assets/images/almaz--mobile.webp'

import freeSpinsImage from '@/assets/images/freespins.webp'
import zeusImage from '@/assets/images/zeus.webp'
import wavesImage from '@/assets/images/waves.webp'
import almazImage from '@/assets/images/almaz.webp'
import goldImage from '@/assets/images/gold.webp'
import elipsImage from '@/assets/images/elips.png'
import elipsPureImage from '@/assets/images/elips-pure.png'

import VButton from './components/UI/VButton.vue'
import VInputPassword from './components/UI/VInputPassword.vue'
import VInputPhone from './components/UI/VInputPhone.vue'
import FormVue from './components/Form/FormVue.vue'
import VCheckbox from './components/UI/VCheckbox.vue'
import { useFormStore } from './stores/counter'

const formStore = useFormStore()

const isSending = ref<boolean>(false)
const registerError = ref<boolean>(false)

async function handleSubmit() {
  if (!formStore.agreePolicy) {
    alert('Необходимо принять условия политики.')
    return
  }
  if (!formStore.password || !formStore.phone) {
    alert('Убедитесь что форма заполнена корректно.')
    return
  }

  const payload = {
    phone: formStore.phone,
    password: formStore.password,
    agreePolicy: formStore.agreePolicy,
    agreeEvent: formStore.agreeEvent,
  }

  isSending.value = true
  console.log('Отправляем данные формы:', payload)

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    console.log('Ответ сервера:', data)

    isSending.value = false
  } catch (e) {
    console.error('Ошибка при отправке формы:', e)
    isSending.value = false
  }
}
</script>

<template>
  <header-vue />
  <main>
    <section class="section">
      <picture class="section__freespins-image">
        <source width="814" height="456" :srcset="freeSpinsImage" media="(min-width: 1024px)" />
        <img width="344" height="164" :src="freeSpinsImageMobile" alt="200 free spins" title="200 free spins"
          aria-label="200 free spins" />
      </picture>

      <picture class="section__zeus-image">
        <source width="741" height="1075" :srcset="zeusImage" media="(min-width: 1024px)" />
        <img width="369" height="540" :src="zeusImageMobile" alt="Zeus" title="Zeus" aria-label="Zeus" />
      </picture>


      <picture class="section__waves-image">
        <source width="500" height="698" :srcset="wavesImage" media="(min-width: 1024px)" />
        <img width="270" height="370" :src="wavesImageMobile" alt="Waves" title="Waves" aria-label="Waves" />
      </picture>

      <picture class="section__almaz-image">
        <source width="299" height="296" :srcset="almazImage" media="(min-width: 1024px)" />
        <img width="126" height="235" :src="almazImageMobile" alt="Almaz" title="Almaz" aria-label="Almaz" />
      </picture>

      <picture class="section__gold-image">
        <img width="456" height="280" :src="goldImage" alt="Almaz" title="Almaz" aria-label="Almaz" />
      </picture>

      <img width="835" height="1668" class="section__elips-image" :src="elipsImage" alt="elips background">

      <img width="835" height="1668" class="section__elips-pure-image" :src="elipsPureImage" alt="elips background">

      <div class="form-wrapper">
        <h2 class="form-title">Регистрация</h2>
        <form-vue @submit="handleSubmit">
          <v-input-phone v-model="formStore.phone" label="Номер телефона" />
          <v-input-password v-model="formStore.password" min="6" placeholder="Придумайте пароль" label="Пароль" />

          <template #checkboxes>
            <v-checkbox v-model="formStore.agreePolicy">
              Мне больше 21 года. <br>
              Я согласен и принимаю <a href="#">«Правила приема ставок»</a> и <a href="#">«Политику
                конциденциальности»</a>
            </v-checkbox>

            <v-checkbox v-model="formStore.agreeEvent">
              Я принимаю участие и согласен с <a href="#">условиями бонуса</a>
            </v-checkbox>
          </template>

          <template #button>
            <v-button :loading="isSending" text="РЕГИСТРАЦИЯ"></v-button>
          </template>
        </form-vue>

        <p v-if="registerError" class="error-text register-error">Пользователь с таким номером телефона уже существует
        </p>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  &__freespins-image {
    position: relative;
    z-index: 1;
  }

  &__zeus-image {
    position: absolute;
    bottom: 186px;
    z-index: 0;
  }

  &__waves-image {
    position: absolute;
    bottom: 33%;
    left: 0;
    z-index: 1;
  }

  &__almaz-image {
    position: absolute;
    bottom: 34%;
    right: 0;
    z-index: 3;
  }

  &__gold-image {
    position: absolute;
    display: none;
  }

  &__elips-image {
    display: none;
  }

  &__elips-pure-image {
    display: none;
  }

  .form-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #0F0219;
    z-index: 2;
    padding: 36px 48px 48px 48px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;

    & .form-title {
      text-align: left;
      line-height: 28px;
      font-size: 22px;
      font-weight: 500;
      font-family: "Roboto-Medium", sans-serif;
    }

    & .error-text {
      color: #F91717;
      text-align: left;
      font-size: 13px;
      line-height: 16px;

      &.register-error {
        text-align: center;
        margin-top: 22px;
      }
    }
  }
}

@media screen and (min-width: 475px) {
  .section {
    & .form-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}

@media screen and (min-width: 1024px) {
  .section {
    align-items: center;
    justify-content: center;

    & .form-wrapper {
      right: 0;
      width: 30%;
      height: 100vh;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      background-color: #00000070;
      padding-inline: 30px;

      h2 {
        align-self: start;
      }
    }

    &__freespins-image {
      position: absolute;
      width: 582px;
      height: 456px;
      top: 50%;
      left: 40%;
      z-index: 2;
      transform: translate(-40%, -50%);
    }

    &__zeus-image {
      height: 875px;
      width: 681px;
      bottom: 100px;
      left: -180px;
      z-index: 1;
    }

    &__waves-image {
      bottom: 0px;
      left: -100px;
      z-index: 1;
    }

    &__almaz-image {
      z-index: 1;
      right: calc(30% - 136px);
      top: 100px;
    }

    &__gold-image {
      display: block;
      bottom: 0;
      z-index: 1;
      right: calc(30% - 26px);
    }

    &__elips-image {
      display: block;
      position: absolute;
      bottom: 55%;
      right: 6%;
    }

    &__elips-pure-image {
      display: block;
      position: absolute;
      top: 20%;
      left: 0px;
      z-index: 0;
    }
  }
}

@media screen and (min-width: 1727px) {
  .section {
    & .form-wrapper {
      padding-inline: 100px;
    }

    &__freespins-image {
      width: 814px;
      height: 456px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &__zeus-image {
      bottom: 0;
      left: 20px;
      width: 741px;
      height: 1075px;
    }

    &__waves-image {
      bottom: 0;
      left: 0;
    }

    &__almaz-image {
      z-index: 1;
      right: calc(30% - 136px);
      top: 50px;
    }

    &__gold-image {
      display: block;
      bottom: 0;
      right: calc(30% - 26px);
    }
  }
}


:root {
  #app {
    overflow: hidden;
    background: #52098B url(./assets/images/main-bg--mobile.webp) center center / cover no-repeat;

    @media screen and (min-width: 1024px) {
      background: #52098B url(./assets/images/main-bg.webp) center center / cover no-repeat;
      position: relative;
    }
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 13px;

    & label {
      color: #BBC6F2;
      line-height: 16px;
      align-self: start;
    }

    & .input.error {
      -webkit-box-shadow: inset 0px 0px 0px 1px #f00;
      -moz-box-shadow: inset 0px 0px 0px 1px #f00;
      box-shadow: inset 0px 0px 0px 1px #f00;
    }

    & .input {
      padding-left: 14px;
      border-radius: 6px;
      background-color: #F1F3F6;
      color: #000;
      height: 38px;
      width: 100%;
      border: none;
      outline: none;
      caret-color: #5AB828;

      &::placeholder {
        color: #777B8B;
      }

      &:not(.error):focus {
        -webkit-box-shadow: inset 0px 0px 0px 1px #5AB828;
        -moz-box-shadow: inset 0px 0px 0px 1px #5AB828;
        box-shadow: inset 0px 0px 0px 1px #5AB828;
      }
    }
  }
}
</style>

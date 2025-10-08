<script setup lang="ts">
import logoImg from '@/assets/images/svg/logo.svg'
</script>

<template>
  <header class="header">
    <img class="header__logo" width="174" height="21" :src="logoImg" title="CASINOBET" aria-label="CASINOBET"
      alt="CASINOBET" />
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding-top: 35px;
  padding-bottom: 15px;

  & img {
    margin: 0 auto;
  }
}

@media screen and (min-width: 1024px) {
  .header {
    padding-top: 80px;

    & img {
      width: 331px;
      height: 40px;
    }
  }
}
</style>

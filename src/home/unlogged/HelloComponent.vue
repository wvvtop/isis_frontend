<script setup lang="ts">
import ButtonLink from '@/components/ButtonLink.vue';

</script>

<template>
  <div class="hello_component">
    <header class="hello_component__header">Добро пожаловать в планер целей</header>
    <p class="hello_component__text">Составляй план, выполняй задачи, достигай цели</p>
    <div class="hello_component__buttons">
      <ButtonLink text="Зарегестрироваться" link="/registration"></ButtonLink>
      <ButtonLink text="Войти" link="/login"></ButtonLink>
    </div>
  </div>
</template>

<style scoped>
.hello_component {
  padding-bottom: 20px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  background-color: var(--color-primary-grey);
  border-radius: 10px;
}

.hello_component__header {
  font-size: 30px;
  font-weight: 700;
}

.hello_component__text {
  font-size: 16px;
  font-weight: 300;
}

.hello_component__buttons {
  display: flex;
  gap: 25px;
}
</style>

<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue';

</script>

<template>
  <div class="ready_to_start">
    <h2>
      Готовы начать?
    </h2>
    <p>
      Создайте свою первую цель и распишите первые задачи.<br>
      Если у вас еще нет аккунта - пройдите регистрацию в сервисе.
    </p>
    <div class="ready_to_start__button">
      <ButtonComponent text="Создать первую цель"/>
    </div>

  </div>
</template>

<style scoped>
.ready_to_start {
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
  border: 2px solid var(--color-primary-grey);
  border-radius: 5px;
  padding: 20px;
}
</style>

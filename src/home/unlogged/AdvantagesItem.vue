<template>
  <div class="card">
    <div class="card__icon">
      <slot name="icon">
        <!-- Иконка по умолчанию, если не передана -->
        <LogoComponent/>
      </slot>
    </div>
    <div>
      <h2 class="card__title">{{ title }}</h2>
      <p class="card__text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
import LogoComponent from '@/components/svg/LogoComponent.vue';

defineProps({
  title: String,
  text: String
})
</script>


<style scoped>
.card {
  transition: all 0.3s ease;
  display: flex;
  gap: 10px;
  border: 2px solid var(--color-primary-grey);
  border-radius: 5px;
  padding: 20px;
}

.card__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  padding: 10px 3px 10px 3px;
  background-color: var(--color-primary-grey);
  border-radius: 50px;
}

.card:hover {
  transform: translateY(-2px);
}
</style>

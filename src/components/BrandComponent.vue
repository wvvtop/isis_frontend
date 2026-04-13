<script setup lang="ts">
import LogoComponent from './svg/LogoComponent.vue';

</script>

<template>
  <router-link to="/" class="brand_link">
    <div class="brand">
      <LogoComponent></LogoComponent>
      <span class="brand__text">Планер целей</span>
    </div>
  </router-link>
</template>

<style>
.brand {
  transition: all 0.3s ease;
}

.brand:hover {
  outline: 2px solid var(--color-primary-blue);
  outline-offset: 4px;
  border-radius: 8px;

}

.brand_link {
  text-decoration: none;
  /* убираем подчеркивание */
  color: inherit;
  /* наследуем цвет от родителя */
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand__text {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  /* color: #2c3e50; */
}
</style>

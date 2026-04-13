<template>
  <router-link :to="link" class="navbar__link" active-class="navbar__link--active">
    {{ text }}
  </router-link>
</template>

<script setup>
defineProps({
  link: String,
  text: String
})
</script>

<style scoped>
.navbar__link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: inline-block;
  background-color: var(--color-primary-blue);
  border: 0;
}

.navbar__link:hover {
  background-color: #425262;
  transform: translateY(-2px);
}
</style>

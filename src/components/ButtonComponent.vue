<template>
  <button class="button" @click="clickButton" :type="type">{{ text }}</button>
</template>

<script setup>
defineProps({
  text: String,
  type: {
    type: String,
    default: 'button'
  }
})
const emit = defineEmits(["action"])

const clickButton = () => {
  emit("action")
}
</script>

<style scoped>
.button {
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

.button:hover {
  background-color: #425262;
  transform: translateY(-2px);
}
</style>

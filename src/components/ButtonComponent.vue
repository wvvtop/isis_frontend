<template>
  <button class="button" :class="`button--${variant}`" @click="clickButton" :type="type">{{ text }}</button>
</template>

<script setup>
defineProps({
  text: String,
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  }
})
const emit = defineEmits(["action"])

const clickButton = () => {
  emit("action")
}
</script>

<style scoped>
.button--delete {
  background: #fee2e2;
  color: #ef4444;
}

.button--delete:hover {
  background: #fecaca;
}

.button--add-small {
  background: #f1f5f9;
  color: #475569;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 6px;
  transition: all 0.2s;
}

.button--add-small:hover {
  background: #e0f2fe;
  color: var(--color-primary-blue);
}

.button {
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: inline-block;
  border: 0;
}

.button--circle {
  padding: 10px 10px;
  border-radius: 999px;
  padding: 10px 15px;
  cursor: pointer;
}

.button:hover {
  transform: translateY(-1.3px);
}

.button--primary:hover {
  background-color: #425262;
}

.button--primary {
  color: white;
  background-color: var(--color-primary-blue);
}
</style>

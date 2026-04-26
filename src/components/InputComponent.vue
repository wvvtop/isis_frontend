<template>
  <input class="input_component" :type="type" :value="modelValue" @input="handleInput" @change="handleChange"
    :placeholder="placeholder" required>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  modelValue: String,
  placeholder: String,
  type: String,
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (event) => {
  emit('change', event.target.value)
}

const handleInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
}
</script>

<style scoped>
.input_component {
  padding: 12px 16px;
  border: 2px solid var(--color-primary);
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.input_component:focus {
  outline: none;
  border-color: var(--color-primary-blue);
  outline: none;
}

.input_component::placeholder {
  color: #999;
}
</style>

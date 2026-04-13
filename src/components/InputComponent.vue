<template>
  <input class="input_component" :type="type" :value="modelValue" @input="handleInput" :placeholder="placeholder"
    required>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  modelValue: String,
  placeholder: String,
  type: String,
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
}
</script>

<style scoped>
.input_component {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.input_component:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.input_component::placeholder {
  color: #999;
}
</style>

<template>
  <div class="goal-card__field">
    <label class="goal-card__label">
      {{ label }}
      <span v-if="required" class="goal-card__required">*</span>
    </label>
    <InputComponent :modelValue="modelValue" :placeholder="placeholder" :type="type" :required="required"
      @update:modelValue="updateValue" />
  </div>
</template>

<script setup>
import InputComponent from '@/components/InputComponent.vue';

defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value) => {
  emit('update:modelValue', value);
};
</script>

<style scoped>
.goal-card__field {
  margin-bottom: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.goal-card__required {
  color: #ef4444;
}
</style>

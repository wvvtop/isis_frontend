<template>
  <div class="goal-card">
    <h2 class="goal-card__title">Поля основной цели</h2>

    <FormField label="Название цели" :required="true" :modelValue="goal.title" @update:modelValue="updateTitle" />

    <FormField label="Описание цели (опционально)" :required="false" :modelValue="goal.description"
      @update:modelValue="updateDescription" />

    <GoalDateRange :startDate="goal.startDate" :endDate="goal.endDate" :milestones="goal.milestones"
      @update:startDate="updateStartDate" @update:endDate="updateEndDate" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import FormField from './FormField.vue';
import GoalDateRange from './GoalDateRange.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const goal = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const updateTitle = (value) => {
  emit('update:modelValue', { ...props.modelValue, title: value });
};

const updateDescription = (value) => {
  emit('update:modelValue', { ...props.modelValue, description: value });
};

const updateStartDate = (value) => {
  emit('update:modelValue', { ...props.modelValue, startDate: value });
};

const updateEndDate = (value) => {
  emit('update:modelValue', { ...props.modelValue, endDate: value });
};
</script>

<style scoped>
.goal-card {
  max-width: 600px;
  width: 90%;
  margin: 0 auto;
  background: var(--color-primary-grey, #ffffff);
  border-radius: 24px;
  padding: 2rem 1.5rem 0.2rem 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05),
    0 8px 10px -6px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.goal-card__title {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 1.75rem 0;
  color: #1e293b;
  letter-spacing: -0.01em;
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
}
</style>

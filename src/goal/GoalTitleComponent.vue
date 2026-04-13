<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      description: '',
      startDate: '',
      endDate: ''
    })
  }
});

// Определяем события
const emit = defineEmits(['update:modelValue']);

// Обработчики изменений
const updateTitle = (value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    title: value
  });
};

const updateDescription = (value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    description: value
  });
};

const updateStartDate = (value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    startDate: value
  });
};

const updateEndDate = (value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    endDate: value
  });
};

</script>

<template>
  <div class="goal-card">
    <h2 class="goal-card__title">Поля основной цели</h2>

    <div class="goal-card__field">
      <label class="goal-card__label">
        Название цели <span class="goal-card__required">*</span>
      </label>
      <InputComponent :required="true" class="goal-card__input" :modelValue="modelValue.title"
        @update:modelValue="updateTitle" />
    </div>

    <div class="goal-card__field">
      <label class="goal-card__label">Описание цели (опционально)</label>
      <InputComponent :required="false" class="goal-card__input" :modelValue="modelValue.description"
        @update:modelValue="updateDescription" />
    </div>

    <div class="goal-card__field">
      <label class="goal-card__label">Срок достижения</label>
      <div class="date-range">
        <div class="date-field">
          <label class="goal-card__label date-label">начало</label>
          <InputComponent type="date" class="goal-card__input" :modelValue="modelValue.startDate"
            @update:modelValue="updateStartDate" />
        </div>
        <div class="date-field">
          <label class="goal-card__label date-label">окончание</label>
          <InputComponent type="date" class="goal-card__input" :modelValue="modelValue.endDate"
            @update:modelValue="updateEndDate" />
        </div>
      </div>
    </div>
  </div>
</template>

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

.goal-card__field {
  margin-bottom: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>

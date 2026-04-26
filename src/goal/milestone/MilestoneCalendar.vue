<template>
  <div class="dates-section">
    <div class="date-group">
      <label>Начало этапа</label>
      <InputComponent type="date" :modelValue="displayStartDate" :min="minStartDate" :max="goal?.endDate || ''"
        @update:modelValue="handleStartDateChange" />
    </div>
    <div class="date-group">
      <label>Окончание этапа</label>
      <InputComponent type="date" :modelValue="displayEndDate" :min="displayStartDate || minStartDate"
        :max="goal?.endDate || ''" @update:modelValue="handleEndDateChange" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import InputComponent from '@/components/InputComponent.vue';
import { inject } from 'vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  goal: { type: Object, default: () => ({}) },
  minStartDate: { type: String, default: '' },
  milestoneIndex: { type: Number, required: true }
});

const emit = defineEmits(['update:modelValue']);

const store = inject('goalStore');

// Локальные значения для отображения в инпутах
const displayStartDate = ref(props.modelValue.startDate || '');
const displayEndDate = ref(props.modelValue.endDate || '');

// Реальные значения из модели
const realStartDate = ref(props.modelValue.startDate || '');
const realEndDate = ref(props.modelValue.endDate || '');

const handleStartDateChange = async (newStart) => {
  if (!newStart) return;

  // Базовые валидации
  if (props.goal?.endDate && newStart > props.goal.endDate) {
    alert('Начало этапа не может быть позже окончания всей цели');
    resetDisplayStart();
    return;
  }
  if (displayEndDate.value && newStart > displayEndDate.value) {
    alert('Начало этапа не может быть позже его окончания');
    resetDisplayStart();
    return;
  }

  // Проверка на потерю задач
  if (store?.wouldLoseTasksWithDates &&
    store.wouldLoseTasksWithDates(props.milestoneIndex, newStart, realEndDate.value)) {

    alert('Нельзя уменьшить диапазон этапа!\n\nНа датах, которые будут исключены, уже есть задачи.\n\nСначала удалите эти задачи вручную.');
    resetDisplayStart();
    return;
  }

  // Если всё ок — применяем изменение
  realStartDate.value = newStart;
  displayStartDate.value = newStart;
  emitUpdate();
};

const handleEndDateChange = async (newEnd) => {
  if (!newEnd) return;

  if (props.goal?.endDate && newEnd > props.goal.endDate) {
    alert('Окончание этапа не может быть позже окончания всей цели');
    resetDisplayEnd();
    return;
  }
  if (displayStartDate.value && newEnd < displayStartDate.value) {
    alert('Окончание этапа не может быть раньше его начала');
    resetDisplayEnd();
    return;
  }

  if (store?.wouldLoseTasksWithDates &&
    store.wouldLoseTasksWithDates(props.milestoneIndex, realStartDate.value, newEnd)) {

    alert('Нельзя уменьшить диапазон этапа!\n\nНа датах, которые будут исключены, уже есть задачи.\n\nСначала удалите эти задачи вручную.');
    resetDisplayEnd();
    return;
  }

  realEndDate.value = newEnd;
  displayEndDate.value = newEnd;
  emitUpdate();
};

const emitUpdate = () => {
  const updated = {
    ...props.modelValue,
    startDate: realStartDate.value,
    endDate: realEndDate.value,
    tasks: store?.cleanEmptyDays
      ? store.cleanEmptyDays(props.modelValue.tasks)
      : props.modelValue.tasks
  };
  emit('update:modelValue', updated);
};

// Надёжный сброс отображения
const resetDisplayStart = async () => {
  const oldValue = realStartDate.value;
  displayStartDate.value = '';           // временно очищаем
  await nextTick();
  displayStartDate.value = oldValue;     // возвращаем правильное значение
};

const resetDisplayEnd = async () => {
  const oldValue = realEndDate.value;
  displayEndDate.value = '';
  await nextTick();
  displayEndDate.value = oldValue;
};

// Синхронизация при изменении пропсов (например, когда родитель меняет milestone)
watch(() => props.modelValue.startDate, (val) => {
  realStartDate.value = val || '';
  displayStartDate.value = val || '';
});

watch(() => props.modelValue.endDate, (val) => {
  realEndDate.value = val || '';
  displayEndDate.value = val || '';
});
</script>

<style scoped>
.dates-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 28px;
}

.date-group label {
  display: block;
  font-size: 15px;
  color: #64748b;
  margin-bottom: 6px;
  font-weight: 500;
}

.date-group input[type="date"] {
  width: 100%;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 16px;
}
</style>

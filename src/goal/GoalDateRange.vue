<template>
  <div class="goal-card__field">
    <label class="goal-card__label">Срок достижения</label>
    <div class="date-range">
      <div class="date-field">
        <label class="goal-card__label date-label">начало</label>
        <InputComponent type="date" :modelValue="localStartDate" @update:modelValue="updateStartDate"
          :max="localEndDate" />
      </div>
      <div class="date-field">
        <label class="goal-card__label date-label">окончание</label>
        <InputComponent type="date" :modelValue="localEndDate" @update:modelValue="updateEndDate"
          :min="localStartDate" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import InputComponent from '@/components/InputComponent.vue';

const props = defineProps({
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  milestones: { type: Array, default: () => [] }
});

const emit = defineEmits(['update:startDate', 'update:endDate']);

const localStartDate = ref(props.startDate);
const localEndDate = ref(props.endDate);

const updateStartDate = (value) => {
  localStartDate.value = value;

  const invalid =
    (props.endDate && value > props.endDate) ||
    (props.milestones?.length && props.milestones[0]?.startDate < value);

  if (invalid) {
    nextTick(() => {
      localStartDate.value = props.startDate;
    });
    return;
  }

  emit('update:startDate', value);
};

const updateEndDate = (value) => {
  localEndDate.value = value;

  const invalid =
    (props.startDate && value < props.startDate) ||
    (props.milestones?.length && props.milestones[props.milestones.length - 1]?.endDate > value);

  if (invalid) {
    nextTick(() => {
      localEndDate.value = props.endDate;
    });
    return;
  }

  emit('update:endDate', value);
};

// Синхронизация при изменении пропсов извне
watch(() => props.startDate, (val) => {
  localStartDate.value = val || '';
});

watch(() => props.endDate, (val) => {
  localEndDate.value = val || '';
});
</script>

<style scoped>
.goal-card__field {
  margin-bottom: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.date-range {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.date-field label.date-label {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 4px;
}
</style>

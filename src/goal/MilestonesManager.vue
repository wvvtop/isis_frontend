<script setup>
import { computed } from 'vue';
import MilestoneItem from './MilestoneItem.vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  goal: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const milestones = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const addMilestone = () => {
  const last = milestones.value[milestones.value.length - 1];

  milestones.value.push({
    title: '',
    startDate: last?.endDate || props.goal.startDate || '',
    endDate: '',
    tasks: {}
  });
};

const removeMilestone = (index) => {
  if (confirm(`Вы действительно хотите удалить этап №${index + 1}?`)) {
    milestones.value.splice(index, 1);
  }
};

const updateMilestone = (index, value) => {
  const updated = [...milestones.value];
  updated[index] = value;
  milestones.value = updated;
};
</script>

<template>
  <div class="milestones-manager">
    <div class="milestones-header">
      <h2>Этапы цели</h2>
      <p class="description">Разделите цель на логические этапы с конкретными задачами</p>
    </div>

    <div v-if="milestones.length === 0" class="empty-state">
      <p>Пока нет ни одного этапа.<br>Нажмите кнопку ниже, чтобы добавить первый этап.</p>
    </div>

    <MilestoneItem v-for="(milestone, index) in milestones" :key="index" :modelValue="milestone" :goal="goal"
      :index="index" :milestones="milestones" @update:modelValue="val => updateMilestone(index, val)"
      @remove="() => removeMilestone(index)" />

    <button class="btn-add-milestone" @click="addMilestone">
      + Добавить новый этап
    </button>
  </div>
</template>

<style scoped>
.milestones-manager {
  margin-bottom: 60px;
}

.milestones-header {
  margin-bottom: 32px;
}

.milestones-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.milestones-header .description {
  font-size: 17px;
  color: #64748b;
  margin: 0;
}

.empty-state {
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 20px;
  padding: 60px 20px;
  text-align: center;
  color: #64748b;
  font-size: 17px;
  margin-bottom: 32px;
}

.btn-add-milestone {
  width: 100%;
  background: #6366f1;
  color: white;
  border: none;
  padding: 18px 24px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px -2px rgba(99, 102, 241, 0.3);
}

.btn-add-milestone:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -4px rgba(99, 102, 241, 0.4);
}

.btn-add-milestone:active {
  transform: scale(0.98);
}
</style>

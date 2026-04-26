<template>
  <div class="milestone-card">
    <MilestoneHeader :index="index" @remove="$emit('remove')" />

    <MilestoneInfo :modelValue="milestone" :goal="goal" :minStartDate="minStartDate" :milestoneIndex="index"
      @update:modelValue="handleMilestoneUpdate" />

    <MilestoneDay v-for="date in getDates()" :key="date" :date="date" :tasks="milestone.tasks" :milestoneIndex="index"
      @addTask="handleAddTask" @removeTask="handleRemoveTask" @updateTask="handleUpdateTask" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { inject } from 'vue';
import MilestoneHeader from './MilestoneHeader.vue';
import MilestoneInfo from './MilestoneInfo.vue';
import MilestoneDay from './MilestoneDay.vue';

const props = defineProps({
  milestone: { type: Object, required: true },
  goal: { type: Object, required: true },
  index: { type: Number, required: true }
});

const emit = defineEmits(['update:modelValue', 'remove']);

const store = inject('goalStore');

const minStartDate = computed(() => {
  if (props.index > 0 && props.goal.milestones[props.index - 1]) {
    return props.goal.milestones[props.index - 1].endDate || '';
  }
  return props.goal.startDate || '';
});

const getDates = () => {
  if (!props.milestone.startDate || !props.milestone.endDate) return [];

  const dates = [];
  let current = new Date(props.milestone.startDate);
  const end = new Date(props.milestone.endDate);

  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0];
    ensureDayExists(dateStr);   // теперь безопасно
    dates.push(dateStr);
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const ensureDayExists = (date) => {
  if (!props.milestone.tasks[date]) {
    // Вместо мутации пропса — создаём новый объект и эмитируем обновление
    const updatedMilestone = {
      ...props.milestone,
      tasks: {
        ...props.milestone.tasks,
        [date]: { main: [], side: [] }
      }
    };
    emit('update:modelValue', updatedMilestone);
  }
};

const handleMilestoneUpdate = (updated) => {
  emit('update:modelValue', updated);
};

const handleAddTask = (date, type) => {
  store?.addTask(props.index, date, type);
};

const handleRemoveTask = (date, type, taskIndex) => {
  store?.removeTask(props.index, date, type, taskIndex);
};

const handleUpdateTask = (date, type, taskIndex, value) => {
  store?.updateTask(props.index, date, type, taskIndex, value);
};
</script>

<style scoped>
.milestone-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 32px;
  box-shadow: 0 8px 25px -6px rgba(0, 0, 0, 0.07);
  border: 1px solid #f1f5f9;
  transition: all 0.25s ease;
}
</style>

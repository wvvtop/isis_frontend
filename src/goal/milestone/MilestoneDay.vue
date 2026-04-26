<template>
  <div class="day-section">
    <h4 class="day-title">{{ date }}</h4>

    <TaskComponent :tasks="tasks" :date="date" taskType="main" :taskQuantity="3" @addTask="emitAddTask"
      @removeTask="emitRemoveTask" @updateTask="emitUpdateTask" />

    <TaskComponent :tasks="tasks" :date="date" taskType="side" :taskQuantity="10" @addTask="emitAddTask"
      @removeTask="emitRemoveTask" @updateTask="emitUpdateTask" />
  </div>
</template>

<script setup>
import TaskComponent from './TaskComponent.vue';

const props = defineProps({
  date: { type: String, required: true },
  tasks: { type: Object, default: () => ({}) }
});

const emit = defineEmits(['addTask', 'removeTask', 'updateTask']);

const emitAddTask = (type) => emit('addTask', props.date, type);
const emitRemoveTask = (type, index) => emit('removeTask', props.date, type, index);
const emitUpdateTask = (type, index, value) => emit('updateTask', props.date, type, index, value);
</script>

<style scoped>
.day-section {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
}

.day-title {
  font-size: 17px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #e0f2fe;
}
</style>

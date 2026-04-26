<template>
  <div class="task-section" :data-task-type="taskType">
    <strong class="task-section-title">
      {{ taskType === 'main' ? 'Main' : 'Side' }} задачи (до {{ taskQuantity }})
    </strong>

    <draggable v-if="tasks?.[date]?.[taskType]" :list="tasks[date][taskType]" item-key="id" animation="200"
      group="tasks" :move="checkMove">
      <template #item="{ element, index }">
        <div class="task-item">
          <div class="task-input-wrapper">
            <InputComponent :model-value="element.text" @update:model-value="val => updateTask(index, val)"
              placeholder="Задача" />
          </div>
          <ButtonComponent text="✕" variant="delete button--circle" @action="removeTask(index)" />
        </div>
      </template>
    </draggable>

    <ButtonComponent :text="`+ Добавить ${taskType === 'main' ? 'Main' : 'Side'}`" variant="add-small"
      @action="addTask" />
  </div>
</template>

<script setup>
import { inject } from 'vue';
import draggable from 'vuedraggable';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

const props = defineProps({
  taskType: { type: String, required: true },
  taskQuantity: { type: Number, required: true },
  tasks: { type: Object, default: () => ({}) },
  date: { type: String, required: true }
});

const emit = defineEmits(['addTask', 'removeTask', 'updateTask']);

const store = inject('goalStore');

const addTask = () => emit('addTask', props.taskType);
const removeTask = (index) => {
  if (confirm('Вы точно хотите удалить задачу?')) {
    emit('removeTask', props.taskType, index);
  }
};
const updateTask = (index, value) => emit('updateTask', props.taskType, index, value);

const checkMove = (evt) => {
  if (evt.from === evt.to) return true;

  const toSection = evt.to.closest('.task-section');
  if (!toSection) return false;

  const toType = toSection.dataset.taskType;
  const dayTasks = props.tasks?.[props.date];
  if (!dayTasks || !dayTasks[toType]) return false;

  const maxLimit = toType === 'main' ? 3 : 10;
  return dayTasks[toType].length < maxLimit;
};
</script>

<style scoped>
.task-section {
  margin-bottom: 28px;
}

.task-section-title {
  display: block;
  font-size: 16px;
  color: #334155;
  margin-bottom: 10px;
  font-weight: 600;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.task-input-wrapper {
  flex: 1;
}
</style>

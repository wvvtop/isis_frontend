<template>
  <div class="milestones-manager">
    <div class="milestones-header">
      <h2>Этапы цели</h2>
      <p class="description">Разделите цель на логические этапы с конкретными задачами</p>
    </div>

    <div v-if="milestones.length === 0" class="empty-state">
      <p>Пока нет ни одного этапа.<br>Нажмите кнопку ниже, чтобы добавить первый этап.</p>
    </div>

    <MilestoneCard v-for="(milestone, index) in milestones" :key="index" :milestone="milestone" :goal="goal"
      :index="index" @update:modelValue="updateMilestone(index, $event)" @remove="removeMilestone(index)" />

    <div class="milestones-manager__btn_add_milestone">
      <ButtonComponent text="+ Добавить новый этап" @action="addMilestone" />
    </div>
  </div>
</template>

<script setup>
import { computed, provide } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import MilestoneCard from './milestone/MilestoneCard.vue';
import { useGoalCreationStore } from './stores/useGoalCreationStore';

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  goal: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue']);

const store = useGoalCreationStore();

// Предоставляем store всем дочерним компонентам
provide('goalStore', store);

const milestones = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const addMilestone = () => {
  store.addMilestone();
  // После добавления в store обновляем локальный computed
  milestones.value = store.goal.milestones;
};

const removeMilestone = (index) => {
  store.removeMilestone(index);
  milestones.value = store.goal.milestones;
};

const updateMilestone = (index, updatedMilestone) => {
  store.updateMilestone(index, updatedMilestone);
  milestones.value = store.goal.milestones;
};
</script>

<style scoped>
.milestones-manager__btn_add_milestone {
  text-align: center;
}

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
</style>

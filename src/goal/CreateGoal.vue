<script setup>
import PageLayout from '@/layouts/PageLayout.vue';
import GoalTitleComponent from './GoalTitleComponent.vue';
import MilestonesManager from './MilestonesManager.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useGoalCreationStore } from './stores/useGoalCreationStore';
import { computed } from 'vue';
import router from '@/router';

const store = useGoalCreationStore();

const goal = computed({
  get: () => store.goal,
  set: (val) => { /* store сам управляет состоянием */ }
});

// Передаём цель в MilestonesManager через v-model
const milestones = computed({
  get: () => store.goal.milestones,
  set: (val) => {
    store.goal.milestones = val;
  }
});

const handleSubmit = () => {
  store.handleSubmit();
};

const handleGoalUpdate = (updatedGoal) => {
  // Обновляем основную цель через store (title, description, даты)
  Object.assign(store.goal, updatedGoal);
};
</script>

<template>
  <PageLayout>
    <template #page__content_item>
      <div class="create-goal-container">
        <div class="create-goal-header">
          <h1>Создать новую цель</h1>
          <p>Разбейте большую цель на этапы и ежедневные задачи</p>
        </div>

        <!-- Основная информация о цели -->
        <GoalTitleComponent :modelValue="store.goal" @update:modelValue="handleGoalUpdate" />

        <!-- Управление этапами -->
        <MilestonesManager :modelValue="milestones" :goal="store.goal" />

        <div class="submit-wrapper">
          <ButtonComponent @action="handleSubmit" text="Создать цель" />
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<style scoped>
.create-goal-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

.create-goal-header {
  text-align: center;
  margin-bottom: 50px;
}

.create-goal-header h1 {
  font-size: 42px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
}

.create-goal-header p {
  font-size: 19px;
  color: #64748b;
  margin: 0;
}

.submit-wrapper {
  text-align: center;
  margin-top: 40px;
}
</style>

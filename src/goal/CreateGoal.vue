<script setup>
import PageLayout from '@/layouts/PageLayout.vue';
import GoalTitleComponent from './GoalTitleComponent.vue';
import MilestonesManager from './MilestonesManager.vue';
import { ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { goalApi } from '@/api/goal';
import router from '@/router';



const goal = ref({
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  milestones: []
});

const handleSubmit = async () => {
  if (!validateGoal()) {
    alert('Пожалуйста, заполните все обязательные поля!');
    return;
  }

  try {
    const response = await goalApi.createGoal(goal.value);

    console.log('Цель успешно создана! ID:', response.data);
    alert(`Цель создана! ID = ${response.data}`);

    // Можно сделать редирект на страницу списка целей
    // router.push('/goals');
    router.push("/")
  } catch (error) {
    console.error('Ошибка при создании цели:', error.response?.data || error.message);
    alert('Ошибка при создании цели: ' + (error.response?.data?.message || error.message));
  }
  console.log('Создаём цель:', goal.value);
  // Здесь будет отправка на сервер
};

const validateGoal = () => {
  // 1. Проверка основной цели
  if (!goal.value.title?.trim()) return false;
  if (!goal.value.startDate) return false;
  if (!goal.value.endDate) return false;

  // 2. Проверка этапов
  if (goal.value.milestones.length === 0) return false;

  for (const milestone of goal.value.milestones) {
    if (!milestone.title?.trim()) return false;
    if (!milestone.startDate) return false;
    if (!milestone.endDate) return false;

    // Проверка хотя бы одной задачи (по желанию)
    const hasTasks = Object.values(milestone.tasks || {}).some(day =>
      (day.main && day.main.length > 0) || (day.side && day.side.length > 0)
    );
    if (!hasTasks) return false; // можно убрать, если задачи не обязательны
  }

  return true;
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

        <GoalTitleComponent v-model="goal" />
        <MilestonesManager v-model="goal.milestones" :goal="goal" />

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
</style>

<script setup>
import { goalApi } from '@/api/goal';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goals = ref([]);
const loading = ref(false);
const error = ref(null);

const loadGoals = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await goalApi.getAllGoals();
    goals.value = response.data || [];
  } catch (err) {
    console.error(err);
    error.value = 'Не удалось загрузить цели';
  } finally {
    loading.value = false;
  }
};

// Переход к цели (например, в детальный просмотр)
const openGoal = (goalId) => {
  router.push(`/goal/${goalId}`);
};

// Форматирование даты
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

onMounted(() => {
  loadGoals();
});
</script>

<template>
  <div class="all-goals-card">
    <div class="goals-header">
      <h2>Мои цели</h2>
      <button class="btn-new-goal" @click="router.push('/create-goal')">
        + Новая цель
      </button>
    </div>

    <div v-if="loading" class="loading-state">Загрузка целей...</div>
    <div v-else-if="error" class="error-state">{{ error }}</div>
    <div v-else-if="goals.length === 0" class="empty-state">
      <p>У вас пока нет целей</p>
      <button class="btn-new-goal" @click="router.push('/create-goal')">
        Создать первую цель
      </button>
    </div>

    <div v-else class="goals-list">
      <div v-for="goal in goals" :key="goal.id" class="goal-card" @click="openGoal(goal.id)">
        <div class="goal-card__header">
          <h3>{{ goal.title }}</h3>
          <span v-if="goal.endDate" class="goal-date">
            до {{ formatDate(goal.endDate) }}
          </span>
        </div>

        <p v-if="goal.description" class="goal-description">
          {{ goal.description }}
        </p>

        <div class="goal-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: goal.progress + '%' }"></div>
          </div>
          <span class="progress-text">{{ goal.progress || 0 }}% выполнено</span>
        </div>

        <div class="goal-footer">
          <span class="milestones-count">
            Этапов: {{ goal.milestonesCount || 0 }}
          </span>
          <span class="status" :class="goal.status">
            {{ goal.status === 'ACTIVE' ? 'В процессе' : 'Завершена' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.all-goals-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
}

.goals-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.goals-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.btn-new-goal {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-new-goal:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

.goal-card {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.goal-card:hover {
  border-color: #6366f1;
  box-shadow: 0 8px 25px -6px rgba(99, 102, 241, 0.15);
  transform: translateY(-3px);
}

.goal-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.goal-card__header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  flex: 1;
}

.goal-date {
  font-size: 14px;
  color: #64748b;
  white-space: nowrap;
  margin-left: 12px;
}

.goal-description {
  color: #475569;
  font-size: 15px;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 9999px;
  transition: width 0.4s ease;
}

.progress-text {
  font-size: 13px;
  color: #64748b;
}

.goal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
}

.milestones-count {
  color: #64748b;
}

.status {
  padding: 4px 12px;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 13px;
}

.status.ACTIVE {
  background: #dbeafe;
  color: #1e40af;
}

.status.COMPLETED {
  background: #d1fae5;
  color: #166534;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 40px;
  color: #64748b;
}
</style>

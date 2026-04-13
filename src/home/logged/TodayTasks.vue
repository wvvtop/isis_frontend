<script setup>
import { ref, onMounted, computed } from 'vue';
import { taskApi } from '@/api/taskApi';

const todayTasks = ref({
  main: [],
  side: []
});

const loading = ref(false);
const error = ref(null);

const todayDate = computed(() => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${day}-${month}-${year}`;
});

// Загрузка задач на сегодня
const loadTodayTasks = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await taskApi.getTodayTasks();
    todayTasks.value = response.data || { main: [], side: [] };
  } catch (err) {
    console.error(err);
    error.value = 'Не удалось загрузить сегодняшние задачи';
  } finally {
    loading.value = false;
  }
};

// Переключение статуса задачи
const toggleCompletion = async (task) => {
  const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';

  try {
    await taskApi.updateTaskStatus(task.id, newStatus);

    // Обновляем локальное состояние
    task.status = newStatus;
  } catch (err) {
    console.error('Ошибка при обновлении статуса:', err);
    alert('Не удалось обновить статус задачи');
  }
};

onMounted(() => {
  loadTodayTasks();
});
</script>

<template>
  <div class="today-tasks-card">
    <div class="today-header">
      <h2>Сегодняшние задачи</h2>
      <div class="today-date">{{ todayDate }}</div>
    </div>

    <div v-if="loading" class="loading-state">Загрузка задач...</div>
    <div v-else-if="error" class="error-state">{{ error }}</div>

    <div v-else class="tasks-content">
      <!-- Main задачи -->
      <div class="task-section">
        <h3 class="section-title main">Главные задачи (Main)</h3>

        <div v-if="todayTasks.main.length === 0" class="empty-message">
          Нет главных задач на сегодня
        </div>

        <div v-for="task in todayTasks.main" :key="task.id" class="task-item">
          <label class="task-label">
            <input type="checkbox" :checked="task.status === 'COMPLETED'" @change="toggleCompletion(task)"
              class="task-checkbox" />
            <span :class="{ completed: task.status === 'COMPLETED' }">
              {{ task.title }}
            </span>
          </label>
        </div>
      </div>

      <!-- Side задачи -->
      <div class="task-section">
        <h3 class="section-title side">Дополнительные задачи (Side)</h3>

        <div v-if="todayTasks.side.length === 0" class="empty-message">
          Нет дополнительных задач на сегодня
        </div>

        <div v-for="task in todayTasks.side" :key="task.id" class="task-item">
          <label class="task-label">
            <input type="checkbox" :checked="task.status === 'COMPLETED'" @change="toggleCompletion(task)"
              class="task-checkbox" />
            <span :class="{ completed: task.status === 'COMPLETED' }">
              {{ task.title }}
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.today-tasks-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
}

.today-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e0f2fe;
}

.today-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.today-date {
  background: #f1f5f9;
  color: #64748b;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 500;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 14px;
}

.main {
  color: #1e40af;
}

.side {
  color: #334155;
}

.task-section {
  margin-bottom: 32px;
}

.task-item {
  padding: 14px 0;
  border-bottom: 1px solid #f1f5f9;
}

.task-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  font-size: 16.5px;
}

.task-checkbox {
  width: 22px;
  height: 22px;
  accent-color: #6366f1;
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
  color: #64748b;
  opacity: 0.9;
}

.empty-message {
  color: #94a3b8;
  font-style: italic;
  padding: 16px 0;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 40px 20px;
  color: #64748b;
}
</style>

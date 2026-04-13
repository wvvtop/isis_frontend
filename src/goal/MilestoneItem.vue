<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  modelValue: Object,
  goal: Object,
  index: Number,
  milestones: Array
});

const emit = defineEmits(['update:modelValue', 'remove']);

const milestone = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

// предыдущий этап
const prevMilestone = computed(() => {
  return props.index > 0 ? props.milestones[props.index - 1] : null;
});

const minStartDate = computed(() => {
  if (prevMilestone.value?.endDate) return prevMilestone.value.endDate;
  return props.goal.startDate || '';
});

// ===== ОБРАБОТЧИКИ ДАТ =====
const handleStartDate = () => {
  let start = milestone.value.startDate;
  if (prevMilestone.value?.endDate && start < prevMilestone.value.endDate) {
    milestone.value.startDate = prevMilestone.value.endDate;
  }
  if (props.goal.startDate && start < props.goal.startDate) {
    milestone.value.startDate = props.goal.startDate;
  }
  if (milestone.value.endDate && milestone.value.endDate < milestone.value.startDate) {
    milestone.value.endDate = milestone.value.startDate;
  }
};

const handleEndDate = () => {
  if (!milestone.value.endDate) return;

  if (props.goal.endDate && milestone.value.endDate > props.goal.endDate) {
    milestone.value.endDate = props.goal.endDate;
  }
  if (milestone.value.endDate < milestone.value.startDate) {
    milestone.value.endDate = milestone.value.startDate;
  }
};

// ===== УДАЛЕНИЕ ЗАДАЧ =====
const removeTask = (date, type, index) => {
  if (!milestone.value.tasks?.[date]) return;
  milestone.value.tasks[date][type].splice(index, 1);

  if (milestone.value.tasks[date][type].length === 0 &&
    milestone.value.tasks[date].main.length === 0 &&
    milestone.value.tasks[date].side.length === 0) {
    delete milestone.value.tasks[date];
  }
};

// ===== ДОБАВЛЕНИЕ ЗАДАЧ =====
const addTask = (date, type) => {
  if (!milestone.value.tasks[date]) {
    milestone.value.tasks[date] = { main: [], side: [] };
  }

  if (type === 'main' && milestone.value.tasks[date].main.length < 3) {
    milestone.value.tasks[date].main.push('');
  }
  if (type === 'side' && milestone.value.tasks[date].side.length < 10) {
    milestone.value.tasks[date].side.push('');
  }
};

const updateTask = (date, type, index, value) => {
  if (milestone.value.tasks?.[date]?.[type]) {
    milestone.value.tasks[date][type][index] = value;
  }
};

// ===== ДНИ =====
const getDates = () => {
  if (!milestone.value.startDate || !milestone.value.endDate) return [];
  const dates = [];
  let current = new Date(milestone.value.startDate);
  const end = new Date(milestone.value.endDate);
  while (current <= end) {
    dates.push(new Date(current).toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

// ===== WATCH =====
watch(
  () => [milestone.value.startDate, milestone.value.endDate, props.goal?.endDate, props.goal?.startDate],
  () => {
    if (!milestone.value.startDate || !milestone.value.endDate) return;

    if (props.goal.endDate && milestone.value.endDate > props.goal.endDate) {
      milestone.value.endDate = props.goal.endDate;
    }
    if (milestone.value.endDate < milestone.value.startDate) {
      milestone.value.endDate = milestone.value.startDate;
    }
    if (props.goal.startDate && milestone.value.startDate < props.goal.startDate) {
      milestone.value.startDate = props.goal.startDate;
    }
  }
);
</script>

<template>
  <div class="milestone-card">
    <div class="milestone-header">
      <div class="milestone-number">
        <span>{{ index + 1 }}</span>
      </div>
      <h3>Этап {{ index + 1 }}</h3>
      <button class="btn-remove-milestone" @click="$emit('remove')" title="Удалить этап">
        ✕ Удалить этап
      </button>
    </div>

    <input v-model="milestone.title" placeholder="Название этапа" class="milestone-title-input" />

    <!-- ДАТЫ -->
    <div class="dates-section">
      <div class="date-group">
        <label>Начало этапа</label>
        <input type="date" v-model="milestone.startDate" :min="minStartDate" :max="goal.endDate || ''"
          @change="handleStartDate" />
      </div>
      <div class="date-group">
        <label>Окончание этапа</label>
        <input type="date" v-model="milestone.endDate" :min="milestone.startDate || minStartDate"
          :max="goal.endDate || ''" @change="handleEndDate" />
      </div>
    </div>

    <!-- ДНИ И ЗАДАЧИ -->
    <div v-for="date in getDates()" :key="date" class="day-section">
      <h4 class="day-title">{{ date }}</h4>

      <!-- MAIN TASKS -->
      <div class="task-section">
        <strong class="task-section-title">Main задачи (до 3)</strong>
        <div v-for="(task, i) in milestone.tasks?.[date]?.main || []" :key="i" class="task-item">
          <input :value="task" @input="e => updateTask(date, 'main', i, e.target.value)"
            placeholder="Основная задача на день" class="task-input" />
          <button @click="removeTask(date, 'main', i)" class="btn-remove">✕</button>
        </div>
        <button @click="addTask(date, 'main')" class="btn-add-small">
          + Добавить Main
        </button>
      </div>

      <!-- SIDE TASKS -->
      <div class="task-section">
        <strong class="task-section-title">Side задачи (до 10)</strong>
        <div v-for="(task, i) in milestone.tasks?.[date]?.side || []" :key="i" class="task-item">
          <input :value="task" @input="e => updateTask(date, 'side', i, e.target.value)"
            placeholder="Дополнительная задача" class="task-input" />
          <button @click="removeTask(date, 'side', i)" class="btn-remove">✕</button>
        </div>
        <button @click="addTask(date, 'side')" class="btn-add-small">
          + Добавить Side
        </button>
      </div>
    </div>
  </div>
</template>

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



.milestone-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #e2e8f0;
}

.milestone-number {
  width: 38px;
  height: 38px;
  background: #6366f1;
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  flex-shrink: 0;
}

.milestone-header h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #1e293b;
  flex: 1;
  margin-left: 16px;
}

.btn-remove-milestone {
  background: #fee2e2;
  color: #ef4444;
  border: none;
  padding: 10px 18px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-remove-milestone:hover {
  background: #fecaca;
}

/* Название этапа */
.milestone-title-input {
  width: 100%;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 17px;
  margin-bottom: 24px;
}

.milestone-title-input:focus {
  border-color: #6366f1;
  outline: none;
}

/* Даты */
.dates-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 28px;
}

.date-group label {
  display: block;
  font-size: 15px;
  color: #64748b;
  margin-bottom: 6px;
  font-weight: 500;
}

.date-group input[type="date"] {
  width: 100%;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 16px;
}

/* День */
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

/* Секции задач */
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

.task-input {
  flex: 1;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 15px;
}

.task-input:focus {
  border-color: #6366f1;
  outline: none;
}

.btn-remove {
  background: #fee2e2;
  color: #ef4444;
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;
}

.btn-remove:hover {
  background: #fecaca;
  transform: scale(1.1);
}

.btn-add-small {
  background: #f1f5f9;
  color: #475569;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 6px;
  transition: all 0.2s;
}

.btn-add-small:hover {
  background: #e0f2fe;
  color: #1e40af;
}
</style>

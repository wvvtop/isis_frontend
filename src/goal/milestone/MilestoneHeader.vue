<template>
  <div class="milestone-header">
    <div class="milestone-number">
      <span>{{ index + 1 }}</span>
    </div>
    <h3>Этап {{ index + 1 }}</h3>
    <ButtonComponent text="✕ Удалить этап" variant="delete" @action="$emit('remove')" />
  </div>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue';

defineProps({
  index: { type: Number, required: true }
});
</script>

<style scoped>
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
</style>

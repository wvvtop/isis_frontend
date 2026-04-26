<template>
  <div class="milestone-info">
    <div class="milestone-card_input">
      <InputComponent v-model="title" placeholder="Название этапа" />
    </div>

    <MilestoneCalendar :modelValue="milestone" :goal="goal" :minStartDate="minStartDate"
      :milestoneIndex="milestoneIndex" @update:modelValue="emitUpdate" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import InputComponent from '@/components/InputComponent.vue';
import MilestoneCalendar from './MilestoneCalendar.vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  goal: { type: Object, required: true },
  minStartDate: { type: String, default: '' },
  milestoneIndex: { type: Number, required: true }
});

const emit = defineEmits(['update:modelValue']);

const milestone = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const title = computed({
  get: () => props.modelValue.title || '',
  set: (val) => {
    emit('update:modelValue', { ...props.modelValue, title: val });
  }
});

const emitUpdate = (updated) => {
  emit('update:modelValue', updated);
};
</script>

<style scoped>
.milestone-card_input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.75rem;
}
</style>

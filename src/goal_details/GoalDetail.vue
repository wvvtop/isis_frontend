<template>
  <div>
    <PageLayout>
      <template #page__content_item>
        <div>
          <h1>{{ goal.title }}</h1>
          <p>{{ goal.description }}</p>
        </div>
      </template>

    </PageLayout>
  </div>
</template>

<script setup>
import { goalApi } from '@/api/goal';
import PageLayout from '@/layouts/PageLayout.vue';
import { onMounted, ref } from 'vue';

const goal = ref({});
const props = defineProps({
  id: String
})

onMounted(async () => {
  try {
    const response = await goalApi.getGoalWithMilestones(props.id)
    goal.value = response.data
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div>
    <h1 class="home_title">Список целей</h1>
    <ButtonLink to="/create-goal" text="Создать цель" />
    <TodayTasks />
    <SpacerComponent />
    <AllGoals />
  </div>
</template>

<script setup>
import ButtonLink from '@/components/ButtonLink.vue';
import TodayTasks from './TodayTasks.vue';
import AllGoals from './AllGoals.vue';
import SpacerComponent from '@/components/SpacerComponent.vue';


</script>

<style scoped>
.home_title {
  text-align: center;
}
</style>

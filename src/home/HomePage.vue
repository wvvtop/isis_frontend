<script setup lang="ts">
import PageLayout from '@/layouts/PageLayout.vue';
import UnloggedComponent from './unlogged/UnloggedComponent.vue';
import { useAuthStore } from '@/stores/auth';
import LoggedComponent from './logged/LoggedComponent.vue';

const authStore = useAuthStore()
</script>

<template>
  <PageLayout>
    <template #page__content_item>
      <UnloggedComponent v-if="!authStore.isAuthenticated()" />
      <LoggedComponent v-else />
    </template>
  </PageLayout>
</template>

<style scoped></style>

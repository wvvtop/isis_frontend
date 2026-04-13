<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue';
import PageLayout from '@/layouts/PageLayout.vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

const handleLogout = async () => {
  authStore.logout()
}
</script>

<template>
  <PageLayout>
    <template #page__content_item>
      <div class="user_profile">
        <h1>Профиль пользователя: {{ authStore.userEmail }}</h1>
        <ButtonComponent text="Выйти" @action="handleLogout" />
      </div>
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/layouts/PageLayout.vue';
import RegistrationForm from './RegistrationForm.vue';
</script>

<template>
  <PageLayout>
    <template #page__content_item>
      <div class="form_wrapper">
        <RegistrationForm />
      </div>
    </template>
  </PageLayout>
</template>

<style scoped>
.form_wrapper {
  display: flex;
  justify-content: center;
}
</style>

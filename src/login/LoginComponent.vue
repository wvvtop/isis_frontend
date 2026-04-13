<script setup lang="ts">
import PageLayout from '@/layouts/PageLayout.vue';
import AuthorizationForm from './AuthorizationForm.vue';
import ButtonLink from '@/components/ButtonLink.vue';

</script>

<template>
  <PageLayout>
    <template #page__navbar_right>
      <ButtonLink text="Регистрация" link="/registration"></ButtonLink>
    </template>
    <template #page__content_item>
      <div class="form_wrapper">
        <AuthorizationForm />
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

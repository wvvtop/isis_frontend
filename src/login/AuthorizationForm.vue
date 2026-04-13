<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()
const email = ref('');
const password = ref('');
const errorMsg = ref('')

const handleSubmit = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  }
  catch (err) {
    errorMsg.value = authStore.error
  }
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h1>Авторизация</h1>

    <div>
      <span>Почта</span>
      <InputComponent type="email" v-model="email" />
    </div>
    <div>
      <span>Пароль</span>
      <InputComponent type="password" v-model="password" />
    </div>
    <div>
      <ButtonComponent text="Войти!" type="submit" />
    </div>
  </form>
</template>

<style scoped>
.form {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  border: 2px solid var(--color-primary-grey);
  border-radius: 5px;
  padding: 20px;
}
</style>

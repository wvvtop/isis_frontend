<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore();
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  try {
    await authStore.register(email.value, password.value)
    router.push('/login')
  } catch (err) {
    errorMsg.value = authStore.error
  }
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h1>Регистрация</h1>
    <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
    <div>
      <span>Почта</span>
      <InputComponent type="email" v-model="email" />
    </div>
    <div>
      <span>Пароль</span>
      <InputComponent type="password" v-model="password" />
    </div>
    <div>
      <ButtonComponent text="Регистрация!" type="submit" />
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

<script setup lang="ts">
import AdvantagesImg2 from '@/components/svg/AdvantagesImg2.vue';
import AdvantagesItem from './AdvantagesItem.vue';
import AdvantagesImg1 from '@/components/svg/AdvantagesImg1.vue';
import AdvantagesImg3 from '@/components/svg/AdvantagesImg3.vue';
import AdvantagesImg4 from '@/components/svg/AdvantagesImg4.vue';
</script>

<template>
  <div class="advantages_wrapper">
    <div class="advantages">
      <p class="advantages__header">Преимущества</p>
      <p class="advantages__text">Инструменты, которые помогут достигать цели эффективно</p>
    </div>
    <div class="advantages__items">
      <AdvantagesItem
        title="Разделение задач на Main и Side"
        text="Фокусируйтесь на главных целях и не теряйте побочные задачи из виду">
        <template #icon>
          <AdvantagesImg1/>
        </template>
      </AdvantagesItem>
      <AdvantagesItem
        title="Автоматический перенос невыполненных задач"
        text="Ничего не теряется: задачи переносятся на следующий период автоматически">
        <template #icon>
          <AdvantagesImg2/>
        </template>
      </AdvantagesItem>
      <AdvantagesItem
        title="Прозрачная аналитика прогресса"
        text="Визуальные отчеты помогут отслеживать прогресс по каждой цели">
        <template #icon>
          <AdvantagesImg3/>
        </template>
      </AdvantagesItem>
      <AdvantagesItem
        title="Планирование на день, неделю, месяц"
        text="Гибкое расписание - планируйте на любом удобном горизонте времени">
        <template #icon>
          <AdvantagesImg4/>
        </template>
      </AdvantagesItem>
    </div>
  </div>
</template>

<style scoped>
.advantages_wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.advantages__header {
  font-size: 24px;
}

.advantages__text {
  font-size: 16px;
}

.advantages__items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>

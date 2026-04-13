<template>
  <div class="spacer" :style="{ padding: paddingValue}"></div>
</template>

<script setup>
defineProps({
  paddingValue: {
    type: String,
    default: '20px'
  }
})
</script>

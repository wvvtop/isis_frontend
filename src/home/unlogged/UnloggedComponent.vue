<template>
  <div class="page__content_wrapper">
    <HelloComponent />
    <SpacerComponent padding-value="15px" />
    <AdvantagesComponent />
    <SpacerComponent padding-value="15px" />
    <ReadyComponent />
  </div>
</template>

<script setup>
import SpacerComponent from '@/components/SpacerComponent.vue';
import HelloComponent from './HelloComponent.vue';
import AdvantagesComponent from './AdvantagesComponent.vue';
import ReadyComponent from './ReadyComponent.vue';


</script>

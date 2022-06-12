<template>

  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.title = "Vue demo"
})
</script>

<style lang="scss">
#app {
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
}
</style>

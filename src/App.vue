<template>
  <TheHeader />
  <router-view></router-view>
</template>

<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
</script>

<style lang="scss">


html, body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style> 
<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">JohnDoe</router-link>
    </div>
    <nav class="nav">
      <router-link to="/" class="nav-item">首页</router-link>
      <router-link to="/blog" class="nav-item">博客</router-link>
      <router-link to="/about" class="nav-item">关于我</router-link>
      <ThemeToggle />
    </nav>
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  background: var(--header-bg);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: background-color 0.3s;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 30px;
  align-items: center;
}

.nav-item {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s;
}

.nav-item:hover {
  color: var(--primary-color);
}
</style> 
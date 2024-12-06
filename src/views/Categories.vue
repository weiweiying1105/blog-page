<template>
  <div class="categories">
    <h1>文章分类</h1>
    <div class="category-list">
      <div v-for="category in categories" :key="category.name" class="category-item">
        <h3>{{ category.name }}</h3>
        <span class="count">{{ category.count }} 篇文章</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const categories = ref([
  { name: 'Vue.js', count: 5 },
  { name: 'TypeScript', count: 3 },
  { name: '前端工程化', count: 4 },
  { name: '性能优化', count: 2 }
])
</script>

<style scoped>
.categories {
  padding: 80px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.category-item {
  padding: 20px;
  background: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, background-color 0.3s;
  border: 1px solid var(--border-color);
}

.category-item:hover {
  transform: translateY(-5px);
}

.count {
  color: var(--text-color);
  opacity: 0.7;
  font-size: 0.9rem;
}
</style> 
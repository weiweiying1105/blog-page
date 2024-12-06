<!--
 * @Author: your name
 * @Date: 2024-12-06 11:28:14
 * @LastEditTime: 2024-12-06 13:18:08
 * @LastEditors: 韦玮莹
 * @Description: In User Settings Edit
 * @FilePath: \blog-page\my-vue-ts-project\src\views\Blog.vue
-->
<template>
  <div class="blog-container">
    <!-- 左侧分类栏 -->
    <aside class="categories-sidebar animate-slide-right">
      <h2 class="sidebar-title">文章分类</h2>
      <div class="category-list">
        <div 
          v-for="category in categories" 
          :key="category.name" 
          class="category-item"
          :class="{ active: currentCategory === category.name }"
          @click="selectCategory(category.name)"
        >
          <div class="category-info">
            <h3>{{ category.name }}</h3>
            <span class="count">{{ category.count }} 篇文章</span>
          </div>
          <div class="category-indicator"></div>
        </div>
      </div>
    </aside>

    <!-- 右侧文章列表 -->
    <main class="blog-content">
      <div class="blog-header animate-fade-in">
        <h1 class="page-title">{{ currentCategory || '所有文章' }}</h1>
        <div class="blog-filters">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索文章..." 
            class="search-input"
          />
          <select v-model="sortBy" class="sort-select">
            <option value="date">最新发布</option>
            <option value="popular">最受欢迎</option>
          </select>
        </div>
      </div>

      <div class="blog-grid">
        <TransitionGroup name="blog-list">
          <article 
            v-for="post in paginatedPosts" 
            :key="post.id" 
            class="blog-card animate-fade-in"
          >
            <div class="blog-card-inner">
              <div class="blog-cover">
                <img :src="post.cover" :alt="post.title" />
                <div class="blog-category">{{ post.category }}</div>
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <span class="date">
                    <Icon icon="mdi:calendar" />
                    {{ post.date }}
                  </span>
                  <span class="read-time">
                    <Icon icon="mdi:clock-outline" />
                    {{ post.readTime }} 分钟阅读
                  </span>
                </div>
                <h2 class="blog-title">{{ post.title }}</h2>
                <p class="blog-excerpt">{{ post.excerpt }}</p>
                <div class="blog-footer">
                  <router-link :to="`/blog/${post.id}`" class="read-more">
                    阅读更多
                    <Icon icon="mdi:arrow-right" />
                  </router-link>
                  <div class="blog-stats">
                    <span class="views">
                      <Icon icon="mdi:eye" />
                      {{ post.views }}
                    </span>
                    <span class="likes">
                      <Icon icon="mdi:heart" />
                      {{ post.likes }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </div>

      <!-- 添加分页组件 -->
      <div class="pagination" v-if="totalPages > 1">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <Icon icon="mdi:chevron-left" />
        </button>

        <button 
          v-for="page in displayedPages" 
          :key="page"
          class="page-btn"
          :class="{ active: currentPage === page }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>

        <button 
          class="page-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <Icon icon="mdi:chevron-right" />
        </button>
      </div>

      <!-- 显示总条数 -->
      <div class="total-count">
        共 {{ filteredPosts.length }} 篇文章
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'

const currentCategory = ref('')
const searchQuery = ref('')
const sortBy = ref('date')

const categories = ref([
  { name: 'Vue.js', count: 5 },
  { name: 'TypeScript', count: 3 },
  { name: '前端工程化', count: 4 },
  { name: '性能优化', count: 2 },
  { name: '设计模式', count: 3 },
  { name: '算法', count: 2 }
])

const blogPosts = ref([
  {
    id: 1,
    title: 'Vue3 组合式 API 最佳实践',
    excerpt: '探索 Vue3 组合式 API 的各种使用场景和最佳实践...',
    date: '2024-03-20',
    category: 'Vue.js',
    cover: '/images/vue3.jpg',
    readTime: 8,
    views: 1234,
    likes: 56
  },{
    id: 1,
    title: 'Vue3 组合式 API 最佳实践',
    excerpt: '探索 Vue3 组合式 API 的各种使用场景和最佳实践...',
    date: '2024-03-20',
    category: 'Vue.js',
    cover: '/images/vue3.jpg',
    readTime: 8,
    views: 1234,
    likes: 56
  },{
    id: 1,
    title: 'Vue3 组合式 API 最佳实践',
    excerpt: '探索 Vue3 组合式 API 的各种使用场景和最佳实践...',
    date: '2024-03-20',
    category: 'Vue.js',
    cover: '/images/vue3.jpg',
    readTime: 8,
    views: 1234,
    likes: 56
  },{
    id: 1,
    title: 'Vue3 组合式 API ���佳实践',
    excerpt: '探索 Vue3 组合式 API 的各种使用场景和最佳实践...',
    date: '2024-03-20',
    category: 'Vue.js',
    cover: '/images/vue3.jpg',
    readTime: 8,
    views: 1234,
    likes: 56
  },{
    id: 1,
    title: 'Vue3 组合式 API 最佳实践',
    excerpt: '探索 Vue3 组合式 API 的各种使用场景和最佳实践...',
    date: '2024-03-20',
    category: 'Vue.js',
    cover: '/images/vue3.jpg',
    readTime: 8,
    views: 1234,
    likes: 56
  },{
    id: 1,
    title: 'Vue3 组合式 API 最佳实践',
    excerpt: '探索 Vue3 组合式 API 的各种使用场景和最佳实践...',
    date: '2024-03-20',
    category: 'Vue.js',
    cover: '/images/vue3.jpg',
    readTime: 8,
    views: 1234,
    likes: 56
  },{
    id: 1,
    title: 'Vue3 组合式 API 最佳实践',
    excerpt: '探索 Vue3 组合式 API 的各种使用场景和最佳实践...',
    date: '2024-03-20',
    category: 'Vue.js',
    cover: '/images/vue3.jpg',
    readTime: 8,
    views: 1234,
    likes: 56
  },{
    id: 1,
    title: 'Vue3 组合式 API 最佳实践',
    excerpt: '探索 Vue3 组合式 API 的各种使用场景和最佳实践...',
    date: '2024-03-20',
    category: 'Vue.js',
    cover: '/images/vue3.jpg',
    readTime: 8,
    views: 1234,
    likes: 56
  },{
    id: 1,
    title: 'Vue3 组合式 API 最佳实践',
    excerpt: '探索 Vue3 组合式 API 的各种使用场景和最佳实践...',
    date: '2024-03-20',
    category: 'Vue.js',
    cover: '/images/vue3.jpg',
    readTime: 8,
    views: 1234,
    likes: 56
  },
  // 添加更多文章...
])

const selectCategory = (category: string) => {
  currentCategory.value = currentCategory.value === category ? '' : category
}

const filteredPosts = computed(() => {
  let posts = blogPosts.value

  // 分类筛选
  if (currentCategory.value) {
    posts = posts.filter(post => post.category === currentCategory.value)
  }

  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query)
    )
  }

  // 排序
  return [...posts].sort((a, b) => {
    if (sortBy.value === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return b.views - a.views
  })
})

// 添加分页相关的响应式变量
const currentPage = ref(1)
const pageSize = ref(6) // 每页显示的文章数量

// 修改 filteredPosts computed 属性，添加分页相关的计算属性
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / pageSize.value))

const displayedPages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 || 
      i === totalPages.value || 
      (i >= currentPage.value - delta && i <= currentPage.value + delta)
    ) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredPosts.value.slice(start, end)
})

// 监听筛选条件变化，重置页码
watch([currentCategory, searchQuery, sortBy], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.blog-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 20px 20px;
  min-height: calc(100vh - 60px);
}

.categories-sidebar {
  position: sticky;
  top: 80px;
  height: fit-content;
  background: var(--card-bg);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid var(--border-color);
}

.sidebar-title {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
}

.category-item {
  position: relative;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 10px;
}

.category-item:hover {
  background: var(--border-color);
}

.category-item.active {
  background: var(--primary-color);
  color: white;
}

.category-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-info h3 {
  margin: 0;
  font-size: 1rem;
}

.count {
  font-size: 0.9rem;
  opacity: 0.8;
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.blog-filters {
  display: flex;
  gap: 15px;
}

.search-input, .sort-select {
  padding: 8px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-color);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.blog-card {
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s;
}

.blog-card-inner {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-cover {
  position: relative;
  height: 200px;
}

.blog-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-category {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.blog-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.blog-meta {
  display: flex;
  gap: 15px;
  color: var(--text-color);
  opacity: 0.8;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.blog-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.blog-title {
  margin: 0 0 15px;
  font-size: 1.25rem;
  color: var(--text-color);
}

.blog-excerpt {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 20px;
  flex-grow: 1;
}

.blog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.read-more {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--primary-color);
  font-weight: 500;
}

.blog-stats {
  display: flex;
  gap: 15px;
  color: var(--text-color);
  opacity: 0.8;
}

.blog-stats span {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 动画 */
.blog-list-enter-active,
.blog-list-leave-active {
  transition: all 0.5s ease;
}

.blog-list-enter-from,
.blog-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.animate-slide-right {
  animation: slideRight 0.8s ease forwards;
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .blog-container {
    grid-template-columns: 1fr;
  }

  .categories-sidebar {
    position: relative;
    top: 0;
  }

  .blog-header {
    flex-direction: column;
    gap: 20px;
  }

  .blog-filters {
    width: 100%;
  }

  .search-input {
    flex-grow: 1;
  }
}

/* 添加分页相关样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  margin-bottom: 20px;
}

.page-btn {
  min-width: 40px;
  height: 40px;
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.page-btn:hover:not(:disabled) {
  background: var(--border-color);
}

.page-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.total-count {
  text-align: center;
  color: var(--text-color);
  opacity: 0.8;
  margin-top: 20px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .pagination {
    flex-wrap: wrap;
  }

  .page-btn {
    min-width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
}
</style>
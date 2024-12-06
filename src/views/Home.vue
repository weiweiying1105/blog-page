<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <div class="left-content animate-slide-up">
          <h1 class="title animate-fade-in">
            <span class="greeting">你好，我是</span>
            <span class="name cursor-effect">JohnDoe</span>
          </h1>
          <div class="typed-container">
            <span ref="typedElement"></span>
          </div>
          <p class="description">
            一名充满激情的前端工程师，专注于创建优雅的用户界面和卓越的用户体验。
            擅长 Vue.js、TypeScript 和前端工程化，热爱开源和技术创新。
          </p>
          <div class="cta-buttons">
            <router-link to="/about" class="btn primary">了解更多</router-link>
            <a href="#projects" class="btn secondary">查看作品</a>
          </div>
          <div class="social-links">
            <a href="https://github.com/yourusername" target="_blank" class="social-link">
              <Icon icon="mdi:github" width="24" />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" class="social-link">
              <Icon icon="mdi:linkedin" width="24" />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:your.email@example.com" class="social-link">
              <Icon icon="mdi:email" width="24" />
              <span>Email</span>
            </a>
          </div>
        </div>
        <div class="right-content animate-slide-left">
          <div class="profile-card hover-float">
            <div class="profile-image animate-rotate-in">
              <!-- <img src="@/assets/avatar.jpg" alt="Profile" /> -->
            </div>
            <div class="tech-stack">
              <div class="tech-title">技术栈</div>
              <div class="tech-items">
                <div 
                  v-for="(tech, index) in techStack" 
                  :key="tech.name" 
                  class="tech-item"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  <Icon :icon="tech.icon" width="24" />
                  <span>{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="projects" class="projects-section">
      <h2 class="section-title animate-slide-up">最近项目</h2>
      <div class="projects-grid">
        <div 
          v-for="(project, index) in projects" 
          :key="project.id" 
          class="project-card animate-fade-in"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
          </div>
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="project-links">
              <a :href="project.github" target="_blank" class="project-link">
                <Icon icon="mdi:github" width="20" />
                源码
              </a>
              <a :href="project.demo" target="_blank" class="project-link">
                <Icon icon="mdi:web" width="20" />
                演示
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="background-animation">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Typed from 'typed.js'
import { Icon } from '@iconify/vue'

const typedElement = ref<HTMLElement | null>(null)

const techStack = [
  { name: 'Vue.js', icon: 'logos:vue' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'React', icon: 'logos:react' },
  { name: 'Node.js', icon: 'logos:nodejs-icon' },
  { name: 'Webpack', icon: 'logos:webpack' },
  { name: 'Git', icon: 'logos:git-icon' }
]

const projects = ref([
  {
    id: 1,
    title: '个人博客系统',
    description: '基于 Vue 3 和 TypeScript 开发的现代化博客系统，支持Markdown编辑和暗色主题。',
    image: '/images/project1.jpg',
    tags: ['Vue 3', 'TypeScript', 'Node.js'],
    github: 'https://github.com/yourusername/project1',
    demo: 'https://demo.project1.com'
  },
  {
    id: 2,
    title: '在线协作工具',
    description: '实时协作的任务管理系统，集成了WebSocket实现实时通信。',
    image: '/images/project2.jpg',
    tags: ['Vue', 'WebSocket', 'Express'],
    github: 'https://github.com/yourusername/project2',
    demo: 'https://demo.project2.com'
  },
  // 可以添加更多项目
])

onMounted(() => {
  if (typedElement.value) {
    new Typed(typedElement.value, {
      strings: [
        '前端工程师',
        'Vue.js 开发者',
        'TypeScript 爱好者',
        '热爱技术创新'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    })
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, {
    threshold: 0.1
  })

  const projectsSection = document.querySelector('.projects-section')
  if (projectsSection) {
    observer.observe(projectsSection)
  }

  document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card)
  })
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  min-height: 100vh;
  padding: 80px 20px;
  display: flex;
  align-items: center;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.left-content {
  padding-right: 40px;
}

.greeting {
  font-size: 1.5rem;
  color: var(--text-color);
  opacity: 0.8;
}

.title {
  font-size: 3rem;
  margin-bottom: 20px;
  line-height: 1.2;
}

.name {
  display: block;
  color: var(--primary-color);
  font-size: 4rem;
  font-weight: bold;
}

.typed-container {
  font-size: 1.8rem;
  color: var(--text-color);
  height: 50px;
  margin-bottom: 20px;
}

.description {
  font-size: 1.1rem;
  color: var(--text-color);
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.btn {
  padding: 12px 30px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn.primary {
  background: var(--primary-color);
  color: white;
}

.btn.secondary {
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.social-links {
  display: flex;
  gap: 20px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  opacity: 0.8;
  transition: all 0.3s;
}

.social-link:hover {
  color: var(--primary-color);
  opacity: 1;
}

.profile-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 30px;
  border: 3px solid var(--primary-color);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tech-stack {
  margin-top: 30px;
}

.tech-title {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: var(--text-color);
}

.tech-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  opacity: 0.8;
}

.projects-section {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: var(--text-color);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.project-card {
  background: var(--card-bg);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: transform 0.3s;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-content {
  padding: 20px;
}

.project-content h3 {
  margin-bottom: 10px;
  color: var(--text-color);
}

.project-content p {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 15px;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.tag {
  background: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.project-links {
  display: flex;
  gap: 15px;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .left-content {
    padding-right: 0;
    text-align: center;
  }

  .cta-buttons {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }

  .title {
    font-size: 2.5rem;
  }

  .name {
    font-size: 3rem;
  }
}

.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  opacity: 0.5;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: var(--primary-color);
  filter: blur(80px);
  opacity: 0.1;
  animation: float 20s infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.circle-2 {
  width: 400px;
  height: 400px;
  top: 40%;
  right: -200px;
  animation-delay: -5s;
  background: #42b883;
}

.circle-3 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  left: 30%;
  animation-delay: -10s;
  background: #2c3e50;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(50px, 50px);
  }
  50% {
    transform: translate(0, 100px);
  }
  75% {
    transform: translate(-50px, 50px);
  }
}

.animate-slide-up {
  animation: slideUp 0.8s ease forwards;
  opacity: 0;
}

.animate-slide-left {
  animation: slideLeft 0.8s ease forwards;
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 1s ease forwards;
  opacity: 0;
}

.animate-rotate-in {
  animation: rotateIn 1s ease forwards;
  opacity: 0;
}

.tech-item {
  animation: scaleIn 0.5s ease forwards;
  opacity: 0;
}

.hover-float {
  transition: transform 0.3s ease;
}

.hover-float:hover {
  transform: translateY(-10px);
}

.cursor-effect {
  border-right: 3px solid var(--primary-color);
  animation: cursor 0.8s infinite;
}

.project-card {
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideLeft {
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rotateIn {
  from {
    transform: rotate(-180deg) scale(0);
    opacity: 0;
  }
  to {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes cursor {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: var(--primary-color);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .projects-section {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
  }

  .projects-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .circle {
    opacity: 0.05;
  }
  
  .animate-slide-left {
    animation: slideUp 0.8s ease forwards;
  }
}
</style>
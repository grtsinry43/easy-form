import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import componentTypes from '@/meta/component-meta.ts'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/official',
    name: 'official',
    component: () => import('../views/OfficialView.vue'),
  },
  {
    path: '/components',
    name: 'components',
    redirect: '/components/select/single-choice',
    component: () => import('../views/ComponentView.vue'),
    children: [] as RouteRecordRaw[],
  },
  {
    path: '/templates',
    name: 'templates',
    component: () => import('../views/TemplateView.vue'),
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/EditorView.vue'),
  },
]

componentTypes.value.forEach((type) => {
  type.buttons.forEach((button) => {
    // 将这些路由添加为 /components 的子路由
    const componentsRoute = routes.find((r) => r.name === 'components')

    if (componentsRoute && componentsRoute.children) {
      componentsRoute.children.push({
        path: `${type.id}/${button.id}`,
        name: `${type.id}-${button.id}`,
        component: () => import(`../components/materials/${type.id}/${button.id}.vue`),
      })
    }
  })
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

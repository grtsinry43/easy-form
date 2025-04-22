import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import OfficialView from '@/views/OfficialView.vue'

import componentTypes from '@/meta/component-meta.ts'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: OfficialView,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
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
  {
    path: '/form/:id',
    name: 'form',
    component: () => import('../views/FormView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
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

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PreviewView from '../views/PreviewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
      path: '/templates',
      name: 'templates',
      component: () => import('../views/TemplateView.vue'),
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('../views/ComponentsView/index.vue'),
      redirect: { name: 'select-group' },
      children: [
        {
          path: 'input-group',
          name: 'input-group',
          component: () => import('../views/ComponentsView/InputGroupView.vue'),
        },
        {
          path: 'note-group',
          name: 'note-group',
          component: () => import('../views/ComponentsView/NoteGroupView.vue'),
        },
        {
          path: 'profile-group',
          name: 'profile-group',
          component: () => import('../views/ComponentsView/ProfileGroupView.vue'),
        },
        {
          path: 'select-group',
          name: 'select-group',
          component: () => import('../views/ComponentsView/SelectGroupView.vue'),
        },
        {
          path: 'advanced-group',
          name: 'advanced-group',
          component: () => import('../views/ComponentsView/AdvancedGroupView.vue'),
        },
        {
          path: 'contact-group',
          name: 'contact-group',
          component: () => import('../views/ComponentsView/ContactGroupView.vue'),
        },
      ],
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../views/DataView.vue'),
    },
    {
      path: '/preview',
      name: 'preview',
      component: PreviewView
    }
  ],
})

export default router

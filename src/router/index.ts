import { i18n } from '@/i18n'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

/// 核心页面
// 主页面
import HomeMidList from '@/views/home/HomeMidList.vue'
import HomeView from '@/views/home/HomeView.vue'


 export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: i18n.t('common.home'),
      component: HomeView,
      children: [
          {
            path:'/',
            component: HomeMidList,
          },
          {
            path: '/article/:articleId',
            component: ()=> import('@/views/home/HomeMidDetail.vue'),
            props: (to) => ({articleId: Number(to.params.articleId)}),
          }
      ]
    },
    {
      path: '/blog',
      name: i18n.t('common.blog'),
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/about',
      name: i18n.t('common.about'),
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router

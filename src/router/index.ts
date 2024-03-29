import { i18n } from '@/i18n'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

/// 核心页面
// 主页面
import ArticlePage from '@/views/article/ArticlePage.vue'
import HomeMidList from '@/views/home/HomeMidList.vue'
import Homepage from '@/views/homepage/Homepage.vue'

 export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: i18n.t('common.home'),
      component: Homepage,
      children: [
          {
            path:'/',
            component: HomeMidList,
          },
      ]
    },
    {
      path: '/article/:articleId',
      component: ArticlePage,
      props: (to) => ({articleId: Number(to.params.articleId)}),
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

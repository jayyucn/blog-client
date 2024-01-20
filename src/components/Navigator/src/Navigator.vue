<script lang="ts" setup>

import { i18n } from '@/i18n';
import { ref } from 'vue';
import { router } from '@/router';



// const route = router.currentRoute.value;
const routes = router.getRoutes()
const lastPath = window.location.pathname;
const curIdx = routes.findIndex(rec => rec.path === lastPath) + 1 + "";
let activeIndex = ref(curIdx || '1')
router.beforeEach((to, from, next) => {
  console.log('to= ' + to.path + ' from= ' + from.path)
    next()
})

const handleSelect = (key: string, _: string[]) => {
  router.push(routes[Number(key) - 1].path)
}

</script>

<template>
  <el-row class="row-bg" justify="space-between">
    <el-col :span="6" class="grid-content left" />
    <el-col :span="6" class="grid-content mid">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="(route, idx) of routes" :key="idx" :index="String(idx + 1)">
          {{ i18n.t(String(route.name)) }}
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="6" class="grid-content right">
      <I18nDropdown />
    </el-col>
  </el-row>
</template>


<style lang="less" scoped>
.row-bg {
  width: 100%;
  height: 100%;
}

.right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mid {
  user-select: none;
}

.el-menu {
  display: flex;
  justify-content: center;
  align-items: center;
}

.router:hover {
  background-color: transparent !important;
}

.el-menu-item:hover {
  background-color: inherit !important;
}

.el-menu-item {
  background-color: inherit !important;
}
</style>
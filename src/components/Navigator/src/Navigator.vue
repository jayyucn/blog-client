<script lang="ts" setup>

import { i18n } from '@/i18n';
import { router } from '@/router';
import { ref } from 'vue';

const mainRoutes = router.options.routes;
const lastPath = router.options.history.location;
const curIdx = mainRoutes.findIndex(rec => {
  if (rec.path === lastPath)
    return true
  const children = rec.children || [];
  for (const iterator of children) {
    let path = iterator.path
    if (path === '') {
      continue
    }
    const idx = path.lastIndexOf(':')
    if (idx > -1) {
      path = path.substring(0, idx);
    }
    if (lastPath.startsWith(path)) {
      return true
    }
  }
}) + 1 + "";
let activeIndex = ref(curIdx || '1')
router.beforeEach((to, from, next) => {
  console.log('to= ' + to.path + ' from= ' + from.path)
  next()
})
const handleSelect = (key: string, _: string[]) => {
  router.push(mainRoutes[Number(key) - 1].path)
}

</script>

<template>
  <el-row class="row-bg" justify="space-between">
    <el-col :span="6" class="grid-content left" />
    <el-col :span="10" class="grid-content mid">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="(route, idx) of mainRoutes" :key="idx" :index="String(idx + 1)" style="font-size: larger;  text-shadow: 1px 1px 0 #aaa;">
          {{ i18n.t(String(route.name)) }}
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="6" class="grid-content right">
      <I18nDropdown />
    </el-col>
  </el-row>
</template>


<style lang="scss" scoped>
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
  background-color: transparent !important;
  // border-bottom: solid 1px #f00;
}

.router:hover {
  background-color: transparent !important;
}

.el-menu-item {
  background-color: inherit !important;
}
</style>
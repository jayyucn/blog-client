<script lang="ts" setup>

import { i18n } from '@/i18n';
import { router } from '@/router';

function clickHome() {
  router.replace('/')
}

function clickAbout() {
  router.replace('/about')
}

let lastScrollTop = 0;
var navbar
window.addEventListener('scroll', function () {
  const st = window.scrollY || document.documentElement.scrollTop;
  if (!navbar) navbar = document.querySelector('.navbar');
  // 如果向下滚动  
  if (st > lastScrollTop) {
    navbar.classList.add('hidden');
  }
  // 如果向上滚动  
  else {
    navbar.classList.remove('hidden');
  }

  lastScrollTop = st <= 0 ? 0 : st;
}, false);


</script>

<template>
  <el-row class="navbar" justify="space-between">

    <el-col :span="6" class="grid-content left">
      <Logo @click="clickHome" />
      <Search />
    </el-col>
    <el-col :span="8" class="grid-content mid" />
    <el-col :span="2" class="grid-content right">
      <el-text type @click="clickAbout"><el-icon>
          <InfoFilled />
        </el-icon>{{ i18n.t('common.about') }}</el-text>
      <I18nDropdown />
    </el-col>
  </el-row>
</template>


<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--el-border-color);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(5px);
  background-color: $header-bg;
  transition: top 0.5s ease-in-out;
}

.navbar.hidden {
  top: -60px;
  /* 或者其他你想要隐藏导航栏时使用的值 */
}

.left {
  margin-left: 30px;
  justify-content: start;
}

.right {
  margin-right: 30px;
  justify-content: end;
}

.left,
.right {
  display: flex;
  gap: 20px;
  align-items: center;

}

// .mid {
//   user-select: none;
// }

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
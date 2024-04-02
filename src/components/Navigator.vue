<script lang="ts" setup>

import Search from '@/components/Search.vue';
import { i18n } from '@/i18n';
import { router } from '@/router';
import I18nDropdown from './I18nDropdown/src/I18nDropdown.vue';
import Logo from './Logo.vue';

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
  <div class="navbar">

    <div class="left">
      <Logo @click="clickHome" class="logo" />
      <Search class="search" />
    </div>
    <div class="grid-content right">
      <el-text hidden="true" type @click="clickAbout"><el-icon>
          <InfoFilled />
        </el-icon>{{ i18n.t('common.about') }}</el-text>
      <I18nDropdown />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.navbar {
  height: var(--header-height);
  padding: 0 24px;
  border-bottom: var(--g-solid-border);
  align-items: center;
  display: flex;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(5px);

  &.hidden {
    top: -60px;
    /* 或者其他你想要隐藏导航栏时使用的值 */
  }

  .left {
    display: flex;
    align-items: center;
    flex: 1 0 auto;

    .logo {
      cursor: pointer;
    }

    .search {
      height: calc(var(--header-height) - 18px);
    }
  }
}


</style>
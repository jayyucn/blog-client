<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Navigator from './components/Navigator.vue';
import { i18n } from './i18n';
import ConfigProvider from './views/ConfigProvider.vue';

</script>

<template>
  <ConfigProvider>
    <div class="container">
      <Navigator class="header" />
      <RouterView class="main" />
      <div class="footer">{{ i18n.t('common.copyRight') }}@jayyu.cn</div>
    </div>
    <el-backtop :bottom="200" :right="200">
      <Icon icon="tdesign:backtop" style="color: black" />
    </el-backtop>
  </ConfigProvider>
</template>


<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;

  .header {
    position: fixed !important;
    height: var(--header-height);
    width: 100%;
    z-index: 500;
  }

  .main {
    display: flex;
    justify-content: center;
    margin-top: var(--header-height);
    height: 100%;
    width: 100%;
  }

  .footer {
    background-color: transparent;
    border-top: 1px solid var(--el-border-color);
    height: var(--header-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-backtop {
    transform: scale(1);
  }
}
</style>

<script setup lang="ts">
import ConfigProvider from './views/ConfigProvider.vue';
import { i18n } from './i18n';

</script>

<template>
  <ConfigProvider>
    <div class="common-layout">
      <el-container>
        <el-header>
          <Navigator />
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
        <el-footer>{{i18n.t('common.copyRight')}}@jayyu.cn</el-footer>
      </el-container>
    </div>

  </ConfigProvider>
</template>


<style lang="scss" scoped>
.common-layout {
  display: flex;  
  flex-direction: column; 
  align-items:stretch; 
  min-height: 100vh;
  min-width: 100vw;
  .el-header,
  .el-footer,
  .el-main {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .el-header{
    position: fixed !important;
    width: 100%;
    z-index: 10000;
  }

  .el-header,
  .el-footer {
    background-color: $header-bg;
    color: var(--el-text-color-primary);
    align-items: center;
    text-align: center;
  }

}
</style>

<script setup lang="ts">
import { i18n } from './i18n';

</script>

<template>
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
</template>


<style lang="less" scoped>
.common-layout {
  display: flex;  
  flex-direction: column;  
  // min-height: 100vh;  
  // min-width: 100vw;
  min-width:100vw;
  .el-header,
  .el-footer,
  .el-main {
    display: flex;
    justify-content: center;
  }
  .el-header{
    position: fixed !important;
    width: 100%;
  }

  .el-header,
  .el-footer {
    background-color: @headerBgColor;
    color: var(--el-text-color-primary);
    text-align: center;
  }
  .el-footer {
    align-items: center;
  }

  .el-main {
    height: 100%;
    // width: inherit;
    background-color: var(--el-color-primary-light-9);
    color: var(--el-text-color-primary);
  }
}
</style>

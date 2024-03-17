<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { i18n } from './i18n';
import ConfigProvider from './views/ConfigProvider.vue';

</script>

<template>
  <ConfigProvider>
    <el-container>
      <ElHeader id="el-header">
        <Navigator />
      </ElHeader>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>{{ i18n.t('common.copyRight') }}@jayyu.cn</el-footer>
    </el-container>
    <el-backtop :bottom="200" :right="200">
        <Icon icon="tdesign:backtop" style="color: black" />
    </el-backtop>
  </ConfigProvider>
</template>


<style lang="scss" scoped>
.el-container {
  min-width: 100vw;
}
.el-backtop{
  transform: scale(1);
}

.el-header,
.el-footer,
.el-main {
  padding-top: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
}

.el-header {
  position: fixed !important;
  width: 100%;
  z-index: 10000;
 
}

.el-footer {
  border-top: 1px solid var(--el-border-color);
}

.el-footer {
  height: 60px;
  background-color: $header-bg;
  color: var(--el-text-color-primary);
  align-items: center;
  text-align: center;
}
</style>

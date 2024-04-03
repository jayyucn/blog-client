<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Navigator from './components/Navigator.vue';
import { i18n } from './i18n';
import ConfigProvider from './views/ConfigProvider.vue';

</script>

<template>
  <ConfigProvider>
    <div class="app-container">
      <Navigator class="app-header" />
      <div class="app-content">
        <RouterView class="app-main" />
        <div class="app-footer">{{ i18n.t('common.copyRight') }}@jayyu.cn</div>
      </div>
    </div>
    <el-backtop :bottom="20" :right="40">
      <Icon icon="tdesign:backtop" style="color: black" />
    </el-backtop>
  </ConfigProvider>
</template>


<style lang="scss" scoped>
.app-container {
  display: block;

  .app-header {
    transform: translateY(0px);
    z-index: 500;
    top: 0;
    position: sticky;
  }

  .app-content {
    margin: auto;
    display: block;
  }

  .app-footer {
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

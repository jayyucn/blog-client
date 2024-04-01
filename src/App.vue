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
      <div class="content">
        <RouterView class="main" />
        <div class="footer">{{ i18n.t('common.copyRight') }}@jayyu.cn</div>
      </div>
    </div>
    <el-backtop :bottom="40" :right="40">
      <Icon icon="tdesign:backtop" style="color: black" />
    </el-backtop>
  </ConfigProvider>
</template>


<style lang="scss" scoped>
.container {
  display: block;
  // flex-direction: column;
  // height: 100vh;

  .header {
    transform: translateY(0px);
    z-index: 500;
    top: 0;
    position: sticky;
  }

  .content {
    max-width: 1336px;
    margin: auto;
    display: block;
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

<template>
  <div class="tabs-container">
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane :label="i18n.t('article.latest')">
        latest
      </el-tab-pane>
      <el-tab-pane :label="i18n.t('article.popular')">
        Task</el-tab-pane>
      <el-tab-pane :label="i18n.t('article.featured')">Config</el-tab-pane>
    </el-tabs>

  </div>
</template>
  
<script lang="ts" setup>
import { i18n } from '@/i18n';
</script>
<style lang="scss" scoped>


.demo-tabs {
  @include border();
  width: 300px; 
  padding: $margin-default;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #e00;
  font-size: 32px;
  font-weight: 600;
}
// .demo-tabs .custom-tabs-label .el-icon {
//   vertical-align: middle;
// }
// .demo-tabs .custom-tabs-label span {
//   vertical-align: middle;
//   margin-left: 4px;
// }
</style>
  
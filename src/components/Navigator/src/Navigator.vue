<script lang="ts" setup>

import { router } from '@/router';

function clickHome() {
  router.replace('/')
}

</script>

<template>
  <el-row class="row-bg" justify="space-between">

    <el-col :span="2" class="grid-content left">
      <Logo @click="clickHome" />

    </el-col>
    <el-col :span="10" class="grid-content mid" />
    <el-col :span="4" class="grid-content right">
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
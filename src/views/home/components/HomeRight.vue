
<script setup lang="ts">

import HomeRightSearch from './HomeRightSearch.vue';
import HomeRightTabs from './HomeRightTabs.vue';

</script>

<template>
    <div class="home-right">
    <el-space class="home-right-container" alignment="" direction="vertical">
            <HomeRightSearch />
            <HomeRightTabs />
    </el-space>
    </div>
</template>

<style lang="scss" scoped>
.home-right {
    margin-top: 86px;
}

</style>



<script setup lang="ts">

import HomeRightTabs from './HomeRightTabs.vue';

</script>

<template>
    <div class="container">
        <el-space class="home-right-container" alignment="" direction="vertical">
                <HomeRightTabs />
        </el-space>
    </div>
</template>

<style lang="scss" scoped>
.container{
    visibility: hidden;
    display: flex;
    justify-content:flex-start;
    align-items: start;
}

</style>
../../../components/HomeRightSearch.vue

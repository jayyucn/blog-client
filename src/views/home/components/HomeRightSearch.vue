<script setup lang="ts">

import { i18n } from '@/i18n';
const input1 = ref('')

</script>

<template>
    <el-affix :offset="60">
    <div class="input-container">
            <el-input v-model="input1" class="input" :placeholder="i18n.t('common.search')">
                <template #append>
                    <el-button>
                        <Search style="width: 1em;" />
                    </el-button>
                </template>
            </el-input>
        </div>
    </el-affix>
</template>

<style lang="scss" scoped>
.input-container {
    width: 100%;
    // position: relative;
    @include homeRightContainer();

    .input {
        padding: $margin-default;
    }
}
</style>
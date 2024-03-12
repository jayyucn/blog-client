<script setup lang="ts">

import { i18n } from '@/i18n';
import API from '@/net/api';
import type { ArticlePaginateQueryDTO } from '@/net/api/article';
const input1 = ref('')

const onChange = (value: string) => {
    API.article.fetchAritcleList({ page: 1, page_size: 10, keyword: value||undefined } as ArticlePaginateQueryDTO );
}

</script>

<template>
    <el-affix :offset="90">
        <div class="input-container">
            <el-input v-model="input1" class="input" :placeholder="i18n.t('common.search')" @change="onChange">
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
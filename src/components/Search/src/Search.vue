<script setup lang="ts">

import { i18n } from '@/i18n';
import API from '@/net/api';
import type { ArticlePaginateQueryDTO } from '@/net/api/article';
const input1 = ref('')

const onChange = (value: string) => {
    API.article.fetchAritcleList({ page: 1, page_size: 10, keyword: value || undefined } as ArticlePaginateQueryDTO);
}

</script>

<template>
    <div class="input-container">
        <el-input v-model="input1" class="input" prefix-icon="Search" :placeholder="i18n.t('common.search')" @change="onChange" />
    </div>
</template>

<style lang="scss" scoped>
.input-container {
    width: 200px;
}
</style>
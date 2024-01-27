<script setup lang="ts">
import { OriginState } from '@/enums/enum.article';
import type { IArticle } from '@/interfaces/interface.article';
import HomeMidListItem from './components/HomeMidListItem.vue';

const articleData: IArticle = {
  thumbnail: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
  title: "测试文章标题",
  description: "这里是文章概述。。。",
  meta: {
    likes: 12,
    comments: 4,
    views: 22,
  },
  _id: '',
  id: 1,
  keywords: [],
  content: `
## Translations

Element Plus is translated to multiple languages, you can click the badge to help up update the translation or apply to become
a proofreader [![Crowdin](https://badges.crowdin.net/element-plus/localized.svg)](https://crowdin.com/project/element-plus)

For now we are only showing English and Chinese for resource reasons, but we are looking forward to translate it into more languages, please go to the link
above and leave a message if you want to help translating Element Plus into your desired language.

### How to help translating

See how to help translating in [Translating Element Plus](https://element-plus.org/en-US/guide/translation.html).

## Stay tuned :eyes:

Join our [Discord](https://discord.com/invite/gXK9XNzW3X) to start communicating with everybody.

## This thing is broken, I should help improve it!

Awesommmmmmee. Everything you need is down below. You can also refer to
[CONTRIBUTING](https://github.com/element-plus/element-plus/blob/dev/CONTRIBUTING.md) and
[Code of Conduct](https://github.com/element-plus/element-plus/blob/dev/CODE_OF_CONDUCT.md)
where you'll find the same information listed below.
`,
  origin: OriginState.Original,
  featured: false,
  disabled_comments: false,
  tags: [],
  categories: [],
  updated_at: '',
  created_at: '4天前',
  extends: []
}
const articles: IArticle[] = [];
for (let index = 0; index < 6; index++) {
  const element = articleData
  element.id = 2
  articles.push(element)
}

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

</script>

<template>
  <el-carousel height="300px" indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small justify-center" text="2xl">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
  <div class="list">
    <HomeMidListItem v-for="(article, idx) in articles" :key="idx" :article="article" class="list-item" :class="idx" />
  </div>
  <div class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :small="true"
      :disabled="false"
      :background="true"
      layout="sizes, prev, pager, next, jumper, total"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

</template>
  
<style lang="scss" scoped>

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.pagination-container{
  display: flex;
  justify-content: flex-end;
  margin-top: $margin-default;
}
.list-item{
  @include border();
  margin-top: $margin-default;
}
</style>
  
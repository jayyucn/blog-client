<script setup lang="ts">
import API from '@/net/api';
import Store from '@/stores';

const props = defineProps<{
  articleId: number
}>()

onBeforeMount(() => {
  watch(
    () => props.articleId,
    (id) => {
      console.log('articleId changed:', id)
      API.article.fetchAritcleDetail(id)
    },
    { flush: 'post' }
  )
})
const article = Store.articleDetail.getArticle

</script>


<template>
  <div class="container">
    <!-- <p>This is article: {{ articleId }}</p> -->
    <v-md-preview :text="article.content" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  @include fullFilled;
  @include border;
  user-select: text;
}
</style>
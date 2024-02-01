<script setup lang="ts">
import API from '@/net/api';
import Store from '@/stores';

const props = defineProps<{
  articleId: number
}>()


onBeforeMount(() => {
  console.log('onBeforeMount')
  if(props.articleId){
    console.log('fetchAritcleDetail');
    API.article.fetchAritcleDetail(props.articleId)
  }
  watch(
    () => props.articleId,
    (id) => {
      console.log('articleId changed:', id)
      API.article.fetchAritcleDetail(id)
    },
    { flush: 'post' }
  )
})

const content = computed(() => {
  const cont = Store.articleDetail.getContent
  console.log('content changed:', cont)
  return cont
})

onMounted(() => console.log('onMounted'))
onBeforeUpdate(() => console.log('onBeforeUpdate'))
onUpdated(() => console.log('onUpdated'))
onBeforeUnmount(() => console.log('onBeforeUnmount'))
onUnmounted(() => console.log('onUnmounted'))
onActivated(() => console.log('onActivated'))
onDeactivated(() => console.log('onDeactivated'))
onErrorCaptured(() => console.log('onErrorCaptured'))

</script>


<template>
  <div class="container">
    <!-- <p>This is article: {{ articleId }}</p> -->
    <v-md-preview :text="content" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  @include fullFilled;
  @include border;
  user-select: text;
}
</style>
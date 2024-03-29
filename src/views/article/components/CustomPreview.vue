<template>
    <v-md-preview :text="text" style="font-size: 40px;" ref="myPreview" id="preview" @copy-code-success="handleCopyCodeSuccess" />
</template>

<style  lang="scss" scoped>
.preview {
    background-color: transparent;
}
.vuepress-markdown-body{
    font-size: 40px;
}

</style>

<script setup lang="ts">
import { useEventBus } from '@/event';
import { Message, getNavigationBarHeight } from '@/helpers/helper.component';
import { nextTick, onMounted, ref } from 'vue';

onMounted(() => {
  nextTick(() => {
    const style =( document.getElementsByClassName('vuepress-markdown-body').item(0) as HTMLElement).style;
    style.background = 'transparent';
    style.fontSize = '20px';
    style.fontStyle = 'normal';
    style.fontWeight = '400';
    style.wordBreak = 'break-word';
    style.overflowWrap = 'break-word';
     /***
      * John McWade美国设计师、教师、作家；创办Before & After杂志在他讲的关于一行是多少为最佳效果： 
      * 一行能够很轻松的都下来是25个字。 
      * 易读的文本一般30~80字符/行，包括标点。
      * 多行文本35~45；最多为65。*/
    style.maxWidth = '680px';
    style.minWidth = '0px';
  })
})

useEventBus({
    name: 'anchorClick',
    callback: (line: number) => {
        handleAnchorClick(line);
    }
});

// 初始化响应式状态    
defineProps<{
    text: string;
}>()

const myPreview = ref<any>(null);

function handleCopyCodeSuccess(_code: string) {
    // 处理复制代码成功的逻辑  
    Message.success('复制成功');
    // ...  
}

// 暴露给模板的方法    
const handleAnchorClick = (line: string | number) => {
    const heading = myPreview.value.$el.querySelector(
        `[data-v-md-line="${line}"]`
    );
    if (heading) {
        scrollToElement(heading)
    }
}

function scrollToElement(element) {
    // 获取元素的位置  
    const rect = element.getBoundingClientRect();
    // 计算滚动距离  
    const scrollTop = rect.top - getNavigationBarHeight() + window.scrollY; // rect.top 是元素相对于视口的顶部位置  

    // 滚动到元素  
    window.scrollTo({
        top: scrollTop,
        behavior: 'smooth' // 可选，使滚动平滑进行  
    });
}  
</script>
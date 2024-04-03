<template>
    <v-md-preview :text="text"  ref="myPreview" class="preview ssxx" id="preview"
        @copy-code-success="handleCopyCodeSuccess" />
</template>

<style>


/* // .vuepress-markdown-body{
//     width: auto;
// } */
/* 
@media screen and (max-width: $g-content-max-width){
    // .preview{
    //     max-width: $g-content-max-width; 
    //     width: auto;
    // }
    // .vuepress-markdown-body {
    //     max-width: $g-content-max-width; 
    //     width: auto;
    // }
} */
</style>

<script setup lang="ts">
import { useEventBus } from '@/event';
import { Message, getNavigationBarHeight } from '@/helpers/helper.component';
import { nextTick, onMounted, ref } from 'vue';

onMounted(() => {
    nextTick(() => {
        // const style =( document.getElementsByClassName('vuepress-markdown-body').item(0) as HTMLElement).style;
        // style.background = 'transparent';
        // style.fontSize = '20px';
        // style.fontStyle = 'normal';
        // style.fontWeight = '400';
        // // style.wordBreak = 'break-word';
        // // style.overflowWrap = 'break-word';
        // // style.width = 'inherit';
        // style.maxWidth = "680px";
        // style.minWidth = "0";
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
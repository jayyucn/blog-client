<template>
    <v-md-preview :text="text" ref="myPreview" id="preview" @copy-code-success="handleCopyCodeSuccess" />
</template>

<script setup lang="ts">
import { useEventBus } from '@/event';
import { getNavigationBarHeight } from '@/helpers/helper.component';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

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

function handleCopyCodeSuccess(code: string) {
    // 处理复制代码成功的逻辑  
    ElMessage.success('复制成功');
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
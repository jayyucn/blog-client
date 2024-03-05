<template>
    <div>
        <div v-for="anchor in titles" :key="anchor.title" :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
            @click="handleAnchorClick(anchor)">
            <a style="cursor: pointer">{{ anchor.title }}</a>
        </div>
        <v-md-preview :text="text" ref="myPreview" />
    </div>
</template>    
      
<script setup lang="ts">
import { onMounted, ref } from 'vue';

// 初始化响应式状态    
const props = defineProps<{
    text: string;
}>()

const titles = ref<IAnchor[]>([]);
const myPreview = ref<any>(null);
interface IAnchor {
    title: string;
    lineIndex: string;
    indent: number;
}

watch(() => props.text,
    () => {
        titles.value = [];
        nextTick(() => {
            const anchors: HTMLElement[] = myPreview.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
            const newTitles = Array.from(anchors).filter((title) => !!title.innerText.trim());

            if (!newTitles.length) {
                titles.value = [];
                return;
            }

            const hTags = Array.from(new Set(newTitles.map((title) => title.tagName))).sort();

            titles.value = newTitles.map((el) => ({
                title: el.innerText,
                lineIndex: el.getAttribute('data-v-md-line'),
                indent: hTags.indexOf(el.tagName),
            }));
        })
    }
)

onMounted(() => {

});

// 暴露给模板的方法    
const handleAnchorClick = (anchor: any) => {
    const heading = myPreview.value.$el.querySelector(
        `[data-v-md-line="${anchor.lineIndex}"]`
    );

    if (heading) {
        myPreview.value.scrollToTarget({
            target: heading,
            scrollContainer: window,
            top: 60,
        });
    }
    return {
        titles,
        handleAnchorClick,
        preview: myPreview,
    };
}

</script>
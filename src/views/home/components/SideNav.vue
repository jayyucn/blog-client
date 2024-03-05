<script lang="ts" setup>
import { useEventBus } from '@/event';
import Store from '@/stores';

//定义一个事件发送器
const { emit } = useEventBus()

interface Tree {
    label: string
    level: number
    anchor: IAnchor
    children?: Tree[]
}
interface IAnchor {
    title: string;
    lineIndex: string;
    indent: number;
}



//点击事件
const handleAnchorClick = (data: Tree) => {
    const preview = document.getElementById('preview');

    const heading = preview.querySelector(
        `[data-v-md-line="${data.anchor.lineIndex}"]`
    );

    if (heading) {
        emit('anchorClick', data.anchor.lineIndex)
        // preview.scrollToTarget({
        //     target: heading,
        //     scrollContainer: window,
        //     top: 60,
        // });
    }
    return {
        titles: titleTrees,
        handleAnchorClick,
        preview: preview,
    };
}

const titleTrees = ref<Tree[]>([]);

onMounted(() => {
    console.log('sidenav onMounted');
});

watch(() => Store.articleDetail.article.content,
    () => {
        titleTrees.value = [];
        nextTick(() => {
            const preview = document.getElementById('preview');
            if (!preview) {
                return;
            }
            const anchorEls: HTMLElement[] = [];    
            preview.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((heading) => {
                anchorEls.push(heading as HTMLElement);
            })
            titleTrees.value = buildTrees(anchorEls);
        });
    }
)


function buildTrees(elements: HTMLElement[]): Tree[] {
    const rootTrees: Tree[] = [];
    const stack: Tree[] = [];
    const hTags = Array.from(new Set(elements.map((title) => title.tagName))).sort();
    const topLevel = hTags.length ? parseInt(hTags[0].substring(1)) : 1;
    let isFirstNode: boolean = true;
    for (const element of elements) {
        const tagName = element.tagName.toLowerCase();
        const level = Number(tagName.charAt(1));
        if (level === topLevel || isFirstNode) {
            isFirstNode = false;
            const newNode: Tree = createTreeNode(element, level);  // 创建新的节点
            stack.length = 0;
            stack.push(newNode);
            rootTrees.push(newNode);
        } else {
            while (level <= stack.length) {
                stack.pop();
            }
            const parent = stack[stack.length - 1];
            const newNode: Tree = createTreeNode(element, level);  // 创建新的节点
            parent?.children.push(newNode);
            if (level > 0) {
                stack.push(newNode);
            }
        }
    }

    return rootTrees;
}
function createTreeNode(element: HTMLElement, indent: number): Tree | null {
    const tagName = element.tagName.toLowerCase();  // 获取标签名并转换为小写
    const level = Number(tagName.charAt(1));  // 获取标题级别（从1开始）
    if (isNaN(level) || level < 1 || level > 6) return null;  // 检查级别是否在1到6之间，如果不是则返回null
    const anchor = {  // 创建锚点对象，包含标题文本和行索引（如果有的话）
        title: element.innerText.trim(),  // 获取标题文本并去除首尾空格
        lineIndex: element.getAttribute('data-v-md-line'),  // 获取行索引（如果有的话）
        indent: indent,  // 获取标题的缩进级别（从0开始）
    };
    const children: Tree[] = [];  // 创建子节点数组，用于存储子标题节点
    return {  // 返回标题节点对象，包含标题文本、行索引、缩进级别和子节点数组
        label: anchor.title,  // 标题文本
        level: anchor.indent,
        anchor: anchor,  // 标题文本和行索引（如果有的话）
        children: children,  // 子节点数组，用于存储子标题节点
    }
}

const defaultProps = {
    children: 'children',
    label: 'label',
}

</script>

<template>
    <el-affix id="sidenav" :offset="85">
        <el-tree style="max-width: 1000px" node-key="level" :default-expanded-keys="[2, 3]" :data="titleTrees"
            :props="defaultProps" :expand-on-click-node=false @node-click="handleAnchorClick" />
    </el-affix>
</template>

<style lang="scss" scoped>
.el-tree {
    @include border;
}

.sidenav {
    margin-top: 100000px;
}
</style>
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

const isArticle = ref(false); // 是否是文章页面，用于控制是否显示大纲树

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
        isArticle.value = Store.articleDetail.hasTagName; // 设置为文章页面，显示大纲树
        titleTrees.value = [];
        const preview = document.getElementById('preview');
        if (!preview) {
            return;
        }
        const anchorEls: HTMLElement[] = [];
        preview.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((heading) => {
            anchorEls.push(heading as HTMLElement);
        })
        titleTrees.value = buildTrees(anchorEls);
    },
    { flush: 'post' }
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
    const tagName = element.tagName.toLowerCase();
    const level = Number(tagName.charAt(1));
    if (isNaN(level) || level < 1 || level > 6) return null;
    const anchor = {
        title: element.innerText.trim(),
        lineIndex: element.getAttribute('data-v-md-line'),
        indent: indent,
    };
    const children: Tree[] = [];
    return {
        label: anchor.title,
        level: anchor.indent,
        anchor: anchor,
        children: children,
    }
}


const defaultProps = {
    children: 'children',
    label: 'label',
}

</script>

<template>
    <el-affix v-if="isArticle" :offset="86">
        <el-tree style="max-width: 1000px" node-key="level" :default-expanded-keys="[2, 3]" :data="titleTrees"
            :props="defaultProps" :expand-on-click-node=false @node-click="handleAnchorClick" />
    </el-affix>
</template>

<style lang="scss" scoped>
.el-tree {
    @include border;
    background:  linear-gradient(to top right, #ccc, #fff);// var(--module-bg)
}
</style>
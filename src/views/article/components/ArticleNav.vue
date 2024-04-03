<template>
  <el-anchor :offset="60">
    <el-anchor-link v-for="(a1, idx) in anchorList" :key="idx" :href="a1.href">
      <template #default>
        <i>H1</i> {{ a1.title }}
      </template>
      <template #sub-link>
        <el-anchor-link v-for="(a2, idx) in a1.children" :key="idx" :href="a2.href">
          <template #default>
            <i>H2</i> {{ a2.title }}
          </template>
          <template #sub-link>
            <el-anchor-link v-for="(a3, idx) in a2.children" :key="idx" :href="a3.href">
              <template #default>
                <i>H3</i> {{ a3.title }}
              </template>
              <template #sub-link>
                <el-anchor-link v-for="(a4, idx) in a3.children" :key="idx" :href="a4.href">
                  <template #default>
                    <i>H4</i> {{ a4.title }}
                  </template>
                </el-anchor-link>
              </template>
            </el-anchor-link>
          </template>
        </el-anchor-link>
      </template>
    </el-anchor-link>
  </el-anchor>
</template>
<style lang="scss" scoped>
.el-anchor {
    background-color: transparent;
  }
i {
  display: inline-block;
  color: rgba(#999, 0.5);
}
</style>

<script lang="ts" setup>
import { type Anchor } from "@/data/article/article.anchor";
import { propTypes } from '@/utils/util.proptypes';
import { ElAnchor, ElAnchorLink } from 'element-plus';
import { ref, watch } from 'vue';
const anchorList = ref<Anchor[]>([]); // 导航栏链接列表
const props = defineProps({
  content: propTypes.string.def('')
})

watch(() => props.content,
  () => {
    const preview = document.getElementById('preview');
    if (!preview) {
      return;
    }
    const anchorEls: Anchor[] = [];
    let currentLevel = 0;
    preview.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((heading: HTMLElement) => {
      heading.id = heading.innerText;
      const tagName = heading.tagName.toLowerCase();
      const level = Number(tagName.charAt(1));
      if (level > 0 && level <= 4) {
        if (level > currentLevel) {
          currentLevel = level; // 更新当前层级，用于构建导航结构树
        }
        const anchor: Anchor = {
          title: heading.innerText,
          href: "#" + heading.id, // 生成锚点链接
          level: level,
          children: [] // 子标题列表
        }
        anchorEls.push(anchor);
      }
    })
    console.log('anchorEls:', anchorEls);
    anchorList.value = buildAnchorTree(anchorEls);
  },
  { flush: 'post' }
)
function buildAnchorTree(anchors: Anchor[]) {
  // 构建导航结构树，用于导航栏展示
  const tree: Anchor[] = [];
  const visited: Anchor[] = [];
  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];
    const parentAnchor = visited.findLast((a) => a.level < anchor.level);
    if (parentAnchor) {
      parentAnchor.children.push(anchor);
    } else {
      tree.push(anchor); // 如果没有找到父级项，则将当前项添加到根节点。
    }
    visited.unshift(anchor);
  }
  return tree;
}

</script>

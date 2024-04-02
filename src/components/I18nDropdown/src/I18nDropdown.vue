<script setup lang="ts">
import { useLocale } from '@/helpers/helper.locale'
import { useLocaleStore } from '@/stores/modules/store.locale'
import { useDesign } from '@/utils/util.design'
import { propTypes } from '@/utils/util.proptypes'
import { Icon } from '@iconify/vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import { computed, unref } from 'vue'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('locale-dropdown')

defineProps({
  color: propTypes.string.def('')
})

const localeStore = useLocaleStore()

const langMap = computed(() => localeStore.getLocaleMap)

const currentLang = computed(() => localeStore.getCurrentLocale)

const setLang = (lang: LocaleType) => {
  if (lang === unref(currentLang).lang) return
  // 需要重新加载页面让整个语言多初始化
  window.location.reload()
  localeStore.setCurrentLocale({
    lang
  })
  const { changeLocale } = useLocale()
  changeLocale(lang)
}
</script>

<template>
  <el-dropdown :class="prefixCls" trigger="click" placement="top-start"  @command="setLang">
    <span class="el-dropdown-link">
      {{ currentLang.name }}
      <Icon icon="iconoir:language" class="Icon r" width="28"  :inline="true" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in langMap" :key="item.lang" :command="item.lang" :divided="false" style=" margin-right:16px; margin-bottom: 8px; margin-top: 8px;">
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.r {
    color: rgba(41, 41, 41, 1);
}
.el-dropdown{
  /* width: 40px; */
  margin-left: 15px;
  color: #000
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
@/stores/modules/store.locale
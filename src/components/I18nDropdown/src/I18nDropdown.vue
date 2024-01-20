<script setup lang="ts">
import { computed, unref } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { useLocaleStore } from '@/stores/modules/store.i18n'
import { propTypes } from '@/utils/util.proptypes'
import { useDesign } from '@/utils/util.design'
import { useLocale } from '@/helpers/helper.locale'
import { Icon } from '@iconify/vue';

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
  <el-dropdown :class="prefixCls" trigger="click" @command="setLang">
    <span class="el-dropdown-link">
      {{ currentLang.name }}
      <Icon icon="entypo:language" class="Icon" width="28"  :inline="true" />
    </span>
    <template #dropdown>
      <el-dropdown-menu style=" color: black; ">
        <el-dropdown-item v-for="item in langMap" :key="item.lang" :command="item.lang">
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>

.el-dropdown{
  width: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

</style>

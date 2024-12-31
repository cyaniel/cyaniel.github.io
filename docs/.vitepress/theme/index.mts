// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ArchiveList from './pages/ArchiveList.vue'
import './utils/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('MyGlobalComponent' /* ... */)
    app.component('ArchiveList', ArchiveList)
  }
} satisfies Theme
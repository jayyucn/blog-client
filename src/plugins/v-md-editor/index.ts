import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
import Prism from 'prismjs';
import type { App } from 'vue';

export const setupMarkdown = (app: App<Element>) => {
  VMdPreview.use(vuepressTheme, {
    Prism,
    codeHighlightExtensionMap: {
      vue: 'html', 
    },
    extend(md: VMdPreview) {
      md.set
    }
  });
  VMdPreview.use(createMermaidPlugin());
  VMdPreview.use(createTodoListPlugin());
  VMdPreview.use(createCopyCodePlugin());
  VMdPreview.use(createLineNumbertPlugin());
  app.use(VMdPreview);
}
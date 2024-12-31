import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar';
import { DEFAULT_SIDEBAR_OPTIONS } from './theme/utils/sidebarDefaults.mjs';

const vitePressConfigs = {
  title: '心无尘埃，清风自来',
  // description: "A VitePress Site",
  cleanUrls: true,
  base: '/',
  lastUpdated: true,
  outline: 'deep',
  themeConfig: {
    nav: [
      { text: '笔记', link: '/posts/notes/' },
      { text: 'Writeup', link: '/posts/writeup/' },
      { text: '归档', link: '/archive' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    markdown: {
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2019-${new Date().getFullYear()} Cyanel`
    },
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    editLink: {
      pattern: '',
      text: 'Edit this page'
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },
    search: {
      provider: 'local'
    },
  }
};

export default defineConfig(
  withSidebar(vitePressConfigs, [
    {
      documentRootPath: 'docs',
      scanStartPath: 'posts/notes/',
      resolvePath: 'posts/notes/',
      ...DEFAULT_SIDEBAR_OPTIONS
    },
    {
      documentRootPath: 'docs',
      scanStartPath: 'posts/writeup/',
      resolvePath: 'posts/writeup/',
      ...DEFAULT_SIDEBAR_OPTIONS
    }
  ])
);
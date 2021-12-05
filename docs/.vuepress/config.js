const head = require('./config/head.js');
const plugins = require('./config/plugins.js');
const themeConfig = require('./config/themeConfig.js');

module.exports = {
  theme: 'vdoing', // 使用npm包主题
  // theme: require.resolve('../../theme-vdoing'), // 使用本地主题

  title: "前端自学资源",
  description: '前端自学资源网是资源和分享内容的大聚合。旨在为前端自学者提供一系列清晰的学习路线、靠谱的资源、高效的工具、和务实的文章。',
  markdown: {
    lineNumbers: true, // 代码行号
  },

  head,
  plugins,
  themeConfig,
}

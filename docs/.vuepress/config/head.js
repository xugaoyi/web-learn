// head
module.exports = [
  // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
  ['link', { rel: 'icon', href: '/img/favicon.ico' }], //favicons，资源放在public文件夹
  [
    'meta',
    {
      name: 'keywords',
      content: '前端自学网,前端,自学,资源,前端面试,前端学习路线,前端开发,前端工具,web,JavaScript,js,ES6,TypeScript,vue,react,css3,html5,Node',
    },
  ],
  ['meta', { name: 'baidu-site-verification', content: '7F55weZDDc' }], // 百度统计的站长验证
  ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色
]

// nav
module.exports = [
  // { text: '首页', link: '/' },
  {
    text: '前端知识图谱',
    link: '/web/', //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
    items: [
      // 说明：以下所有link的值只是在相应md文件定义的永久链接（不是什么特殊生成的编码）。另外，注意结尾是有斜杠的
      {
        text: '前端文章',
        items: [
          { text: 'JavaScript', link: '/pages/8143cc480faf9a11/' },
          // { text: 'Vue', link: '/pages/5d463fbdb172d43b/' },
        ],
      },
    ],
  },
  { text: '常用工具', link: '/about/' },
  { text: '摸鱼必备', link: '/about/' },
  { text: '资源分享', link: '/about/' },
  // {
  //   text: '收藏夹',
  //   link: '/pages/beb6c0bd8a66cea6/',
  //   // items: [
  //   //   { text: '网站', link: '/pages/beb6c0bd8a66cea6/' },
  //   //   { text: '资源', link: '/pages/eee83a9211a70f9d/' },
  //   //   { text: 'Vue资源', link: '/pages/12df8ace52d493f6/' },
  //   // ],
  // },
  { text: '关于', link: '/about/' },
  // {
  //   text: '索引',
  //   link: '/archives/',
  //   items: [
  //     { text: '分类', link: '/categories/' },
  //     { text: '标签', link: '/tags/' },
  //     { text: '归档', link: '/archives/' },
  //   ],
  // },
]

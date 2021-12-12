---
home: true
# heroImage: /img/logo.png
heroText: 前端自学网
tagline: 前端自学网是资源和分享内容的大聚合。旨在为前端自学者提供一系列清晰的学习路线、靠谱的资源、高效的工具、和务实的文章。
actionText: 开始学习
# actionLink: /web/
bannerBg: none # auto => 网格纹背景(有bodyBgImg时无背景)，默认 | none => 无 | '大图地址' | background: 自定义背景样式       提示：如发现文本颜色不适应你的背景时可以到palette.styl修改$bannerTextColor变量

# features: # 可选的
#   - title: 前端
#     details: JavaScript、ES6、Vue框架等前端技术
#     link: /web/ # 可选
#     imgUrl: /img/web.png # 可选
#   - title: 页面
#     details: html(5)/css(3)，前端页面相关技术
#     link: /ui/
#     imgUrl: /img/ui.png
#   - title: 技术
#     details: 技术文档、教程、技巧、总结等文章
#     link: /technology/
#     imgUrl: /img/other.png

# 文章列表显示方式: detailed 默认，显示详细版文章列表（包括作者、分类、标签、摘要、分页等）| simple => 显示简约版文章列表（仅标题和日期）| none 不显示文章列表
postList: none
# simplePostListLength: 10 # 简约版文章列表显示的文章数量，默认10。（仅在postList设置为simple时生效）
---

::: center
## Web前端知识图谱
:::

<iframe id="home_map" :src="$withBase('/markmap/00.Index.html')"></iframe>
<div class="small-tip">*提示：可点击蓝色链接跳转到相应知识点</div>

module.exports = {
    title: '前端框架使用指南', // 设置网站标题
    base: '/comDocs/',
    description: '前端框架-组件版本使用说明', //描述
    dest: './dist',   // 设置输出目录
    port: 8080, //端口
    themeConfig: { //主题配置
        // 添加导航栏
        nav: [
            {text: '主页', link: '/'}, // 导航条
            {text: '开发说明', link: '/baseComponents/'}
        ],
        sidebarDepth: 2,
        // 为以下路由添加侧边栏
        sidebar: {
            '/baseComponents/': [
                {
                    title: '快速开始',
                    collapsable: true,
                    children: [
                        'guide/summary.md',
                        'guide/demo.md',
                        'guide/deploy.md',
                        'guide/usage.md',
                    ]
                }
            ]
        }
    }
}
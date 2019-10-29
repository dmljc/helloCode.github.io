module.exports = {
    title: 'Hello Code',
    description: ' ',
    markdown: { lineNumbers: true },
    head: [[ 'link', { rel: 'icon', href: '/favicon.ico' }]],
    locales: { '/': { lang: 'zh-CN' }},
    themeConfig: {
        nav: [
            { text: '前端技能', link: '/base/js' },
            { text: '性能优化', link: '/optimize/optim' },
            { text: '面试宝典', link: '/interview/inter' }
        ],
        sidebar: {
            '/base': [
                '/base/js',
                '/base/css',
                '/base/browser',
                '/base/vue',
                '/base/git',
                '/base/webpack',
                '/base/wechat',
                '/base/safety',
                '/base/node',
                '/base/algorithm',
            ],
            '/optimize': [
                '/optimize/optim'
            ],
            '/interview': [
                '/interview/inter'
            ]
        }, 
        sidebarDepth: 2,
        search: true, // 是否开启搜索功能
        searchMaxSuggestions: 10, // 搜索框显示的搜索结果数量
        lastUpdated: '上次更新', // 获取每个文件的最后一次 git 提交，显示在每个页面的底部
    }
}
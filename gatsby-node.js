exports.createPages = ({ actions: { createPage }}) => {

    createPage({
        path: '/',
        component: require.resolve('./src/pages/index.tsx')
    })
}
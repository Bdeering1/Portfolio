exports.createPages = ({ actions: { createPage }}) => {

    createPage({
        path: '/',
        component: require.resolve('./src/index.tsx')
    })
}
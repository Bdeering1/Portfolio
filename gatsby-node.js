exports.createPages = ({ actions: { createPage }}) => {
    //const projects = require('./data/projects.json');

    createPage({
        path: '/',
        component: require.resolve('./src/pages/index.tsx')
    })
}
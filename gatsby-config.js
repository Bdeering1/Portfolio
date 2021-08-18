module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "portfolo",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/images/icon.png",
      },
    },
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
/*     {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/assets/images/",
      },
      __key: "images",
    }, */
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./data",
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
};

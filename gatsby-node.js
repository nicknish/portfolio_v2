/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const ShowTemplate = path.resolve(`${__dirname}/src/templates/show.jsx`)

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: ShowTemplate,
        context: {
          title: node.frontmatter.title,
        }, // additional data can be passed via context
      })
    })
  })
}

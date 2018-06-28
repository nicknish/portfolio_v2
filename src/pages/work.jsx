import React from 'react'
import IndexCard from '../components/IndexCard'
import shortid from 'shortid'

export class Work extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sortedExperiences: [] }
  }

  componentDidMount() {
    let sortedExperiences = this.props.data.allMarkdownRemark.edges.map(
      ({ node }) => {
        node.id = shortid.generate()
        return node
      }
    )

    this.setState({ sortedExperiences })
  }

  render() {
    const { sortedExperiences } = this.state

    return (
      <div className="index">
        <section className="container hero">
          <h1 className="index-title">Work</h1>
        </section>

        {sortedExperiences.map(node => {
          const {
            id,
            frontmatter: {
              title,
              path,
              date,
              excerpt,
              external_url,
              image_preview_url,
              image_preview_description,
              type,
            },
          } = node

          const imageSizes = image_preview_url
            ? image_preview_url.childImageSharp.sizes
            : null

          return (
            <IndexCard
              key={id}
              path={path}
              title={title}
              imageSizes={image_preview_url.childImageSharp.sizes}
              imagePreviewDescription={image_preview_description}
              descriptionExcerpt={excerpt}
              date={date}
            />
          )
        })}
      </div>
    )
  }
}

export default Work

export const query = graphql`
  query WorkQuery {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "work" } } }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
            excerpt
            external_url
            image_preview_url {
              childImageSharp {
                sizes(maxWidth: 640) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                }
              }
            }
            image_preview_description
            type
          }
        }
      }
    }
  }
`

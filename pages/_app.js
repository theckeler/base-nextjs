import '../styles/globals.css'
import axios from 'axios'

MyApp.getInitialProps = async (ctx) => {
  const menu = await axios({
    url: 'http://base.localhost:8080/graphql',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      query getPost {
        menus {
          nodes {
            menuItems {
              nodes {
                path
                label
                id
                pageInfo: connectedNode {
                  page: node {
                    ... on Page {
                      id
                      slug
                      title
                    }
                  }
                }
              }
            }
            slug
            locations
          }
        }
      }                         
    `
    }
  })

  return {
    pageProps: {
      menu: menu.data.data.menus.nodes,
    },
  }
}

function MyApp({ Component, pageProps }) {
  //  debugger
  return <Component {...pageProps} />
}

export default MyApp

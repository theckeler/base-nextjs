import axios from 'axios'

export async function getMenus() {
  const menu = await axios({
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
  //debugger

  return {
    menu: menu.data.data.menus.nodes,
  }
}
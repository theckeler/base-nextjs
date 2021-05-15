import axios from 'axios'

export async function getProducts() {
  const products = axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      query getPost {
        products(where: {visibility: CATALOG}) {
          nodes {
            slug
          }
        }
      }                        
`
    }
  })

  // debugger

  return products
}
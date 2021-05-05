import axios from 'axios'

export async function getPost(slug) {
    const page = axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            query: `
          query getPost {
            page(id: "${slug}", idType: URI) {
              id
              pageId
              slug
              title
              content
            }
          }  
          `
        }
    })

    return page
}
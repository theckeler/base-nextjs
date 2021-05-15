import axios from 'axios'

export async function getProduct(slug) {
  //console.log(slug)
  const product = axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
            query getPost {
                product(idType: SLUG, id: "${slug}") {
                  id
                  databaseId
                  name
                  type
                  purchasable
                  catalogVisibility
                  yithFields {
                    form_type
                    price
                    tooltip
                    type
                    placeholder
                    label
                    image
                    description
                  }
                  ... on SimpleProduct {
                    id
                    name
                    price
                    databaseId
                  }
                  description
                  sku
                  ... on VariableProduct {
                    id
                    name
                    databaseId
                    variations(where: {visibility: CATALOG}) {
                      nodes {
                        slug
                        sku
                        databaseId
                        price
                        purchasable
                        attributes {
                          nodes {
                            name
                            value
                            id
                            label
                          }
                        }
                      }
                    }
                    attributes {
                      nodes {
                          attributeId
                      label
                        name
                        id
                        options
                        variation
                        visible
                        ... on GlobalProductAttribute {
                          id
                          name
                          variation
                          visible
                          slug
                          scope
                          position
                          options
                          label
                          attributeId
                        }
                      }
                    }
                  }
                }
              }
          `
    }
  })

  // debugger

  return product
}
import Header from 'components/header'
import Footer from 'components/footer'
import Meta from 'components/meta'
import React, { Component } from 'react'
import axios from 'axios'
import { getMenus } from 'components/getMenus'

export async function getStaticProps() {
  const menu = await getMenus()
  const response = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      query getAllProducts {
        products(where: {visibility: CATALOG}) {
          nodes {
            id
            name
            sku
            slug
          }
        }
      }    
      `
    }
  })

  // debugger

  return {
    props: {
      posts: response.data.data.products.nodes,
      menus: menu.menu,
    },
    revalidate: 1,
  }

}

function Page(props, { post }) {
  //debugger

  return (
    <>
      <Meta title="Shop" />

      <Header menus={props.menus} currentPage="shop" />

      <section className="page index">
        <div className="wrapper">

          <ul className="">
            <li className="">
              <h1>Shop</h1>
              <ul className="posts">
                {
                  props.posts.map(post => {
                    //console.log(post)

                    return (
                      <li key={post.id} className="post">
                        <a href={"/shop/" + post.slug + "/"}>
                          <strong>{post.name}</strong>
                          <span>Read More ›</span>
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <Footer menus={props.menus} currentPage="shop"></Footer>
    </>
  )

}

export default Page
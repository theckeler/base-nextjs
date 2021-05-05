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
      query getPost {
        posts(where: {status: PUBLISH}) {
          nodes {
            slug
            guid
            dateGmt
            excerpt
            title
            id
            featuredImage {
              node {
                mediaDetails {
                  file
                  height
                  width
                }
              }
            }
            postId
          }
        }
      }      
      `
    }
  })

  //debugger

  return {
    props: {
      posts: response.data.data.posts,
      menus: menu.menu,
    },
    revalidate: 1,
  }

}

function Page(props, { post }) {
  //debugger

  return (
    <>
      <Meta title="Blog" />

      <Header menus={props.menus} currentPage="blog" />

      <section className="page index">
        <div className="wrapper">

          <ul className="rows">
            <li className="row row-1">
              <h1>Blog</h1>
              <ul className="posts">
                {
                  props.posts.nodes.map(post => {
                    //console.log(post)
                    const date = new Date(post.dateGmt)

                    return (
                      <li key={post.id} className="post">
                        <a href={"/blog/" + post.slug + "/"}>
                          <date>{date.toDateString()}</date>
                          <strong>{post.title}</strong>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: post.excerpt
                            }}></div>
                          <span>Read More ›</span>
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </li>
            <li className="row row-2 widgets">
            </li>
          </ul>
        </div>
      </section>

      <Footer menus={props.menus} currentPage="blog"></Footer>
    </>
  )

}

export default Page
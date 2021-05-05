import React, { Component } from 'react'
import axios from 'axios'
//import { useRouter } from 'next/router'
import { getPost } from 'components/getPost'
import { getMenus } from 'components/getMenus'
import Page from 'components/page'

export async function getStaticProps({ params }) {

  const page = await getPost(params.slug)
  const menu = await getMenus()

  //debugger

  return {
    props: {
      post: page.data.data.page,
      menus: menu.menu,
    },
    revalidate: 1,
  }

}

export async function getStaticPaths() {
  const posts = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      query getPost {
        pages {
          nodes {
            id
            slug
            isPostsPage
            isFrontPage
          }
        }
      }                  
      `
    }
  })

  var finalPaths
  var finalPaths = posts.data.data.pages.nodes
  var finalPaths = finalPaths.filter(remove => remove.isPostsPage != true)
  var finalPaths = finalPaths.filter(remove => remove.isFrontPage != true)

  const paths = finalPaths.map((post) => ({
    params: { slug: post.slug },
  }))


  return { paths, fallback: 'blocking' }
}

function slugPage(props) {
  // debugger
  return (
    <>
      <Page {...props} />
    </>
  )
}

export default slugPage
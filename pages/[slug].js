import Header from 'components/header'
import Footer from 'components/footer'
import Meta from 'components/meta'
import React, { Component } from 'react'
import axios from 'axios'

export async function getStaticProps({ params }) {

  const page = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      query getPost {
        page(id: "${params.slug}", idType: URI) {
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

  /*
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
  
    var removeMe = posts.data.data.pages.nodes
    var removeMe = removeMe.filter(remove => remove.isPostsPage != true)
    var removeMe = removeMe.filter(remove => remove.isFrontPage != true)
  
    debugger
  */
  return {
    props: {
      post: page.data.data.page,
    },
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


  return { paths, fallback: false }
}

function Page(props) {
  // debugger

  return (
    <>
      <Meta title={props.post.title} />

      <Header menu={props.menu} currentPage={props.post.slug} className="" />

      <div className={"page " + props.post.slug}>

        <div className="wrapper">
          <section>
            <h1 className="title">{props.post.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: props.post.content
              }}></div>
          </section>
        </div>

      </div>

      <Footer menu={props.menu} currentPage={props.post.slug}></Footer>
    </>
  )

}

export default Page
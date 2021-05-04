import Header from 'components/header'
import Footer from 'components/footer'
import Meta from 'components/meta'
import React, { Component } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

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

  return {
    props: {
      post: page.data.data.page,
      revalidate: 1,
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
        posts {
          nodes {
            id
            slug
          }
        }
      }            
      `
    }
  })

  const paths = posts.data.data.posts.nodes.map((post) => ({
    params: { slug: post.slug },
  }))

  return { paths, fallback: true }
}

function Page(props) {
  // debugger

  const router = useRouter()
  if (router.isFallback) {
    return (
      <>
        <div className="loading full-screen">Loading...</div>
      </>
    )
  } else {
    return (
      <>
        <Meta title={props.post.title} />

        <Header menu={props.menu} currentPage={props.post.slug} className="" />

        <div className={"page " + props.post.slug}>

          <div className="wrapper">
            <section>
              <h1 className="title">
                <Link href="/blog">
                  <a>Blog</a>
                </Link>
                : {props.post.title}
              </h1>
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
}

export default Page
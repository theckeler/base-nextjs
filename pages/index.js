import Header from 'components/header'
import Footer from 'components/footer'
import Meta from 'components/meta'
import React, { Component } from 'react'
import axios from 'axios'

export async function getStaticProps() {
  const response = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      query getPost {
        page(id: "home", idType: URI) {
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

  //debugger

  return {
    props: {
      post: response.data.data.page,
    },
  }

}

function Page(props, { post }) {
  //console.log(props)
  //debugger

  return (
    <>
      <Meta title="Home" />

      <Header menu={props.menu} currentPage={props.post.slug} />

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
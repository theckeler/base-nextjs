import Header from 'components/header'
import Footer from 'components/footer'
import Meta from 'components/meta'
import React, { Component } from 'react'
import axios from 'axios'

export async function getStaticProps() {


  const response = await axios({
    url: 'http://base.localhost:8080/graphql',
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
      <Meta title="Blog" />

      <Header menu={props.menu} currentPage="blog" />

      <div className={"page " + props.post.slug}>

        <div className="wrapper">
          <section>
            <h1 className="title">Blog</h1>

          </section>
        </div>

      </div>

      <Footer menu={props.menu} currentPage="blog"></Footer>
    </>
  )

}

export default Page
import React, { Component } from 'react'

export async function getStaticProps() {
  const response = await fetch('http://base.localhost:8080/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
      post: response.data.page,
    },
  }

}


function Page(props) {
  return (
    <>
      <div className={"page " + props.pageSlug}>

        <div className="wrapper">
          <section>
            <h1 className="title">{props.post.state.page.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: props.post.state.page.content
              }}></div>
          </section>
        </div>

      </div>
    </>
  )

}

export default Page
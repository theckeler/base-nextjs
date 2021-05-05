
import React, { Component } from 'react'
import { getPost } from 'components/getPost'
import { getMenus } from 'components/getMenus'
import Page from 'components/page'
import { useRouter } from 'next/router'

export async function getStaticProps() {
  const page = await getPost("home")
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

function Index(props) {

  const router = useRouter()
  if (router.isFallback) {
    return (
      <>
        <div className="loading full-screen">Loading...</div>
      </>
    )
  } else {
    return (<>
      <Page {...props} />

    </>
    )
  }
}

export default Index
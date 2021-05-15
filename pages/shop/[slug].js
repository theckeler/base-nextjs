import Header from 'components/header'
import Footer from 'components/footer'
import Meta from 'components/meta'
import React, { Component } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getPost } from 'components/getPost'
import { getProduct } from 'components/getProduct'
import { getProducts } from 'components/getProducts'
import { getMenus } from 'components/getMenus'
//import { processAttributes } from 'components/processAttributes'

export async function getStaticProps({ params }) {
  const page = await getPost(params.slug)
  const product = await getProduct(params.slug)
  // if (product.data.data.product.attributes.nodes.length > 0) {
  //  const attributes = await processAttributes(product.data.data.product.attributes.nodes)
  // }
  const menu = await getMenus()

  //debugger

  return {
    props: {
      post: page.data.data.page,
      menus: menu.menu,
      product: product.data.data.product,
    },
    revalidate: 1,
  }

}

export async function getStaticPaths() {
  const products = await getProducts()

  //debugger

  const paths = products.data.data.products.nodes.map((product) => ({
    params: { slug: product.slug },
  }))

  return { paths, fallback: true }
}

function Page(props) {
  //debugger
  console.log(props)

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

        <Header menus={props.menus} currentPage={props.post.slug} className="" />

        <div className={"page " + props.post.slug}>

          <div className="wrapper">
            <section>
              <h1 className="title">
                <Link href="/shop">
                  <a>Shop</a>
                </Link>
                : {props.product.name}
              </h1>
              <span>{props.product.price}</span>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.product.description
                }}></div>
            </section>
            <section>
              {props.product.attributes ? (
                <ul className="form">
                  {
                    props.product.attributes.nodes.map(attribute => {
                      console.log(attribute)

                      return (
                        <li key={attribute.slug} className="post">
                          <label htmlFor={attribute.slug}>{attribute.label}</label>
                          <select name={attribute.slug} id={attribute.slug} form="form">
                            {
                              attribute.options.map(option => {
                                return (
                                  <option value={option}>{option}</option>
                                )
                              })
                            }
                          </select>
                        </li>
                      )
                    })
                  }
                </ul>
              ) : (<div></div>)
              }
            </section>
          </div>

        </div>

        <Footer menus={props.menus} currentPage={props.post.slug}></Footer>
      </>
    )
  }
}

export default Page
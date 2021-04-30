import Header from 'components/header'
import Footer from 'components/footer'
import Meta from 'components/meta'
import Page from 'components/page'
import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <>
        <Meta title="Home" />

        <Header currentPage="home" className="" />

        <Page pageSlug="home" />

        <Footer currentPage="home"></Footer>
      </>
    )
  }
}

export default Home
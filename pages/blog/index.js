import Header from 'components/header'
import Footer from 'components/footer'
import Meta from 'components/meta'
import React, { Component } from 'react'

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      hasNextPage: true,
      endCursor: [],
      startCursor: [],
      loading: [],
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    if (entities[0].intersectionRatio && this.state.hasNextPage == true) {
      this.getPosts()
      //  debugger
    }
  }

  getPosts = () => {
    document.getElementById("observer").classList.add("loading");
    fetch('https://admin.consumedesign.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
query MyQuery {
  posts(where: {categoryId: 15}, first: 12, after: "${this.state.endCursor}") {
    pageInfo {
      hasNextPage
      endCursor
      startCursor
    }
    edges {
      node {
        id
        title
        content
        dateGmt
        link
        featuredImage {
          node {
            sourceUrl(size: MEDIUM)
            mediaDetails {
              height
              width
              sizes {
                height
                width
                name
              }
            }
            mediaItemUrl
            srcSet
          }
        }
        categories {
          nodes {
            categoryId
          }
        }
      }
    }
  }
}
    `,
      }),
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          posts: [...this.state.posts, ...response.data.posts.edges],
          hasNextPage: response.data.posts.pageInfo.hasNextPage,
          endCursor: response.data.posts.pageInfo.endCursor,
          startCursor: response.data.posts.pageInfo.startCursor,
          loading: true,
        })
        //document.getElementById("portfolio-container").classList.remove("loading");
      })
  }

  render() {
    return (
      <>
        <Meta title="Portfolio" />

        <Header currentPage="portfolio" className="" />

        <div className="main">
          <section className="section">
            <h1 className="title">portfolio</h1>
          </section>

          <section className="">
            <div id="portfolio-container" className="wrapper">

              <ul className="grid" id="portfolio-main">
                {
                  this.state.posts.map(post => {
                    const thisPost = post.node;
                    const date = new Date(thisPost.dateGmt)

                    var featured = thisPost.categories.nodes.find(function (value, index) {
                      return value.categoryId == 43
                    });

                    const mediumImg = thisPost.categories.nodes.find(({ name }) => name === 'medium');

                    if (thisPost) {
                      return (
                        <div key={thisPost.id} featured={featured} mediumImg={mediumImg} date={date} thisPost={thisPost} />
                      )
                    }
                  })
                }
              </ul>
              <div id="observer" className={this.state.hasNextPage === true ? "observer loading" : "none"} ref={loadingRef => (this.loadingRef = loadingRef)} />
            </div>
          </section>
        </div>

        <Footer currentPage="portfolio"></Footer>
      </>
    )
  }
}

export default Portfolio
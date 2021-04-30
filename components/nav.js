import Link from 'next/link'

/*
query MyQuery {
  menus(where: {location: MAIN}) {
    edges {
      node {
        id
        menuItems {
          nodes {
            url
            label
            id
            path
          }
        }
      }
    }
  }
}
*/


const Nav = (props) => (
    <>
        <nav className="nav">
            <ul>
                <li>
                    {props.currentPage == 'about' ? (
                        <span>About/Skills/Experience</span>
                    ) : (
                        <Link href="/about">
                            <a>About/Skills/Experience</a>
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    </>
)

export default Nav
import Link from 'next/link'
import Image from 'next/image'

function handleClick(e) {
    document.getElementById("navigation").classList.toggle('active');
    document.getElementById("hamburger").classList.toggle('active');
    document.getElementById("body").classList.toggle('active');
}

function Header(props) {
    return (
        <>
            <header id="header" className="header">
                <div className="wrapper">
                    <div className="logo">
                        {props.currentPage == 'home' ? (
                            <Image
                                src="/_images/logo.svg"
                                height={80}
                                width={300}
                                alt="Consume Design"
                                layout="responsive"
                            />) : (
                            <Link href="/">
                                <a>
                                    <Image
                                        src="/_images/logo.svg"
                                        height={80}
                                        width={300}
                                        alt="Consume Design"
                                        layout="responsive"
                                    />
                                </a>
                            </Link>
                        )}

                    </div>

                    <nav className="navigation" id="navigation" role="navigation" aria-label="Main">
                        <ul>
                            {
                                props.menu[1].menuItems.nodes.map(menuItem => {
                                    return (
                                        <li key={menuItem.id}>
                                            {props.currentPage == menuItem.pageInfo.page.slug ? (
                                                <span>{menuItem.label}</span>
                                            ) : (
                                                <Link href={menuItem.path}>
                                                    <a>{menuItem.label}</a>
                                                </Link>
                                            )}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>

                    <ul id="hamburger" className="hamburger" onClick={handleClick}>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </header >
        </>
    )
}

export default Header
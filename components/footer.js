import Link from 'next/link'

function Footer(props) {
    var d = new Date();
    var thisYear = d.getFullYear();

    return (
        <>
            <footer id="footer" className="footer">
                <div className="wrapper">
                    <ul className="social">
                        <li className="svg icon">
                            <a target="_blank" href="https://www.facebook.com/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h7.621v-6.961h-2.343v-2.725h2.343V9.309c0-2.324 1.421-3.591 3.495-3.591.699-.002 1.397.034 2.092.105v2.43H16.78c-1.13 0-1.35.534-1.35 1.322v1.735h2.7l-.351 2.725h-2.365V21H19a2 2 0 002-2V5a2 2 0 00-2-2z" />
                                </svg>
                                <span className="visually-hidden">Facebook</span>
                            </a>
                        </li>
                        <li className="svg icon">
                            <a target="_blank" href="https://www.linkedin.com/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H6.477v-7H9v7zM7.694 8.717c-.771 0-1.286-.514-1.286-1.2s.514-1.2 1.371-1.2c.771 0 1.286.514 1.286 1.2s-.514 1.2-1.371 1.2zM18 17h-2.442v-3.826c0-1.058-.651-1.302-.895-1.302s-1.058.163-1.058 1.302V17h-2.523v-7h2.523v.977c.325-.57.976-.977 2.197-.977S18 10.977 18 13.174V17z" />
                                </svg>
                                <span className="visually-hidden">LinkedIn</span>
                            </a>
                        </li>
                        <li className="svg icon">
                            <a target="_blank" href="https://twitter.com/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-1.95 6.514v.343c0 3.257-2.486 7.029-7.029 7.029-1.371 0-2.657-.429-3.771-1.114h.6c1.114 0 2.229-.429 3.086-1.029-1.114 0-1.971-.771-2.314-1.714.171 0 .343.086.429.086.257 0 .429 0 .686-.086-1.114-.257-1.971-1.2-1.971-2.4.343.171.686.257 1.114.343-.686-.6-1.114-1.286-1.114-2.143 0-.429.086-.857.343-1.2 1.2 1.457 3 2.486 5.057 2.571 0-.171-.086-.343-.086-.6a2.488 2.488 0 012.486-2.486c.686 0 1.371.257 1.8.771.6-.086 1.114-.343 1.543-.6-.171.6-.6 1.029-1.114 1.371.514-.086.943-.171 1.457-.429a5.789 5.789 0 01-1.202 1.287z" />
                                </svg>
                                <span className="visually-hidden">Twitter</span>
                            </a>
                        </li>
                        <li className="svg icon">
                            <a target="_blank" href="https://www.instagram.com/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M8 3a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5H8zm10 2a1 1 0 110 2 1 1 0 010-2zm-6 2a5 5 0 11-.001 10.001A5 5 0 0112 7zm0 2a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3z" />
                                </svg>
                                <span className="visually-hidden">Instagram</span>
                            </a>
                        </li>
                    </ul>

                    <nav className="nav">
                        <ul id="menu-footer-1" className="links">
                            {
                                props.menus[0].menuItems.nodes.map(menuItem => {
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
                        <p>{thisYear} ©Company Name</p>
                    </nav>
                </div>
            </footer >
        </>
    )
}


export default Footer
import Link from 'next/link'
import Nav from './nav'
import Image from 'next/image'

const handleClick = (e) => {
    document.getElementById("header").classList.toggle(styles.active);
    document.getElementById("hamburger").classList.toggle(styles.active);
}

const Header = (props) => (
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

            <Nav currentPage={props.currentPage} />

            <ul id="hamburger" className="hamburger" onClick={handleClick}>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </header >
)

export default Header
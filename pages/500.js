import { useRouter } from 'next/router';
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'

export async function getStaticProps() {
    const currentPage = "500 - Internal Server Error "

    return {
        props: {
            currentPage,
        },
    }
}

function About(props) {
    const router = useRouter();
    return (
        <>
            <Meta title="500 - Internal Server Error " />

            <Header menu={props.menu} currentPage={props.post.slug} className="" />

            <section className="section">
                <h1 className="title">500 - Internal Server Error </h1>
            </section>

            <section className="wrapper">
                <p>Sorry no dice.</p>

            </section>

            <Footer menu={props.menu} currentPage={props.post.slug}></Footer>
        </>
    )
}

export default About
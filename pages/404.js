import { useRouter } from 'next/router';
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'

export async function getStaticProps() {
    const currentPage = "404 - Page Not Found"

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
            <Meta title="404 - Page Not Found" />

            <Header currentPage="about" />

            <section className="section">
                <h1 className="title">404 - Page Not Found</h1>
            </section>

            <section className="wrapper">
                <p>Sorry no dice.</p>

            </section>

            <Footer currentPage="about"></Footer>
        </>
    )
}

export default About
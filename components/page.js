import Header from 'components/header'
import Footer from 'components/footer'
import Meta from 'components/meta'

function Page(props) {
    // debugger

    return (
        <>
            <Meta title={props.post.title} />

            <Header menus={props.menus} currentPage={props.post.slug} />

            <div className={"page " + props.post.slug}>

                <div className="wrapper">
                    <section>
                        <h1 className="title">{props.post.title}</h1>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: props.post.content
                            }}></div>
                    </section>
                </div>

            </div>

            <Footer menus={props.menus} currentPage={props.post.slug}></Footer>
        </>
    )
}


export default Page
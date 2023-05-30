import Feed from '@components/Feed'

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-cen
            ">
                Discover & Share
                <br className="max-md:hidden"></br>
                <span className="blue_gradient text-center">AI-Powered Prompts</span>
            </h1>
            <p className="desc text-center">
                PromptHub is an open-source AI prompting tool for discoving and sharing creative prompts
            </p>
            <Feed></Feed>
        </section>
    )
}
export default Home
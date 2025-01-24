
export default function NewsLater() {
    return (
        <div className="w-full p-10 bg-gray-500 bg-opacity-20 backdrop-blur-lg">
            <section className="container space-y-4 flex gap-6 items-center">
                <div className="w-3/12 flex flex-col text-justify">
                    <h2 className="font-semibold text-xl">Subscribe to our newslater for more updates!</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minus tempore quia at repudiandae est incidunt ullam dolore dolores id.</p>
                </div>
                <div className="w-7/12">
                    <input type='text' className="w-full p-4 rounded-lg focus:outline-none" placeholder="Your Email..."/>
                </div>
                <div className="2/12">
                    <button className="bg-black rounded-lg p-4 px-10 text-white">Submit</button>
                </div>
            </section>
        </div>
    )
}

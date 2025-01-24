import Events from './landing/Events'
import Gallery from './landing/Gallery'
import Giving from './landing/Giving'
import Hero from './landing/Hero'
import NewsLater from './landing/NewsLatter'
import Visit from './landing/Visit'

const Landing = () => {
  return (
    <div>
      <Hero />
      <Visit />
      <Gallery />
      <Events />
      <Giving />
      <NewsLater />
    </div>
  )
}

export default Landing
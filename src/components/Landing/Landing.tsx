import Events from './landing/Events'
import Gallery from './landing/Gallery'
import Giving from './landing/Giving'
import Hero from './landing/Hero'
import Visit from './landing/Visit'

const Landing = () => {
  return (
    <div>
      <Hero />
      <Visit />
      <Gallery />
      <Events />
      <Giving />
    </div>
  )
}

export default Landing
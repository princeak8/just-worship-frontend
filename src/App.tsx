import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Nav from "./components/Navs/Nav"
import Landing from "./components/Landing/Landing"
import Footer from "./components/Navs/Footer"

const App = () => {
  return (
    <section>
      <Nav />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </section>
  )
}

export default App

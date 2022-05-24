import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import BottomNav from './Components/BottomNav'
import Footer from './Components/Footer'
import SearchModal from './Components/Modals/SearchModal'
import Navbar from './Components/Navbar'
import ScrollToTop from './Components/ScrollToTop'
import { MovieProvider } from './Contexts/MovieContext'
import { Routes } from './Routes/Routes'

export default function App() {
  const [showModal, setShowModal] = useState(false)

  const showSearchModal = () => {
    setShowModal(!showModal)
  }

  return (
    <Router>
      <MovieProvider>
        <Navbar />
      </MovieProvider>
      <ScrollToTop>
        <Routes />
      </ScrollToTop>
      <BottomNav showSearchModal={showSearchModal} />
      <SearchModal showModal={showModal} showSearchModal={showSearchModal} setShowModal={setShowModal} />
      <Footer />
    </Router>
  )
}

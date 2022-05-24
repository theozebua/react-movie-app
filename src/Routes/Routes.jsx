import { Route, Routes as WebRoutes } from 'react-router-dom'
import { CastProvider } from '../Contexts/CastContext'
import { MovieProvider } from '../Contexts/MovieContext'
import Cast from '../Pages/Cast'
import Home from '../Pages/Home'
import Movie from '../Pages/Movie'
import Movies from '../Pages/Movies'
import Search from '../Pages/Search'

export const Routes = () => {
  return (
    <WebRoutes>
      <Route
        path='/'
        element={
          <MovieProvider>
            <Home />
          </MovieProvider>
        }
      />
      <Route path='/about' element={<Home />} />
      <Route path='/contact' element={<Home />} />
      <Route path='/terms-and-conditions' element={<Home />} />
      <Route path='/privacy-and-policy' element={<Home />} />
      <Route
        path='movies/:category'
        element={
          <MovieProvider>
            <Movies />
          </MovieProvider>
        }
      />
      <Route
        path='/movie/:id/:slug'
        element={
          <MovieProvider>
            <Movie />
          </MovieProvider>
        }
      />
      <Route
        path='/cast/:id/:name'
        element={
          <CastProvider>
            <Cast />
          </CastProvider>
        }
      />
      <Route
        path='/search'
        element={
          <MovieProvider>
            <Search />
          </MovieProvider>
        }
      />
    </WebRoutes>
  )
}

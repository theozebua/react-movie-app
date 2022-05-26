import { createContext, useState } from 'react'

const MovieContext = createContext()

export const MovieProvider = ({ children }) => {
  /** All Movies */
  const [popular, setPopular] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [topRated, setTopRated] = useState([])
  /** All Movies */

  /** Individual Movie */
  const [movie, setMovie] = useState({})
  const [casts, setCasts] = useState([])
  const [similar, setSimilar] = useState([])
  const [recommendations, setRecommendations] = useState([])
  /** Individual Movie */

  const fetchMoviesByCategory = async (category, page = 1) => {
    const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    const res = await fetch(url)
    const data = await res.json()

    // eslint-disable-next-line
    switch (category) {
      case 'popular':
        setPopular(data.results)
        break
      case 'upcoming':
        setUpcoming(data.results)
        break
      case 'now_playing':
        setNowPlaying(data.results)
        break
      case 'top_rated':
        setTopRated(data.results)
        break
    }

    return data.results
  }

  const fetchMovie = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    const res = await fetch(url)
    const movie = await res.json()

    setMovie(movie)
  }

  const fetchMoviesByCategoryAndId = async (category, id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/${category}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    const res = await fetch(url)
    const data = await res.json()

    // eslint-disable-next-line
    switch (category) {
      case 'similar':
        setSimilar(data.results)
        break
      case 'recommendations':
        setRecommendations(data.results)
        break
    }
  }

  const fetchCasts = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    const res = await fetch(url)
    const data = await res.json()

    setCasts(data.cast)
  }

  const fetchMoviesBySearch = async (search, page) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`
    const res = await fetch(url)
    const data = await res.json()

    return data.results
  }

  const fetchTrailerByMovieId = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    const res = await fetch(url)
    const data = await res.json()

    return data.results.filter((trailer) => trailer.site === 'YouTube' && trailer.type === 'Trailer')[0]
  }

  const fetchReviewsByMovieId = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    const res = await fetch(url)
    const data = await res.json()

    return data.results
  }

  return (
    <MovieContext.Provider
      value={{ popular, upcoming, nowPlaying, topRated, movie, similar, recommendations, casts, fetchMoviesByCategory, fetchMovie, fetchMoviesByCategoryAndId, fetchCasts, fetchMoviesBySearch, fetchTrailerByMovieId, fetchReviewsByMovieId }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export default MovieContext

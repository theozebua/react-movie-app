import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Components/Card'
import Loading from '../Components/Loading'
import MovieContext from '../Contexts/MovieContext'

export default function Movies() {
  const { fetchMoviesByCategory } = useContext(MovieContext)

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const { category } = useParams()

  const observer = useRef()
  const lastMovieElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [hasMore]
  )

  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchMoviesByCategory(category, page)
      setMovies((prevMovies) => {
        return [...prevMovies, ...movies]
      })
      setHasMore(movies.length > 0)
      setLoading(false)
    }

    getMovies()
  }, [page])
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='container mx-auto mt-24 p-4'>
          <header className='mb-8 lg:mb-12'>
            <h1 className='mb-2 text-center text-3xl lg:text-left lg:text-5xl'>
              {category == 'popular' && 'Popular'}
              {category == 'upcoming' && 'Upcoming'}
              {category == 'now_playing' && 'Now Playing'}
              {category == 'top_rated' && 'Top Rated'} Movies
            </h1>
            <p className='text-md text-center leading-relaxed text-slate-50/90 lg:text-left lg:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, nemo?</p>
          </header>
          <div className='grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-4 xl:grid-cols-5'>
            {movies.map((movie, i) => {
              if (movies.length === i + 1) {
                return <Card key={i} movie={movie} isAllMovies={true} reference={lastMovieElementRef} />
              } else {
                return <Card key={i} movie={movie} isAllMovies={true} />
              }
            })}
          </div>
        </div>
      )}
    </>
  )
}

import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import Card from '../Components/Card'
import Loading from '../Components/Loading'
import MovieContext from '../Contexts/MovieContext'

export default function Search() {
  const { fetchMoviesBySearch } = useContext(MovieContext)

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [searchParams] = useSearchParams()
  const location = useLocation()

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

  const getMovies = async () => {
    const movies = await fetchMoviesBySearch(searchParams.get('s'), page)
    if (movies === undefined) {
      setMovies([])
      setLoading(false)
    } else {
      setMovies((prevMovies) => {
        return [...prevMovies, ...movies]
      })
      setLoading(false)
    }
    setHasMore(movies.length > 0)
  }

  useEffect(() => {
    setLoading(true)
    setMovies([])
    setPage(1)
  }, [location.search])

  useEffect(() => {
    getMovies()
  }, [page, location.search])
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='container mx-auto mt-24 mb-12 p-4'>
          <header className='mb-8 lg:mb-12'>
            <h1 className='mb-2 text-center text-3xl lg:text-left lg:text-5xl'>Results for : {searchParams.get('s')}</h1>
            <p className='text-md text-center leading-relaxed text-slate-50/90 lg:text-left lg:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, nemo?</p>
          </header>
          {movies.length !== 0 ? (
            <div className='grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-4 xl:grid-cols-5'>
              {movies.map((movie, i) => {
                if (movies.length === i + 1) {
                  return <Card key={i} movie={movie} isAllMovies={true} reference={lastMovieElementRef} />
                } else {
                  return <Card key={i} movie={movie} isAllMovies={true} />
                }
              })}
            </div>
          ) : (
            <div className='rounded-md bg-neutral-900 p-4'>No movies found</div>
          )}
        </div>
      )}
    </>
  )
}

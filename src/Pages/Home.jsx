import { useContext, useEffect, useState } from 'react'
import Container from '../Components/Card/Container'
import Loading from '../Components/Loading'
import MovieContext from '../Contexts/MovieContext'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { popular, upcoming, nowPlaying, topRated, fetchMoviesByCategory } = useContext(MovieContext)

  useEffect(() => {
    const getMovies = async () => {
      await fetchMoviesByCategory('popular')
      await fetchMoviesByCategory('upcoming')
      await fetchMoviesByCategory('now_playing')
      await fetchMoviesByCategory('top_rated')
      setLoading(false)
    }

    getMovies()
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section>
            {/* Hero Section */}
            <div className='container mx-auto mt-24 mb-12 p-4'>
              <h1 className='mb-2 text-center text-3xl lg:text-left lg:text-5xl'>Welcome to the React Movie App</h1>
              <p className='text-md mb-4 text-center leading-relaxed text-slate-50/90 lg:text-left lg:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, illo.</p>
            </div>
          </section>
          {/* Hero Section */}

          <div className='flex flex-col gap-16 lg:container lg:mx-auto'>
            {/* Popular Section */}
            <Container label='Popular' category='popular' movies={popular} viewAll={true} />
            {/* Popular Section */}

            {/* Upcoming Section */}
            <Container label='Upcoming' category='upcoming' movies={upcoming} viewAll={true} />
            {/* Upcoming Section */}

            {/* Now Playing Section */}
            <Container label='Now Playing' category='now_playing' movies={nowPlaying} viewAll={true} />
            {/* Now Playing Section */}

            {/* Top Rated Section */}
            <Container label='Top Rated' category='top_rated' movies={topRated} viewAll={true} />
            {/* Top Rated Section */}
          </div>
        </>
      )}
    </>
  )
}

import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icon from '@fortawesome/free-solid-svg-icons'
import Container from '../Components/Card/Container'
import Loading from '../Components/Loading'
import Casts from '../Components/Movie/Casts'
import Badge from '../Components/Movie/Badge'
import Heading from '../Components/Movie/Heading'
import MovieContext from '../Contexts/MovieContext'
import { useParams } from 'react-router-dom'

export default function Movie() {
  const {
    movie,
    similar,
    recommendations,
    casts,
    fetchMovie,
    fetchMoviesByCategoryAndId,
    fetchCasts,
    fetchTrailerByMovieId,
    fetchReviewsByMovieId
  } = useContext(MovieContext)

  const [loading, setLoading] = useState(true)
  const [trailer, setTrailer] = useState({})
  const [reviews, setReviews] = useState([])

  const { id } = useParams()

  const handleShowMore = (e) => {
    let showMore = e.target.getAttribute('data-showmore') === 'true'
    setReviews(
      reviews.map((review) =>
        review.id === e.target.id ? { ...review, showMore: !showMore } : review
      )
    )
  }

  useEffect(() => {
    setLoading(true)
    const getMovie = async () => {
      await fetchMovie(id)
      await fetchMoviesByCategoryAndId('similar', id)
      await fetchMoviesByCategoryAndId('recommendations', id)
      await fetchCasts(id)
      setLoading(false)
    }

    const getTrailer = async () => {
      const trailer = await fetchTrailerByMovieId(id)
      setTrailer(trailer)
    }

    const getReviews = async () => {
      const reviews = await fetchReviewsByMovieId(id)
      setReviews(reviews.map((review) => ({ ...review, showMore: false })))
    }

    getMovie()
    getTrailer()
    getReviews()
    // eslint-disable-next-line
  }, [id])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='relative -z-10'>
            {movie.backdrop_path && (
              <img
                className='max-h-max w-full object-cover'
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
              />
            )}
            <div className='absolute top-0 left-0 h-full w-full bg-gradient-to-b from-black/60 to-black'></div>
          </div>
          <div
            className={`container mx-auto flex flex-col gap-8 p-4 lg:gap-16 ${
              movie.backdrop_path ? '-mt-16 md:-mt-28 lg:-mt-96' : 'mt-24'
            }`}>
            <div className={`${movie.poster_path && 'lg:flex lg:gap-10'}`}>
              <div className='hidden lg:block lg:w-full lg:max-w-md'>
                {movie.poster_path && (
                  <img
                    className='rounded-lg transition-all duration-200 hover:brightness-75'
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
              </div>
              <div className='flex flex-col gap-8 lg:gap-16'>
                <section>
                  <h1 className='mb-2 text-2xl md:mb-4 md:text-6xl'>
                    {movie.title}
                  </h1>
                  {movie.tagline && (
                    <span className='block text-xs md:text-xl'>
                      &ldquo; {movie.tagline} &rdquo;
                    </span>
                  )}
                </section>

                <section>
                  <Heading text={'Rating'} />
                  <FontAwesomeIcon
                    icon={Icon.faStar}
                    className='mr-1 text-yellow-400'
                  />
                  <span>
                    {movie.vote_average.toFixed(1)}{' '}
                    <small className='text-slate-50/75'>/ 10</small>
                  </span>
                </section>

                <section>
                  <Heading text={'Overview'} />
                  <small className='text-sm'>{movie.overview}</small>
                </section>
              </div>
            </div>

            {movie.genres.length !== 0 && (
              <section>
                <Heading text={'Genres'} />
                <div className='flex flex-wrap gap-3'>
                  {movie.genres.map((genre, i) => (
                    <Badge
                      key={i}
                      item={genre}
                    />
                  ))}
                </div>
              </section>
            )}

            <section>
              <Heading text={'Release Date'} />
              <span className='text-sm'>
                {moment(movie.release_date).format('MMMM Do YYYY')}{' '}
                {movie.status !== 'Released' && `( ${movie.status} )`}
              </span>
            </section>

            {movie.production_companies.length !== 0 && (
              <section>
                <Heading text={'Production Companies'} />
                <div className='flex flex-wrap gap-3'>
                  {movie.production_companies.map((company, i) => (
                    <Badge
                      key={i}
                      item={company}
                    />
                  ))}
                </div>
              </section>
            )}

            {trailer !== undefined && trailer.key !== undefined && (
              <iframe
                className='aspect-video rounded-md'
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title='YouTube video player'
                frameBorder={'0'}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen></iframe>
            )}

            {casts.length !== 0 && (
              <section>
                <Heading text={'Casts'} />
                <div className='flex snap-x gap-2 overflow-x-auto pb-4'>
                  {casts.map(
                    (cast, i) =>
                      cast.profile_path && (
                        <Casts
                          key={i}
                          cast={cast}
                        />
                      )
                  )}
                </div>
              </section>
            )}

            {reviews.length > 0 && (
              <section className='mt-4'>
                <Heading text={'Reviews'} />
                <div className='flex flex-col gap-12'>
                  {reviews.slice(0, 5).map((review, i) => (
                    <div key={i}>
                      <div className='mb-2 flex gap-2'>
                        <FontAwesomeIcon icon={Icon.faUser} />
                        <h5 className='mb-1 text-sm'>{review.author}</h5>
                      </div>
                      <p className='text-xs'>
                        {review.showMore
                          ? review.content
                          : review.content.substring(0, 350)}{' '}
                        {!review.showMore && '...'}{' '}
                        <button
                          className='text-blue-400'
                          id={review.id}
                          data-showmore={review.showMore}
                          onClick={handleShowMore}>
                          [Show {!review.showMore ? 'more' : 'less'}]
                        </button>
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <hr />

            <section>
              {similar.length > 0 && (
                <Container
                  label='Similar Movies'
                  movies={similar}
                />
              )}
            </section>

            <section>
              {recommendations.length > 0 && (
                <Container
                  label='Recommendations'
                  movies={recommendations}
                />
              )}
            </section>
          </div>
        </>
      )}
    </>
  )
}

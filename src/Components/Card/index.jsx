import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icon from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { slugify } from '../../Helpers/slugify'

export default function Card({ movie, isAllMovies, reference }) {
  return (
    <Link ref={reference} to={`/movie/${movie.id}/${slugify(movie.title)}`} className={`relative w-full shrink-0 snap-center overflow-hidden rounded-md bg-neutral-900 pb-2 md:max-w-[14rem] ${!isAllMovies && 'max-w-[14rem]'}`}>
      <div>
        <img
          className='mb-2 h-full w-full object-cover transition-all duration-200 hover:brightness-75'
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/400x600/404040?text=Image+not+found'}
          alt={movie.title}
        />
        <span className='block p-2 font-semibold'>{movie.title}</span>
      </div>
      <div className='absolute top-0 right-0 rounded-bl-md bg-black/50 p-1'>
        <FontAwesomeIcon icon={Icon.faStar} className='mr-1 text-yellow-400' />
        <span>{movie.vote_average.toFixed(1)}</span>
      </div>
    </Link>
  )
}

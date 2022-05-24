import React from 'react'
import { Link } from 'react-router-dom'
import { slugify } from '../../Helpers/slugify'

export default function Casts({ cast }) {
  return (
    <div className='w-3/4 max-w-[14rem] shrink-0 snap-center overflow-hidden rounded-md bg-neutral-900 pb-2'>
      <Link to={`/cast/${cast.id}/${slugify(cast.name)}`}>
        <div className='mb-3'>
          <img className='h-full w-full object-cover transition-all duration-200 hover:brightness-75' src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
        </div>
        <div className='px-2'>
          <span className='mb-3 block font-semibold'>{cast.name}</span>
          <span className='mb-2 block text-sm'>as : {cast.character}</span>
        </div>
      </Link>
    </div>
  )
}

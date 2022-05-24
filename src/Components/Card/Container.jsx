import { Link } from 'react-router-dom'
import Card from '.'

export default function Container({ label, category, movies, viewAll }) {
  return (
    <section>
      <div className='mb-4 flex items-center justify-between px-2 xl:px-0'>
        <h3 className='text-xl lg:text-2xl'>{label}</h3>
        {viewAll && (
          <Link to={`/movies/${category}`} className='rounded-full border border-slate-50 px-3 py-1 text-xs lg:text-sm'>
            View All
          </Link>
        )}
      </div>
      <div className='flex snap-x gap-2 overflow-x-auto px-2 pb-4 xl:px-0'>
        {movies.map((movie, i) => (
          <Card key={i} movie={movie} />
        ))}
      </div>
    </section>
  )
}

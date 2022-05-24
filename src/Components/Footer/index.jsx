import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='mt-16 bg-neutral-900/80 pt-6 pb-16 lg:pb-4'>
      <div className='container mx-auto px-4 py-2'>
        <h1 className='mb-3 text-2xl'>React Movie App</h1>
        <div className='grid gap-8 pt-4 md:grid-cols-3'>
          <div className='flex flex-col gap-2'>
            <Link to={'/'}>Home</Link>
            <Link to={'#'}>About</Link>
            <Link to={'#'}>Contact</Link>
          </div>
          <div className='flex flex-col gap-2'>
            <Link to={'#'}>Terms &amp; Conditions</Link>
            <Link to={'#'}>Privacy &amp; Policy</Link>
          </div>
          <div className='flex flex-col gap-2'>
            <a href='https://www.themoviedb.org/' target='_blank' rel='noopener noreferrer'>
              TMDB
            </a>
            <a href='https://developers.themoviedb.org/3/getting-started/introduction' target='_blank' rel='noopener noreferrer'>
              TMDB API
            </a>
          </div>
        </div>
        <div className='mt-14 flex flex-col gap-2 md:flex-row md:justify-between'>
          <span className='text-center'>&copy; {new Date().getFullYear()} React Movie App. All rights reserved.</span>
          <span className='text-center'>
            Powered By{' '}
            <a href='https://theozebua.com' target='_blank' rel='noopener noreferrer'>
              theozebua.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

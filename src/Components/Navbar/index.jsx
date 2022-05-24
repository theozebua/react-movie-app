import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icon from '@fortawesome/free-solid-svg-icons'
import Logo from '../../Assets/logo.svg'

export default function Navbar() {
  const [topDistance, setTopDistance] = useState(0)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate({ pathname: '/search', search: `?s=${q}` }, { replace: true, state: { q } })
    setQ('')
  }

  window.addEventListener('scroll', () => setTopDistance(window.scrollY))

  return (
    <nav className={`absolute top-0 left-0 z-50 w-full transition-all duration-300 lg:fixed ${topDistance > 0 && 'lg:bg-neutral-900/50 lg:backdrop-blur-md'}`}>
      <div className='container mx-auto flex items-center justify-center p-4 lg:justify-between'>
        <div className='flex items-center gap-2'>
          <img className='w-6 animate-spin-slow' src={Logo} alt='logo' />
          <span className='text-2xl'>React Movie App</span>
        </div>
        <form onSubmit={handleSearch} className='hidden lg:block lg:max-w-lg lg:flex-grow'>
          <div className='flex overflow-hidden rounded-full border border-transparent bg-neutral-900/70 transition-all duration-200 focus-within:border-blue-400'>
            <input
              className='w-full bg-transparent py-2 px-5 focus-within:outline-none'
              type='search'
              name='s'
              placeholder='Search...'
              aria-placeholder='Search...'
              autoComplete='off'
              required
              aria-required={true}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className='px-4'>
              <FontAwesomeIcon icon={Icon.faSearch} size='lg' />
            </button>
          </div>
        </form>
        <div className='hidden text-lg lg:flex lg:gap-10'>
          <Link to={'/'}>Home</Link>
          <Link to={'#'}>About</Link>
          <Link to={'#'}>Contact</Link>
        </div>
      </div>
    </nav>
  )
}

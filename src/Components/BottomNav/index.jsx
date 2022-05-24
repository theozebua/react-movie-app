import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icon from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function BottomNav({ showSearchModal }) {
  return (
    <nav className='fixed bottom-0 z-40 w-full rounded-t-3xl bg-neutral-900/70 backdrop-blur-md lg:hidden'>
      <div className='container flex justify-around p-3'>
        <Link to='/'>
          <FontAwesomeIcon icon={Icon.faHouse} size='xl' />
        </Link>
        <label htmlFor='search' className='cursor-pointer' onClick={() => showSearchModal()}>
          <FontAwesomeIcon icon={Icon.faMagnifyingGlass} size='xl' />
        </label>
      </div>
    </nav>
  )
}

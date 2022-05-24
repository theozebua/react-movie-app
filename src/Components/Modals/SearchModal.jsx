import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icon from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchModal({ showModal, showSearchModal, setShowModal }) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate({ pathname: '/search', search: `?s=${q}` }, { replace: true, state: { q } })
    setQ('')
    setShowModal(false)
  }

  return (
    <div className={`fixed top-0 left-0 bottom-0 z-50 w-full bg-neutral-900/70 transition-all duration-700 lg:hidden ${showModal ? 'translate-y-0' : '-translate-y-full'}`}>
      <form onSubmit={handleSearch} className='relative flex h-full flex-col items-center justify-center px-8'>
        <div className='flex w-full max-w-lg rounded-full border border-transparent bg-neutral-900/70 backdrop-blur-md transition-all duration-200 focus-within:border-blue-400'>
          <input
            className='w-full bg-transparent py-2 px-5 focus-within:outline-none'
            type='search'
            name='s'
            id='search'
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
        <button type='button' className='absolute bottom-16 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900/70 backdrop-blur-md' onClick={() => showSearchModal()}>
          <FontAwesomeIcon icon={Icon.faClose} size='lg' />
        </button>
      </form>
    </div>
  )
}

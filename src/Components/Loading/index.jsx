import Logo from '../../Assets/logo.svg'

export default function Loading() {
  return (
    <div className='fixed top-0 left-0 z-50 grid h-full w-full place-items-center bg-black'>
      <div className='flex flex-col items-center gap-3'>
        <img className='w-20 animate-spin-slow' src={Logo} alt='logo' />
        <span className='text-2xl'>Loading...</span>
      </div>
    </div>
  )
}

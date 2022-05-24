import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import Loading from '../Components/Loading'
import Heading from '../Components/Movie/Heading'
import CastContext from '../Contexts/CastContext'

export default function Cast() {
  const { cast, fetchCast } = useContext(CastContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCast = async () => {
      await fetchCast()
      setLoading(false)
    }

    getCast()
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section>
            <div className='container mx-auto mt-24 p-4'>
              <div className='flex flex-col md:flex-row md:gap-10'>
                <div className='w-full md:min-w-[14rem] md:max-w-[14rem]'>
                  <img className='mx-auto mb-4 w-full rounded-lg transition-all duration-200 hover:brightness-75' src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
                </div>
                <div className='flex flex-col gap-8'>
                  <div>
                    <h1 className='text-2xl md:text-6xl'>{cast.name}</h1>
                  </div>
                  {cast.birthday && (
                    <div>
                      <Heading text={'Birth Day'} />
                      <span className='text-sm'>{moment(cast.birthday).format('MMMM Do YYYY')}</span>
                    </div>
                  )}
                  {cast.place_of_birth && (
                    <div>
                      <Heading text={'Place of Birth'} />
                      <span className='text-sm'>{cast.place_of_birth}</span>
                    </div>
                  )}
                  {cast.biography != '' && (
                    <div>
                      <Heading text={'Biography'} />
                      <p className='text-sm'>{cast.biography}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}

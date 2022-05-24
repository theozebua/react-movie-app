import { createContext, useState } from 'react'
import { useParams } from 'react-router-dom'

const CastContext = createContext()

export const CastProvider = ({ children }) => {
  const [cast, setCast] = useState({})
  const params = useParams()

  const fetchCast = async () => {
    const url = `https://api.themoviedb.org/3/person/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    const res = await fetch(url)
    const cast = await res.json()

    setCast(cast)
  }

  return <CastContext.Provider value={{ cast, fetchCast }}>{children}</CastContext.Provider>
}

export default CastContext

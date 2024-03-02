import { useRef, useState, useMemo, useCallback } from 'react'
import { fetchDataPublicaciones } from '../services/apiPublicaciones.js'
import dotenv from 'dotenv';

export function usePublicaciones () {
  const [publicaciones, setPublicaciones] = useState([])
  const [loading, setLoading] = useState(false)
  
  const getPublicaciones = useCallback(async ({ query,pagination }) => {
    // if (query === previousQuery.current) return
    // query es ''    
    try {
      setLoading(true)      
      const newPublicaciones = await fetchDataPublicaciones({ query,pagination })
      setPublicaciones(newPublicaciones)
    } catch (e) {
      setError(e.message)
    } finally {      
      setLoading(false)
    }
  }, [])  
  
  return { publicaciones,getPublicaciones, loading }
}
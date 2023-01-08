import { AnimatePresence, motion } from 'framer-motion'
import ResultItem from './ResultItem'
import useSWR from 'swr'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import tinykeys from 'tinykeys'
import GlobalContext from '../contexts/global'
import { satoshiFont } from '../pages'

//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json())

export default function Search() {
  const [token, setToken] = useState()
  const [resultsList, setResultsList] = useState([])
  const [loading, setLoading] = useState(false)
  const field = useRef<HTMLInputElement>(null)
  const {
    state: { search },
    dispatch,
  } = useContext(GlobalContext)
  let t: any
  useEffect(() => {
    const getToken = async () => {
      try {
        const {
          data: { access_token },
        } = await axios.get('/api/token')
        setToken(access_token)
      } catch (e) {
        console.log('An error occured, sorry :(')
      }
    }
    getToken()
    tinykeys(window, {
      '$mod+KeyK': (e) => {
        e.preventDefault()
        dispatch({ type: 'set-search', payload: true })
        setTimeout(() => field?.current?.focus(), 500)
      },
      'Escape': () => {
        dispatch({ type: 'set-search', payload: false })
        setResultsList([])
      },
    })
  }, [])
  useEffect(() => {
    if (!search) {
      setResultsList([])
    }
  }, [search])
  const handleSearch = async (query: string) => {
    clearTimeout(t)
    t = setTimeout(async () => {
      if (query.length) {
        try {
          setLoading(true)

          const {
            data: { results },
          } = await axios.post('/api/search', {
            query,
            token,
          })
          setResultsList(results)
          setLoading(false)
        } catch (e) {
          console.log('An error occured while searching', e)
        }
      } else {
        setResultsList([])
      }
    }, 500)
  }
  return (
    <>
      <AnimatePresence>
        {search && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center"
          >
            <div className="relative xs:w-[90%] md:w-half">
              <input
                ref={field}
                tabIndex={0}
                placeholder="Search an artist or an album"
                className={`font-sans bg-dark-800 w-full border-none focus:outline-none px-6 py-4 outline-none appearance-none text-white text-lg box-border ${satoshiFont.className}`}
                type="text"
                onInput={(e) => handleSearch(e.currentTarget.value)}
                onBlur={() => dispatch({ type: 'set-search', payload: false })}
              />
              {loading && (
                <motion.span
                  initial={{
                    rotate: 0,
                    y: '-50%',
                  }}
                  animate={{
                    rotate: 360,
                    y: '-50%',
                  }}
                  transition={{
                    duration: 4,
                    loop: Infinity,
                    ease: 'linear',
                  }}
                  className="i-carbon-circle-dash text-white absolute right-6 top-[50%] translate-y-[-50%]"
                ></motion.span>
              )}
            </div>
            <div className=" xs:w-[90%] md:w-half xs:h-[80vh] h-[50vh] overflow-scroll">
              {resultsList.map((result: any, i) => (
                <ResultItem
                  key={i}
                  cover_url={result.album.images[0].url}
                  label={result.album.name}
                  link={result.external_urls.spotify}
                  artist={result.artists[0].name}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import Head from 'next/head'
import Search from '../components/Search'
import Cover from '../components/Cover'
import { isDesktop, isMacOs, isMobile, isTablet } from 'react-device-detect'
import { useContext, useEffect, useState } from 'react'
import GlobalContext from '../contexts/global'
export default function Home() {
  const [key, setKey] = useState('')
  const [message, setMessage] = useState('')
  const { dispatch } = useContext(GlobalContext)

  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: 'set-window',
        payload: {
          isTablet: window.innerWidth >= 600 && window.innerWidth < 959,
          isMobile: window.innerWidth < 600,
          width: window.innerWidth,
          height: window.innerHeight,
        },
      })
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch])
  useEffect(() => {
    isMacOs ? setKey('⌘') : setKey('CTRL')
    isDesktop
      ? setMessage(`${key} + K to search your own favorite album cover`)
      : setMessage('Tap to search your own favorite album cover')
  }, [key])
  const handleClick = () => {
    dispatch({ type: 'set-search', payload: true })
  }

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Sample a color palette from your favorite movie/album cover"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>7️⃣</text></svg>"
        />
        <title>Genuary 7, 2023 - Alban Bleicher</title>
      </Head>
      <main className={`bg-[#0A0908] text-white overflow-hidden h-full font-sans `}>
        <div className="flex flex-col justify-center items-center w-full h-full space-y-5 text-center">
          <span onClick={handleClick} className="text-white/30 text-xs text-center">
            {message}
          </span>
          <Cover />
          <div className="flex flex-col justify-center items-center text-white/30 text-xs">
            <span>Genuary 7, 2023</span>
            <span>"Sample a color palette from your favorite movie/album cover"</span>
          </div>
        </div>
        <Search />
      </main>
    </>
  )
}

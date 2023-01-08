import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/uno.css'
import { GlobalProvider } from '../contexts/global'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )
}

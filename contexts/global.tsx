import { createContext, Dispatch, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
type TCover = {
  label?: string
  url?: string
  link?: string
  artist?: string
}
type TState = {
  window: TWindow
  cover: TCover
  search: boolean
}

type TAction =
  | { type: 'set-window'; payload: TWindow }
  | { type: 'set-cover'; payload: TCover }
  | { type: 'set-search'; payload: boolean }

type TWindow = {
  isMobile: boolean
  isTablet: boolean
  width: number
  height: number
}

const initialState: TState = {
  window: {
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
  },
  cover: {
    url: 'https://cdns-images.dzcdn.net/images/cover/6d9bd79e4e23acf0510dba11aae5d497/500x500.jpg',
    label: 'evil twin',
    link: 'https://open.spotify.com/album/0veq4sEuFjopH21yI3u7QH?si=6Uu2ZLcbSMmgcAh0OPbKFA',
    artist: 'Isaac Dunbar',
  },
  search: false,
}

const GlobalContext = createContext<{
  state: TState
  dispatch: Dispatch<TAction>
}>({
  state: initialState,
  dispatch: () => {},
})

const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case 'set-window':
      return { ...state, window: action.payload }
    case 'set-cover':
      return { ...state, cover: action.payload }
    case 'set-search':
      return { ...state, search: action.payload }

    default:
      return state
  }
}

export const GlobalProvider = ({ children }: { children: JSX.Element }) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  useEffect(() => {}, [router])

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const GlobalConsumer = GlobalContext.Consumer
export default GlobalContext

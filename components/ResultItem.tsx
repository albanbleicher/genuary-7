import { useContext } from 'react'
import GlobalContext from '../contexts/global'

type ResultItemProps = {
  cover_url: string
  label: string
  complement?: string
  link?: string
  artist?: string
}
export default function ResultItem({
  cover_url,
  label,
  complement,
  link,
  artist,
}: ResultItemProps) {
  const { dispatch } = useContext(GlobalContext)
  const handleSelect = () => {
    dispatch({
      type: 'set-cover',
      payload: {
        label,
        url: cover_url,
        link,
        artist,
      },
    })
    dispatch({ type: 'set-search', payload: false })
  }
  return (
    <div
      onClick={handleSelect}
      className="bg-dark-700 w-full flex space-x-3  items-center transition cursor-pointer hover:bg-dark-800"
    >
      <img className="w-20 h-20 block" src={cover_url} alt={label} />
      <span className="text-white  flex justify-between w-full pl-2 pr-4">
        {label} {artist && <span className="text-white/50 text-sm"> {artist}</span>}
      </span>
    </div>
  )
}

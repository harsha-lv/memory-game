import { useEffect, useState } from 'react'
import { displayName, fallbackImage } from '../fallbackImage'

const GIPHY_KEY = import.meta.env.VITE_GIPHY_API_KEY ?? 'oRtsm3EEAhW2u5z0WFtXrQJYp2FYmVCe'

function generateUrl(name) {
  const query = `${displayName(name)} resident evil`
  return `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_KEY}&s=${encodeURIComponent(query)}`
}

function gifUrlFromResponse(payload) {
  const images = payload?.data?.images
  return images?.fixed_height?.url ?? images?.downsized?.url ?? images?.original?.url ?? ''
}

function Card({ name, onSelect, disabled }) {
  const label = displayName(name)
  const [image, setImage] = useState({ name: null, src: '', error: false })

  useEffect(() => {
    let ignore = false

    async function loadGif() {
      try {
        const res = await fetch(generateUrl(name))
        if (!res.ok) throw new Error('Unable to load GIF')

        const cardData = await res.json()
        const url = gifUrlFromResponse(cardData)
        if (!url) throw new Error('No GIF found')
        if (!ignore) setImage({ name, src: url, fallback: false })
      } catch {
        if (!ignore) setImage({ name, src: fallbackImage(name), fallback: true })
      }
    }

    loadGif()
    return () => {
      ignore = true
    }
  }, [name])

  const cardSrc = image.name === name ? image.src : ''
  const usingFallback = image.name === name && image.fallback

  function handleImageError() {
    if (usingFallback) return
    setImage({ name, src: fallbackImage(name), fallback: true })
  }

  return (
    <button
      type="button"
      className="card"
      onClick={onSelect}
      disabled={disabled}
      aria-label={`Select ${label}`}
    >
      {cardSrc && (
        <img
          src={cardSrc}
          alt=""
          className={usingFallback ? 'fallback-still' : undefined}
          onError={handleImageError}
        />
      )}
      {!cardSrc && !usingFallback && <div>Loading {label}…</div>}
      <div>{label}</div>
    </button>
  )
}

export default Card

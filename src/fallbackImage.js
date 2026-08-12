const stills = import.meta.glob('./images/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
})

const FILE_ALIASES = {
  'mr x': 'x',
  'lady dimitrescu': 'lady',
}

export function displayName(name) {
  return name.replace(/\s*resident evil\s*/gi, ' ').replace(/\s+/g, ' ').trim()
}

export function fallbackImage(name) {
  const label = displayName(name).toLowerCase()
  const parts = label.split(' ')
  const slugs = [FILE_ALIASES[label], parts.join('-'), parts[0], parts.at(-1)].filter(Boolean)

  for (const slug of slugs) {
    const src = stills[`./images/${slug}.jpg`] ?? stills[`./images/${slug}.jpeg`] ?? stills[`./images/${slug}.png`]
    if (src) return src
  }

  return ''
}

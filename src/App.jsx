import { useReducer } from 'react'
import Card from './components/card'

const CHARACTERS = [
  'leon kennedy',
  'claire redfield',
  'ada wong',
  'chris redfield',
  'jill valentine',
  'sherry birkin',
  'wesker',
  'hunk',
  'mr x',
  'ashley graham',
  'rebecca chambers',
  'barry burton',
  'nemesis',
  'william birkin',
  'sheva alomar',
  'ethan winters',
  'lady dimitrescu',
  'carlos oliveira',
  'luis serra',
  'jack krauser',
]

function shuffle(items) {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

function createRound() {
  return {
    cards: shuffle(CHARACTERS),
    clicked: [],
    score: 0,
    status: 'playing',
  }
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'pick': {
      if (state.status !== 'playing') return state
      if (state.clicked.includes(action.name)) {
        return { ...state, status: 'lost' }
      }

      const clicked = [...state.clicked, action.name]
      const score = state.score + 1
      const bestScore = Math.max(state.bestScore, score)

      if (score === CHARACTERS.length) {
        return { ...state, clicked, score, bestScore, status: 'won' }
      }

      return { ...state, clicked, score, bestScore, cards: shuffle(state.cards) }
    }
    case 'restart':
      return { ...state, ...createRound() }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => ({
    ...createRound(),
    bestScore: 0,
  }))

  return (
    <div className="mx-auto min-h-svh max-w-6xl border-x border-zinc-200 bg-white text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <header className="px-6 pt-8">
        <h1 className="mb-2 text-4xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl">
          Resident Evil Memory
        </h1>
        <p className="mx-auto mb-5 max-w-[40ch]">
          Click every character once. Click the same card twice and the round ends.
        </p>
        <div className="flex justify-center gap-3">
          <div className="rounded-md bg-purple-500/10 px-2.5 py-1 font-mono text-purple-700 dark:text-purple-300">
            Score: {state.score}
          </div>
          <div className="rounded-md bg-purple-500/10 px-2.5 py-1 font-mono text-purple-700 dark:text-purple-300">
            Best: {state.bestScore}
          </div>
        </div>
        {state.status !== 'playing' && (
          <div
            className="mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-purple-500/10 px-4 py-3 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
            role="status"
          >
            <p>
              {state.status === 'won'
                ? 'You remembered every character.'
                : 'Already picked that one.'}
            </p>
            <button
              type="button"
              className="cursor-pointer rounded-lg border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-zinc-900 hover:border-purple-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
              onClick={() => dispatch({ type: 'restart' })}
            >
              Play again
            </button>
          </div>
        )}
      </header>

      <main className="flex flex-wrap justify-center gap-5 p-8">
        {state.cards.map((name) => (
          <Card
            key={name}
            name={name}
            disabled={state.status !== 'playing'}
            onSelect={() => dispatch({ type: 'pick', name })}
          />
        ))}
      </main>
    </div>
  )
}

export default App

import { useReducer } from 'react'
import Card from './components/card'
import './App.css'

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
    <>
      <header className="hud">
        <h1>Resident Evil Memory</h1>
        <p>Click every character once. Click the same card twice and the round ends.</p>
        <div className="scores">
          <div className="counter">Score: {state.score}</div>
          <div className="counter">Best: {state.bestScore}</div>
        </div>
        {state.status !== 'playing' && (
          <div className="banner" role="status">
            <p>
              {state.status === 'won'
                ? 'You remembered every character.'
                : 'Already picked that one.'}
            </p>
            <button type="button" className="replay" onClick={() => dispatch({ type: 'restart' })}>
              Play again
            </button>
          </div>
        )}
      </header>

      <main className="card-grid">
        {state.cards.map((name) => (
          <Card
            key={name}
            name={name}
            disabled={state.status !== 'playing'}
            onSelect={() => dispatch({ type: 'pick', name })}
          />
        ))}
      </main>
    </>
  )
}

export default App

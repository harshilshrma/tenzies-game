import { useState, useEffect } from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import Die from './components/Die.jsx'
import Confetti from 'react-confetti'

function generateAllNewDice() {
  return new Array(10)
    .fill(0)
    .map(() => ({
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }))
}

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const [rollCount, setRollCount] = useState(0)
  const [scores, setScores] = useState([])
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    console.log(scores)
  }, [scores])

  function handleDiceRoll() {
    setRollCount(prevCount => prevCount + 1)

    setDice(prevDice => prevDice.map(die =>
      die.isHeld === false ? { ...die, value: Math.floor(Math.random() * 6 + 1) } : die
    ))
  }

  function handleNewGameDiceRoll() {
    setScores(prevScores => {
      // adding current score to the scores array
      const updatedScores = [...prevScores, { id: nanoid(), rolls: rollCount, isBest: false }]

      // finding the min obj
      const minScoreObj = updatedScores.reduce((min, obj) => {
        return obj.rolls < min.rolls ? obj : min
      })

      // return for setScores - .map is always a new array
      return updatedScores.map(scoreObj =>
        scoreObj.id === minScoreObj.id
          ? { ...scoreObj, isBest: true }
          : { ...scoreObj, isBest: false }
      )
    })

    setRollCount(0)
    setDice(generateAllNewDice())
  }

  function hold(id) {
    setDice(prevDice => prevDice.map(die =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ))
  }

  const diceElements = dice.map((dieObj) => {
    return (
      <Die
        key={dieObj.id}
        id={dieObj.id}
        value={dieObj.value}
        isHeld={dieObj.isHeld}
        hold={hold}
      />
    )
  })

  return (
    <div className="container">
      {gameWon && <Confetti />}
      <main>
        <div className="title-container">
          <h1 className="title">Tenzies</h1>
          <a 
            href="https://github.com/harshilshrma/tenzies-game" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            GitHub
          </a>
        </div>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="die-container">
          {diceElements}
        </div>
        <p className="roll-count-text">Roll Count: {rollCount}</p>
        <button className="roll-die" onClick={gameWon ? handleNewGameDiceRoll : handleDiceRoll}>{gameWon ? "New Game" : "Roll"}</button>
      </main>

      <section className="best-score-section">
        <h2>Score Board</h2>
        {scores.map(score =>
          <p className={`score-text ${score.isBest ? "score-text-best" : ""}`} key={score.id}>
            {score.rolls} {score.isBest && "(Best)"}
          </p>
        )}
      </section>
    </div>
  )
}


export default App

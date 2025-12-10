import { useState } from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import Die from './components/Die.jsx'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(generateAllNewDice())
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid()
      }))
  }

  function handleDiceRoll() {
    setDice(prevDice => prevDice.map(die =>
      die.isHeld === false ? { ...die, value: Math.floor(Math.random() * 6 + 1) } : die
    ))
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
    <>
      {gameWon && <Confetti />}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="die-container">
          {diceElements}
        </div>
        <button className="roll-die" onClick={handleDiceRoll}>{gameWon ? "New Game" : "Roll"}</button>
      </main>
    </>
  )
}


export default App

import { useState } from 'react'
import './App.css'
import Die from './components/Die.jsx'

function App() {
  const [dice, setDice] = useState(generateAllNewDice())

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false
      }))
  }

  function handleDiceRoll() {
    setDice(generateAllNewDice())
  }

  const diceElements = dice.map((dieObj, index) => {
    return <Die key={index} value={dieObj.value} />
  })

  return (
    <main>
      <div className="die-container">
        {diceElements}
      </div>
      <button className="roll-die" onClick={handleDiceRoll}>Roll</button>
    </main>
  )
}


export default App

import { useEffect, useState } from "react";
import Die from "./components/Die"
import { nanoid } from "nanoid";
import Confetti from "react-confetti";


function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)

  
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const numberToCompare = dice[0].number;
    const allSameValue = dice.every(die => die.number === numberToCompare)
    if (allSameValue && allHeld) {
      setTenzies(true)
    }
  },[dice] )

  function generateNewDie() {
    return {
      number: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()      
    }
  }

  function allNewDice() {
    const diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push(generateNewDie());
    }
    return diceArr;
  }

  function rollDice() {
    if(!tenzies) {
      setCount(oldCount => oldCount + 1)
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld
          ? die
          : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setCount(0)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id 
        ? {...die, isHeld: !die.isHeld}
        : die
      }))
    }

    
  const diceElements = dice.map(die => {
    return <Die value={die.number} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  })

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to
      freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="rollBtn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <h4>Number of turns: {count}</h4>
    </main>
  )
}

export default App

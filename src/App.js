import React from "react"
import './App.css';
import Die from "./Die"
import {nanoid} from "nanoid"

function App() {
 
 
 
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)


  function generateNewDie() {

      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }

}
 
 function allNewDice() {
  const newDice = []
  for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
  }
  return newDice
}

function holdDice(id) {
  setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} : 
      die

  }))
}

const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld}  toggle={() => holdDice(die.id)} />)


 function rollDice() {
  setDice(oldDice => oldDice.map(die => {
    return die.isHeld ? die : generateNewDie()
  }))
}

React.useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies (true)
      console.log("winner")
    }
}, [dice])

 return (
    <div className="wrapper">
      
    <main>
      <h1 className="title">Tenzies</h1>
      
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      
      <div className='dieBox'>
        {diceElements}
      </div>

      <button className="rollBtn" onClick={rollDice}>Roll Dice</button>


    </main>

    </div>
  );
}

export default App;

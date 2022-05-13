import React from "react"
import './App.css';
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import {
  useWindowSize,
} from '@react-hook/window-size'





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
    
    if(tenzies === true) {
       generateNewDie()
       //force reload, kvuli tenzies false value, pozdeji zmenit
       window.location.reload()
       
    }
    else{
      return die.isHeld ? die : generateNewDie()
    }
    }))
}

React.useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies (true)
     
    }else {
      setTenzies (false)
    }
}, [dice])



const { width, height } = useWindowSize()
 return (
 
    <div className="wrapper">
      
    <main>
      {/* {tenzies &&} */}
      <h1 className="title">Tenzies</h1>
      
      {tenzies ? <h2>You Won!!</h2> : <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
      
      <div className='dieBox'>
        {diceElements}
      
      </div>

       {tenzies && <Confetti
                 drawShape={ctx => {
                  ctx.beginPath()
                 for(let i = 0; i < 22; i++) {
                    const angle = 0.35 * i
                    const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
                    const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
                    ctx.lineTo(x, y)
                 }
                 ctx.stroke()
                 ctx.closePath()
                
               }}
               width= {width}
               height = {height}
               

          />}
        
       <div>
      <button className="rollBtn" 
     
      onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}</button>
        </div>


    

    </main>

    </div>
  );
}

export default App;

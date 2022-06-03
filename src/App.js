import './Components/styles.css'
import Die from './Components/Die';
import React from 'react';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  function generateNewDices(){
    const take=["one","two","three","four","five","six"]
    return {Value:take[Math.ceil(Math.random()*6)-1],isHeld:false,id:nanoid()}
  }
  function allNewDices(){
    const Arr=[]
    for(let i=1;i<=10;i++){
      Arr.push(generateNewDices())
    }
    return Arr
  }
  const [dice,setDice]=React.useState(allNewDices())
  const [Tenzies,setTenzies]=React.useState(false)
  const [count,setCount]=React.useState(0)
  const [Timer,setTimer]=React.useState(0)
  const [HighScoreCount,setHighScoreCount]=React.useState(localStorage.getItem("CountHighScore")||99999)
  const [HighScoreTime,setHighScoreTime]=React.useState(localStorage.getItem("TimeHighScore")||99999)
  function timer(Timer){
    if( Timer < 10){
      return `00:0${Timer}`
    }
    if(Timer<59){
      return `00:${Timer}`
    }
    return `${Math.floor(Timer/60)}:${Math.floor(Timer%60)}`
  }
  React.useEffect(() => {
    setInterval(()=>{
    setTimer(prev => prev+1)
  },1500)
  },[])
  React.useEffect(() => {
    //console.log("dice changed")
    var checker=dice[0].Value
    var allHeld=dice.every(die => die.isHeld)
    var allSame=dice.every(die => checker===die.Value)
    if(allHeld&&allSame){
      setTenzies(true)
      if(count <HighScoreCount){
        setHighScoreCount(count)
       localStorage.setItem("CountHighScore",count)
      }
      if(Timer <HighScoreTime){
        setHighScoreTime(Timer)
       localStorage.setItem("TimeHighScore",Timer)
      }
    }
  },[dice])
  const Dices=dice.map(item => 
  <Die key={item.id} 
  Value={item.Value} 
  isHeld={item.isHeld} 
  handleClick={() => 
    holdDice(item.id)}/>)
  function handleClick(){
    setDice(oldDice => oldDice.map(die =>{
      return die.isHeld?die:generateNewDices()
    }))
    setCount(prev => prev+1)
  }
  function newGame(){
    setDice(allNewDices)
    setTenzies(false)
    setCount(0)
    setTimer(0)
  }
  function holdDice(diceId){
    setDice(oldDice => oldDice.map(die =>{
      return diceId===die.id?{...die,isHeld:!die.isHeld}:{...die}
    }))
  }
  return (
    <div className="App">
      {Tenzies && <Confetti
    />}
      <main className='Main-block'>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">
              Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
           <div className='time'><h4>{`Current Time:${timer(Timer)}`}</h4>
            <h4>{`Current High Score Time:${timer(HighScoreTime)}`}</h4></div>
            <div className='counts'><h3>{`Current Roll Count:${count}`}</h3>
        <h3>{`Current High Score Count:${HighScoreCount}`}</h3></div>
        <h3></h3>
        <div className="Container">
          {Dices}
        </div>
        <button onClick={Tenzies?newGame:handleClick} className="btn">{Tenzies?"New Game":"Roll"}</button>
      </main>
    </div>
  );
}

export default App;

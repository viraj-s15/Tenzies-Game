import React, { useState, useEffect } from "react"
import "./Main.css"
import Grid from "./Grid"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

const Main = () => {
  function getNewElements() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  const randNum = () => {
    const array = []
    for (let i = 0; i < 10; i++) {
      array.push(getNewElements())
    }
    return array
  }

  const heldDice = (id) => {
    setRandomNumber((prevRandomNumber) =>
      prevRandomNumber.map((num) => {
        return num.id === id ? { ...num, isHeld: !num.isHeld } : num
      })
    )
  }

  const [randomNumber, setRandomNumber] = useState(randNum())
  const [won, setWon] = useState(false)

  useEffect(() => {
    const checkHeld = randomNumber.every((num) => num.isHeld)
    const firstNum = randomNumber[0].value
    const checkSame = randomNumber.every((num) => num.value === firstNum)
    if (checkHeld && checkSame) {
      console.log("You won")
      setWon(true)
    }
  }, [randomNumber])

  const gridElements = randomNumber.map((num) => (
    <Grid
      key={num.id}
      value={num.value}
      isHeld={num.isHeld}
      heldDice={() => {
        heldDice(num.id)
      }}
    />
  ))

  function newNums() {
    if (!won) {
      setRandomNumber((prevRandomNumber) =>
        prevRandomNumber.map((num) => {
          return num.isHeld ? num : getNewElements()
        })
      )
    } else {
      setWon(false)
      setRandomNumber(randNum())
    }
  }
  const { width, height } = useWindowSize()
  return (
    <main>
      {won && <Confetti width={width} height={height} />}
      <div className='main--container'>
        <h1 className='main--title'>Tenzies</h1>
        <p className='main--description'>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className='grid--container'>{gridElements}</div>
        <button className='change--num' onCl ick={newNums}>
          {won ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  )
}

export default Main

import React from "react"
import "./Grid.css"

const Grid = (props) => {
  const heldStyle = {
    backgroundColor: props.isHeld ? "rgb(101, 245, 197)" : "rgb(9, 81, 95)",
  }
  return (
    <div
      className='individual--grid'
      style={heldStyle}
      onClick={props.heldDice}
    >
      <h2 className='grid--number'>{props.value}</h2>
    </div>
  )
}

export default Grid

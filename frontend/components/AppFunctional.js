import React, { useState } from 'react'
import axios from 'axios'

const initialState = {
  squares: [0,1,2,
            3,4,5,
            6,7,8],
  activeSquare: 4,
  steps: 0,
  y: 2,
  x: 2,
  input: "",
}



export default function AppFunctional(props) {

  const [appState, setAppState] = useState(initialState)
  const [message, setMessageState] = useState("")
  const y = appState.y
  const x = appState.x
  const steps = appState.steps

  const onChange = evt => {
    const { value } = evt.target
    setAppState({
      ...appState,
      input: value,
    })
  }

  const submitQuery = (evt) => {
    evt.preventDefault()
    const query = { "x": appState.x, "y": appState.y, "steps": appState.steps, "email": appState.input }
    axios.post("http://localhost:9000/api/result", query)
      .then(res => {
        setMessageState(res.data.message)
        setAppState({ ...appState, input: "" })
        // console.log(res.data.message)
      })
      .catch(err => {
        setMessageState(err.response.data.message)
        setAppState({ ...appState, input: "" })
        // setMessageState(err.message)
        // console.error(err)
      })
  }

  const keypadClickHandler = (event) => {
    if(event.target.id === "reset") {
      setAppState(initialState)
      setMessageState("")
    } else if(event.target.id === "left") {
        if(appState.x > 1){
          setAppState({ ...appState, steps: appState.steps + 1, x: appState.x - 1, activeSquare: appState.activeSquare - 1 })
          setMessageState("")
        } else {
          setMessageState("You can't go left")
        }
    } else if(event.target.id === "right") {
        if(appState.x < 3){
          setAppState({ ...appState, steps: appState.steps + 1, x: appState.x + 1, activeSquare: appState.activeSquare + 1 })
          setMessageState("")
        } else {
          setMessageState("You can't go right")
        }
    } else if(event.target.id === "up") {
        if(appState.y > 1){
          setAppState({ ...appState, steps: appState.steps + 1, y: appState.y - 1, activeSquare: appState.activeSquare - 3 })
          setMessageState("")
        } else {
          setMessageState("You can't go up")
        }
    } else if(event.target.id === "down") {
        if(appState.y < 3){
          setAppState({ ...appState, steps: appState.steps + 1, y: appState.y + 1, activeSquare: appState.activeSquare + 3 })
          setMessageState("")
        } else {
          setMessageState("You can't go down")
        }
    }
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates (${x}, ${y})`}</h3>
        <h3 id="steps">{`You moved ${steps} time${steps === 1 ? "" : "s"}`}</h3>
      </div>
      <Grid squares={appState.squares} activeSquare={appState.activeSquare} />
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={keypadClickHandler}>LEFT</button>
        <button id="up" onClick={keypadClickHandler}>UP</button>
        <button id="right" onClick={keypadClickHandler}>RIGHT</button>
        <button id="down" onClick={keypadClickHandler}>DOWN</button>
        <button id="reset" onClick={keypadClickHandler}>reset</button>
      </div>
      <form onSubmit={submitQuery}>
        <input
          onChange={onChange} 
          value={appState.input}
          id="email" 
          type="email" 
          placeholder="type email"
       
        />
        <input 
          id="submit" 
          type="submit"
        />
      </form>
    </div>
  )
}

function Grid(props) {
  return(
    <div id="grid">
      {props.squares.map(square => {
        return <div className={square === props.activeSquare ? "square active" : "square"} >{square === props.activeSquare ? "B" : ""}</div>
      })}
    </div>
  )
}



// function Square(props) {
//   return(
//     <div className="square"></div>
//   )
// }

import React from 'react'
import axios from 'axios'

const initialState = {
  squares: [0,1,2,
            3,4,5,
            6,7,8],
  activeSquare: 4,
  steps: 0,
  y: 2,
  x: 2,
  message: "",
  input: "",
}

export default class AppClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  onChange = evt => {
    const { value } = evt.target
    this.setState({
      ...this.state,
      input: value,
    })
  }

  submitQuery = (evt) => {
    evt.preventDefault()
    const query = { "x": this.state.x, "y": this.state.y, "steps": this.state.steps, "email": this.state.input }
    axios.post("http://localhost:9000/api/result", query)
      .then(res => {
        this.setState({ ...this.state, message: res.data.message, input: "" })
        // console.log(res.data.message)
      })
      .catch(err => {
        this.setState({ ...this.state, message: err.response.data.message, input: "" })
      })
  }

  keypadClickHandler = (event) => {
    if(event.target.id === "reset") {
      this.setState(initialState)
    } else if(event.target.id === "left") {
        if(this.state.x > 1){
          this.setState({ ...this.state, steps: this.state.steps + 1, x: this.state.x - 1, activeSquare: this.state.activeSquare - 1, message: "" })
        } else {
          this.setState({ ...this.state, message: "You can't go left"})
        }
    } else if(event.target.id === "right") {
        if(this.state.x < 3){
          this.setState({ ...this.state, steps: this.state.steps + 1, x: this.state.x + 1, activeSquare: this.state.activeSquare + 1, message: "" })
        } else {
          this.setState({ ...this.state, message: "You can't go right"})
        }
    } else if(event.target.id === "up") {
        if(this.state.y > 1){
          this.setState({ ...this.state, steps: this.state.steps + 1, y: this.state.y - 1, activeSquare: this.state.activeSquare - 3, message: "" })
        } else {
          this.setState({ ...this.state, message: "You can't go up"})
        }
    } else if(event.target.id === "down") {
        if(this.state.y < 3){
          this.setState({ ...this.state, steps: this.state.steps + 1, y: this.state.y + 1, activeSquare: this.state.activeSquare + 3, message: "" })
        } else {
          this.setState({ ...this.state, message: "You can't go down"})
        }
    }
  }


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.x}, ${this.state.y})`}</h3>
          <h3 id="steps">{`You moved ${this.state.steps} time${this.state.steps === 1 ? "" : "s"}`}</h3>
        </div>
         <Grid squares={this.state.squares} activeSquare={this.state.activeSquare} />
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.keypadClickHandler}>LEFT</button>
          <button id="up" onClick={this.keypadClickHandler}>UP</button>
          <button id="right" onClick={this.keypadClickHandler}>RIGHT</button>
          <button id="down" onClick={this.keypadClickHandler}>DOWN</button>
          <button id="reset" onClick={this.keypadClickHandler}>reset</button>
        </div>
        <form onSubmit={this.submitQuery}>
          <input 
            onChange={this.onChange}
            value={this.state.input}
            id="email" 
            type="email" 
            placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

class Grid extends React.Component {
  render(){
  return(
    <div id="grid">
      {this.props.squares.map(square => {
        return <div className={square === this.props.activeSquare ? "square active" : "square"} >{square === this.props.activeSquare ? "B" : ""}</div>
      })}
    </div>
  )
}
}

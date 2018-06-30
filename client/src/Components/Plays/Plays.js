import React, { Component } from 'react'
import EditablePlay from './PlayShow'

class Plays extends Component {

  render () {
    const plays = this.props.plays.map((play) => (
      <li key={play.id}><EditablePlay
        id={play.id}
        title={play.title}
      /></li>
    ))
    return (
      <div id='plays'>
        <ul>
          {plays}
        </ul>
      </div>
    )
  }
}

export default Plays

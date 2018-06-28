import React, { Component } from 'react'
import EditablePlay from './PlayShow'

class Plays extends Component {
  render () {
    const plays = this.props.plays.map((play) => (
      <EditablePlay
        key={play.id}
        id={play.id}
        title={play.title}
      />
    ))
    return (
      <div id='plays'>
        {plays}
      </div>
    )
  }
}

export default Plays

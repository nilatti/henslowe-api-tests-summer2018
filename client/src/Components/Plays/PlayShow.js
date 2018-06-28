import React, { Component } from 'react'

class EditablePlay extends Component {
  render () {
    return (
      <Play
        key={this.props.id}
        id={this.props.id}
        title={this.props.title}
      />
    )
  }
}

class Play extends Component {
  render () {
    return (
      <div>
        {this.props.title}
      </div>
    )
  }
}

export default EditablePlay

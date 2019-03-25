import PropTypes from 'prop-types';
import {
  Glyphicon,
  Row,
  Col
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

import {
  createPlay
} from '../../api/plays'

import PlayFormToggle from '../Plays/PlayFormToggle'
import PlaysSubComponent from '../Plays/PlaysSubComponent'

class AuthorShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plays: this.props.plays,
      playFormOpen: false,
    }
  }

  async createPlay(play) {
    const response = await createPlay(play)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating play'
      })
    } else {
      this.addNewPlay(response.data)
    }
  }

  addNewPlay = (newPlay) => {
    this.setState({
      plays: [...this.state.plays, newPlay]
    })
  }

  handleCreateFormSubmit = (play) => {
    this.createPlay(play)
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id)
  }

  render() {
    let dates = this.props.birthdate //tk
    if (this.props.deathdate != null) {
      dates = dates.concat(" to " + this.props.deathdate)
    }

    return (
      <Col md={12}>
      <Row>
        <Col md={3} className="author-profile">
          <h3>
            {this.props.first_name} {this.props.middle_name} {this.props.last_name}
          </h3>
          <p>
            {dates}<br />
            {this.props.nationality}
          </p>
          <span
            className='right floated edit icon'
            onClick={this.props.onEditClick}
          >
            <Glyphicon glyph="pencil" />
          </span>
          <span
            className='right floated trash icon'
            onClick={this.handleDeleteClick}
          >
            <Glyphicon glyph="glyphicon glyphicon-trash" />
          </span>
        </Col>
        <Col md={9}>
          <h2>Plays by {this.props.last_name}</h2>
          <PlaysSubComponent
            author_id={this.props.id}
            plays={this.state.plays}
          />
          <PlayFormToggle
            author_id={this.props.id}
            onFormSubmit={this.handleCreateFormSubmit}
            isOnAuthorPage={true}
            isOpen={this.state.playFormOpen}
          />
        </Col>
      </Row>
      <hr />
      </Col>
    )
  }
}

AuthorShow.propTypes = {
  birthdate: PropTypes.string,
  deathdate: PropTypes.string,
  first_name: PropTypes.string,
  gender: PropTypes.string,
  id: PropTypes.number.isRequired,
  last_name: PropTypes.string,
  middle_name: PropTypes.string,
  nationality: PropTypes.string,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  plays: PropTypes.array.isRequired,
}

export default AuthorShow
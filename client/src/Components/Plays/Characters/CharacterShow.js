import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Row,
} from 'react-bootstrap'

class CharacterShow extends Component {
  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.character.id)
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.character.name}</h2>
            <p><em>{this.props.character.gender}, {this.props.character.age}</em></p>
            <p>
              {this.props.character.description}
            </p>
            <span
              className='right floated edit icon'
              onClick={this.props.handleEditClick}
            >
              <i className="fas fa-pencil-alt"></i>
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleDeleteClick}
            >
              <i className="fas fa-trash-alt"></i>
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}

CharacterShow.propTypes = {
  character: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
}

export default CharacterShow
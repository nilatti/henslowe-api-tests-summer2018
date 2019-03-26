import PropTypes from 'prop-types';
import {
  Glyphicon,
  Row,
  Col
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

class TheaterShow extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {

    }
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id)
  }

  render() {

    return (
      <Col md={12}>
      <Row>
        <Col md={12} className="theater-profile">
          <h2>{this.props.name}</h2>
          <p><em>{this.props.mission_statement}</em></p>
          <p>
          {this.props.street_address}<br />
          {this.props.city}, {this.props.state}  {this.props.zip}<br />
          {this.props.phone_number}<br />
          <a href={'http://' + this.props.website} target="_blank">{this.props.website}</a>
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
      </Row>
      <hr />
      <div>
        Lists of productions and users can go here eventually
      </div>
      </Col>
    )
  }
}

TheaterShow.propTypes = {
  city: PropTypes.string,
  id: PropTypes.number.isRequired,
  mission_statement: PropTypes.string,
  name: PropTypes.string.isRequired,
  phone_number: PropTypes.string,
  state: PropTypes.string,
  street_address: PropTypes.string,
  website: PropTypes.string,
  zip: PropTypes.string,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
}

export default TheaterShow
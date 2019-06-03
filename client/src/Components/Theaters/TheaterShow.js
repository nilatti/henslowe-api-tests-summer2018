import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

import SpaceAgreementFormForTheatersToggle from '../SpaceAgreements/SpaceAgreementFormForTheatersToggle'
import SpaceInfoTab from '../Spaces/SpaceInfoTab'

import {
  updateServerTheater
} from '../../api/theaters.js'

class TheaterShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: ''
    };
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.theater.id)
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {
    let spaceTabs
    if (this.props.theater.spaces[0]) {
      spaceTabs = this.props.theater.spaces.map((space) =>
        <Tab eventKey={`space-${space.id}`} title={space.name} key={`space-${space.id}`}>
        <SpaceInfoTab space={space} />
      </Tab>
      )
    } else {
      spaceTabs = <div>No spaces found</div>
    }

    return (
      <Col md={12}>
      <Row>
        <Col md={12} className="theater-profile">
          <h2>{this.props.theater.name}</h2>
          <p><em>{this.props.theater.mission_statement}</em></p>
          <p>
          {this.props.theater.street_address}<br />
          {this.props.theater.city}, {this.props.theater.state}  {this.props.theater.zip}<br />
          {this.props.theater.phone_number}<br />
          <a href={'http://' + this.props.theater.website} target="_blank">{this.props.theater.website}</a>
          </p>
          <span
            className='right floated edit icon'
            onClick={this.props.onEditClick}
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
      <hr />
      <Row>
        <h2>Spaces</h2>
        </Row>
        <Row>
          <SpaceAgreementFormForTheatersToggle theater={this.props.theater} isOpen={false} onFormSubmit={this.props.onFormSubmit} />
        </Row>

          <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="space-info-tabs"
        >
          {spaceTabs}
        </Tabs>
      </Col>
    )
  }
}

TheaterShow.propTypes = {
  theater: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
}

export default TheaterShow

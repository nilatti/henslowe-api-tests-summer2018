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

import {
  Link
} from 'react-router-dom'

import {
  calculateLineCount,
  calculateRunTime,
} from '../../utils/playScriptUtils'

import ActorsList from './Actors/ActorsList'
import CastList from '../Jobs/CastList'
import JobsListExcludingActorsAndAuditioners from '../Jobs/JobsListExcludingActorsAndAuditioners'
import StageExitsList from './SetDesign/StageExitsList'

class ProductionShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: ''
    };
  }


  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.production.id)
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {
    return (
      <Col md={12}>
      <Row>
        <Col md={12} className="production-profile">
          <h2>
            {
              this.props.production.play ?
              <Link to={`/plays/${this.props.production.play.id}`}>
                {this.props.production.play.title}
              </Link>
              :
              'A Play'
            } at {
              this.props.production.theater ?
              <Link to={`/theaters/${this.props.production.theater.id}`}>
                {this.props.production.theater.name}
              </Link>
              : 'A Theater'
            }
          </h2>
          <p><em>{this.props.production.start_date} - {this.props.production.end_date}</em></p>

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
        <Col md={12}>
          <p>Lines per minute: {this.props.production.lines_per_minute}</p>
          <p>Total lines: </p>
          <p>Run time:</p>
        </Col>
      </Row>
      <hr />
      <Row>
        <h2>Production Jobs</h2>
        <JobsListExcludingActorsAndAuditioners production={this.props.production} />
      </Row>
      <hr />
      <Row>
        <CastList production={this.props.production} />
      </Row>
      <hr />
      <Row>
        <Col md={12}>
          <ActorsList production={this.props.production} />
        </Col>
      </Row>
      <hr />
      <Row>
        <h2>
          Set Design
        </h2>
      </Row>
      <Row>
        <StageExitsList productionId={this.props.production.id}/>
      </Row>
      </Col>
    )
  }
}

ProductionShow.propTypes = {
  production: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
}

export default ProductionShow

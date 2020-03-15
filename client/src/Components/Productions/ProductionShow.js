import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import {
  calculateLineCount,
  calculateRunTime,
  getLinesFromCharacters
} from '../../utils/playScriptUtils'

import ActorsList from './Actors/ActorsList'
import CastList from '../Jobs/CastList'
import JobsListExcludingActorsAndAuditioners from '../Jobs/JobsListExcludingActorsAndAuditioners'
import StageExitsList from './SetDesign/StageExitsList'

export default function ProductionShow (props) {
  //
  // handleDeleteClick = () => {
  //   this.props.onDeleteClick(this.props.production.id)
  // }
  //
  // render() {
    let { url } = useRouteMatch();
    let linesTotal = calculateLineCount(getLinesFromCharacters(props.production.play.characters))
    let runTime = parseFloat(linesTotal / props.production.lines_per_minute).toFixed(2)
    return (
      <Col md={12}>
      <Row>
        <Col md={12} className="production-profile">
          <h2>
            {
              props.production.play ?
              <Link to={`/plays/${props.production.play.id}`}>
                {props.production.play.title}
              </Link>
              :
              'A Play'
            } at {
              props.production.theater ?
              <Link to={`/theaters/${props.production.theater.id}`}>
                {props.production.theater.name}
              </Link>
              : 'A Theater'
            }
          </h2>
          <p><em>{props.production.start_date} - {props.production.end_date}</em></p>

          <span
            className='right floated edit icon'
            onClick={props.onEditClick}
          >
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span
            className='right floated trash icon'
            onClick={() => {props.handleDeleteClick()}}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={12}>
          <p>Lines per minute: {props.production.lines_per_minute}</p>
          <p>Total lines: {linesTotal}</p>
          <p>Run time: {runTime} minutes</p>
          <Link to={`${url}/doubling_charts/`}>
            <Button variant="info">
              Show Doubling Charts
            </Button>
          </Link>
        </Col>
      </Row>
      <hr />
      <Row>
        <h2>Production Jobs</h2>
        <JobsListExcludingActorsAndAuditioners production={props.production} />
      </Row>
      <hr />
      <Row>
        <CastList production={props.production} />
      </Row>
      <hr />
      <Row>
        <Col md={12}>
          <ActorsList production={props.production} />
        </Col>
      </Row>
      <hr />
      <Row>
        <h2>
          Set Design
        </h2>
      </Row>
      <Row>
        <StageExitsList productionId={props.production.id}/>
      </Row>
      </Col>
    )
  // }
}

ProductionShow.propTypes = {
  production: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
}

// export default ProductionShow

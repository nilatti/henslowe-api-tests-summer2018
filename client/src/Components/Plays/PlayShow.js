import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import {
  Link,
} from 'react-router-dom'

import ActFormToggle from './Acts/ActFormToggle'
import ActInfoTab from './Acts/ActInfoTab'

import CharacterFormToggle from './Characters/CharacterFormToggle'
import CharacterInfoTab from './Characters/CharacterInfoTab'

class PlayShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: ''
    };
  }

  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.play.id)
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {
    let actTabs
    let characterTabs
    if (this.props.play.acts) {
      actTabs = this.props.play.acts.map((act) =>
        <Tab
          eventKey={`act-${act.id}`}
          key={`act-${act.id}`}
          title={`Act ${act.number}`}
        >
        <ActInfoTab
          act={act}
          handleEditSubmit={this.props.handleActEditFormSubmit}
          play={this.props.play}
          onDeleteClick={this.props.handleActDeleteClick}
        />
      </Tab>
      )
    } else {
      actTabs = <div>No acts found</div>
    }
    if (this.props.play.characters) {
      characterTabs = this.props.play.characters.map((character) =>
        <Tab
          eventKey={`character-${character.id}`}
          key={`character-${character.id}`}
          play={this.props.play}
          title={`${character.name}`}
        >
        <CharacterInfoTab
          character={character}
          play={this.props.play}
          onDeleteClick={this.props.handleCharacterDeleteClick}
          handleEditSubmit={this.props.handleCharacterEditFormSubmit}
        />
      </Tab>
      )
    } else {
      characterTabs = <div>No acts found</div>
    }
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.play.title}</h2>
            a {this.props.play.genre.join('/')}<br />
            {this.props.play.canonical ? <p><em> Canonical Version</em></p> : <p></p>}
            by <Link to={`/authors/${this.props.play.author.id}`}> {this.props.play.author.first_name} {this.props.play.author.last_name}</Link><br />
            {this.props.play.date}<br />
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
        <Row>
          <h2>Characters</h2>
        </Row>
        <Row>
          <CharacterFormToggle
            isOpen={false}
            onFormSubmit={this.props.handleCharacterCreateFormSubmit}
            play_id={this.props.play.id}
          />
        </Row>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="character-info-tabs"
        >
        {characterTabs}
      </Tabs>
        <Row>
        <h2>Acts</h2>
        </Row>
        <Row>
          <ActFormToggle
            isOpen={false}
            onFormSubmit={this.props.handleActCreateFormSubmit}
            play={this.props.play}
          />
        </Row>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="act-info-tabs"
        >
          {actTabs}
        </Tabs>
      </div>
    )
  }
}

PlayShow.propTypes = {
  handleActCreateFormSubmit: PropTypes.func.isRequired,
  handleActDeleteClick: PropTypes.func.isRequired,
  handleActEditFormSubmit: PropTypes.func.isRequired,
  handleCharacterCreateFormSubmit: PropTypes.func.isRequired,
  handleCharacterDeleteClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
}

export default PlayShow

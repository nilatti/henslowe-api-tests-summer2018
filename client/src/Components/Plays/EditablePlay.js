import _ from 'lodash'

import React, {
  Component
} from 'react'

import {
  Redirect
} from 'react-router-dom'

import {
  createItemWithParent,
  deleteItem,
  getItem,
  updateServerItem
} from '../../api/crud'
import {
  updateServerPlay
} from '../../api/plays'

import PlayShow from './PlayShow'
import PlayForm from './PlayForm'

class EditablePlay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      play: null,
      toPlaysList: false,
    }
  }

  async createAct(playId, act) {
    const response = await createItemWithParent('play', playId, 'act', act)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating act'
      })
    } else {
      let newActs = _.orderBy([...this.state.play.acts, response.data], 'number')
      this.setState({
        play: {...this.state.play, acts: newActs}
      })
    }
  }

  async createCharacter(playId, character) {
    const response = await createItemWithParent('play', playId, 'character', character)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating character'
      })
    } else {
      let newCharacters = _.sortBy([...this.state.play.characters, response.data], 'name')
      this.setState({
        play: {...this.state.play, characters: newCharacters}
      })
    }
  }

  async createEntranceExit(actId, sceneId, frenchSceneId, entranceExit) {
    const response = await createItemWithParent('french_scene', frenchSceneId, 'entrance_exit', entranceExit)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating entrance/exit'
      })
    } else {
      let workingAct = _.find(this.state.play.acts, {'id': actId})
      let workingScene = _.find(workingAct.scenes, {'id': sceneId})
      let workingFrenchScene = _.find(workingScene.french_scenes, {'id': frenchSceneId})
      let newEntranceExits = _.orderBy([...workingFrenchScene.entrance_exits, response.data], 'line')
      let newFrenchScene = {...workingFrenchScene, entrance_exits: newEntranceExits}
      let newFrenchScenes = workingScene.french_scenes.map((frenchScene) => {
        if (frenchScene.id === newFrenchScene.id) {
          return newFrenchScene
        } else {
          return frenchScene
        }
      })
      let newScenes = workingAct.scenes.map((scene) => {
        if (scene.id === workingScene.id) {
          return {...scene, french_scenes: newFrenchScenes}
        } else {
          return scene
        }
      })
      let newAct = {...workingAct, scenes: newScenes}
      let newActs = this.state.play.acts.map((act) => {
          if (act.id === newAct.id) {
            return {...act, ...newAct}
          } else {
            return act
          }
        }
      )
      let newPlay = {...this.state.play, acts: newActs}
      this.setState({
        play: newPlay
      })
    }
  }

  async createFrenchScene(actId, sceneId, frenchScene) {
    const response = await createItemWithParent('scene', sceneId, 'french_scene', frenchScene)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating scene'
      })
    } else {
      let workingAct = _.find(this.state.play.acts, {'id': actId})
      let workingScene = _.find(workingAct.scenes, {'id': sceneId})
      let newFrenchScene = {...response.data, on_stages: []}
      let newFrenchScenes = _.orderBy([...workingScene.french_scenes, newFrenchScene], 'number')
      let newScene = {...workingScene, french_scenes: newFrenchScenes}
      let newScenes = workingAct.scenes.map((scene) => {
        if (scene.id === newScene.id) {
          return {...scene, french_scenes: newScene.french_scenes}
        } else {
          return scene
        }
      })
      let newAct = {...workingAct, scenes: newScenes}
      let newActs = this.state.play.acts.map((act) => {
          if (act.id === newAct.id) {
            return {...act, ...newAct}
          } else {
            return act
          }
        }
      )
      this.setState({
        play: {
          ...this.state.play,
          acts: newActs
        }
      })
    }
  }

  async createOnStage(actId, sceneId, frenchSceneId, onStage) {
    const response = await createItemWithParent('french_scene', frenchSceneId, 'on_stage', onStage)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating on stage'
      })
    } else {
      let workingAct = _.find(this.state.play.acts, {'id': actId})
      let workingScene = _.find(workingAct.scenes, {'id': sceneId})
      let workingFrenchScene = _.find(workingScene.french_scenes, {'id': frenchSceneId})
      let newOnStages = _.orderBy([...workingFrenchScene.on_stages, response.data], 'number')
      let newFrenchScene = {...workingFrenchScene, on_stages: newOnStages}
      let newFrenchScenes = workingScene.french_scenes.map((frenchScene) => {
        if (frenchScene.id === newFrenchScene.id) {
          return newFrenchScene
        } else {
          return frenchScene
        }
      })
      let newScenes = workingAct.scenes.map((scene) => {
        if (scene.id === workingScene.id) {
          return {...scene, french_scenes: newFrenchScenes}
        } else {
          return scene
        }
      })
      let newAct = {...workingAct, scenes: newScenes}
      let newActs = this.state.play.acts.map((act) => {
          if (act.id === newAct.id) {
            return {...act, ...newAct}
          } else {
            return act
          }
        }
      )
      let newPlay = {...this.state.play, acts: newActs}
      this.setState({
        play: newPlay
      })
    }
  }

  async createScene(actId, scene) {
    const response = await createItemWithParent('act', actId, 'scene', scene)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating scene'
      })
    } else {
      let workingAct = _.find(this.state.play.acts, {'id': actId})
      let newScenes = _.orderBy([...workingAct.scenes, response.data], 'number')
      workingAct = {...workingAct, scenes: newScenes}
      let newActs = this.state.play.acts.map((act) => {
          if (act.id === workingAct.id) {
            return {...act, ...workingAct}
          } else {
            return act
          }
        }
      )
      this.setState({
        play: {
          ...this.state.play,
          acts: newActs
        }
      })
    }
  }

  async deleteAct(actId) {
    const response = await deleteItem(actId, 'act')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting act'
      })
    } else {
      this.setState({
        play: {
          ...this.state.play,
          acts: this.state.play.acts.filter(act => act.id !== actId)
          }
      })
    }
  }

  async deleteCharacter(characterId) {
    const response = await deleteItem(characterId, 'character')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting character'
      })
    } else {
      this.setState({
        play: {
          ...this.state.play,
          characters: this.state.play.characters.filter(character => character.id !== characterId)
          }
      })
    }
  }

  async deleteEntranceExit(actId, sceneId, frenchSceneId, entranceExitId) {
    const response = await deleteItem(entranceExitId, 'entrance_exit')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting entrance/exit'
      })
    } else {
      let workingAct = _.find(this.state.play.acts, {'id': actId})
      let workingScene = _.find(workingAct.scenes, {'id': sceneId})
      let workingFrenchScene = _.find(workingScene.french_scenes, {'id': frenchSceneId})
      let newFrenchScene = {
        ...workingFrenchScene, entrance_exits: workingFrenchScene.entrance_exits.filter(entrance_exit => entrance_exit.id !== entranceExitId)
      }
      let newFrenchScenes = workingScene.french_scenes.map((french_scene) => {
        if (french_scene.id === newFrenchScene.id) {
          return newFrenchScene
        } else {
          return french_scene
        }
      })
      let newScenes = workingAct.scenes.map((scene) => {
        if (scene.id === workingScene.id) {
          return {...scene, french_scenes: newFrenchScenes}
        } else {
          return scene
        }
      })
      workingAct = {
        ...workingAct,
        scenes: newScenes
      }
      let newActs = this.state.play.acts.map(act => {
        if (act.id === workingAct.id) {
          return workingAct
        } else {
          return act
        }
      })
      this.setState({
        play: {
          ...this.state.play,
          acts: newActs
          }
      })
    }
  }

  async deleteFrenchScene(actId, sceneId, frenchSceneId) {
    const response = await deleteItem(frenchSceneId, 'french_scene')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting scene'
      })
    } else {
      let workingAct = _.find(this.state.play.acts, {'id': actId})
      let workingScene = _.find(workingAct.scenes, {'id': sceneId})
      workingScene = {
        ...workingScene,
        french_scenes: workingScene.french_scenes.filter(french_scene => french_scene.id !== frenchSceneId)
      }
      let newScenes = workingAct.scenes.map((scene) => {
        if (scene.id === workingScene.id) {
          return {...scene, french_scenes: workingScene.french_scenes}
        } else {
          return scene
        }
      })
      workingAct = {
        ...workingAct,
        scenes: newScenes
      }
      let newActs = this.state.play.acts.map(act => {
        if (act.id === workingAct.id) {
          return workingAct
        } else {
          return act
        }
      })
      this.setState({
        play: {
          ...this.state.play,
          acts: newActs
          }
      })
    }
  }

  async deleteOnStage(actId, sceneId, frenchSceneId, onStageId) {
    const response = await deleteItem(onStageId, 'on_stage')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting onStage'
      })
    } else {
      let workingAct = _.find(this.state.play.acts, {'id': actId})
      let workingScene = _.find(workingAct.scenes, {'id': sceneId})
      let workingFrenchScene = _.find(workingScene.french_scenes, {'id': frenchSceneId})
      let newFrenchScene = {
        ...workingFrenchScene, on_stages: workingFrenchScene.on_stages.filter(on_stage => on_stage.id !== onStageId)
      }
      let newFrenchScenes = workingScene.french_scenes.map((french_scene) => {
        if (french_scene.id === newFrenchScene.id) {
          return newFrenchScene
        } else {
          return french_scene
        }
      })
      let newScenes = workingAct.scenes.map((scene) => {
        if (scene.id === workingScene.id) {
          return {...scene, french_scenes: newFrenchScenes}
        } else {
          return scene
        }
      })
      workingAct = {
        ...workingAct,
        scenes: newScenes
      }
      let newActs = this.state.play.acts.map(act => {
        if (act.id === workingAct.id) {
          return workingAct
        } else {
          return act
        }
      })
      this.setState({
        play: {
          ...this.state.play,
          acts: newActs
          }
      })
    }
  }

  async deletePlay(playId) {
    const response = await deleteItem(playId, 'play')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting play'
      })
    } else {
      this.props.history.push('/plays')
    }
  }

  async deleteScene(actId, sceneId) {
    const response = await deleteItem(sceneId, 'scene')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting scene'
      })
    } else {
      let workingAct = _.find(this.state.play.acts, {'id': actId})
      workingAct = {
        ...workingAct,
        scenes: workingAct.scenes.filter(scene => scene.id !== sceneId)
      }
      let newActs = this.state.play.acts.map(act => {
        if (act.id === workingAct.id) {
          return workingAct
        } else {
          return act
        }
      })
      this.setState({
        play: {
          ...this.state.play,
          acts: newActs
          }
      })
    }
  }

  async loadPlayFromServer(playId) {
    const response = await getItem(playId, "play")
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching play'
      })
    } else {
      this.setState({
        play: response.data
      })
    }
  }

  async updateAct(updatedAct) {
    const response = await updateServerItem(updatedAct, 'act')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating act'
      })
    } else {
      let newActs = this.state.play.acts.map((act) => {
        if (act.id === updatedAct.id) {
          return {...act, ...updatedAct}
        } else {
          return act
        }
      }
    )
    this.setState({
      play: {
        ...this.state.play,
        acts: _.sortBy(newActs, 'number')
      }
    })
  }
}

async updateCharacter(updatedCharacter) {
  const response = await updateServerItem(updatedCharacter, 'character')
  if (response.status >= 400) {
    this.setState({
      errorStatus: 'Error updating character'
    })
  } else {
    let newCharacters = this.state.play.characters.map((character) => {
      if (character.id === updatedCharacter.id) {
        return {...character, ...updatedCharacter}
      } else {
        return character
      }
    }
  )
  this.setState({
    play: {
      ...this.state.play,
      characters: newCharacters
      }
    })
  }
}

async updateEntranceExit(actId, sceneId, frenchSceneId, updatedEntranceExit) {
  const response = await updateServerItem(updatedEntranceExit, 'entrance_exit')
  if (response.status >= 400) {
    this.setState({
      errorStatus: 'Error updating entrance/exit'
    })
  } else {
    let workingAct = _.find(this.state.play.acts, {'id': actId})
    let workingScene = _.find(workingAct.scenes, {'id': sceneId})
    let workingFrenchScene = _.find(workingScene.french_scenes, {'id': frenchSceneId})
    let workingEntranceExit = _.find(workingFrenchScene.entrance_exits, {'id': updatedEntranceExit.id})
    let newEntranceExit = {...workingEntranceExit, ...updatedEntranceExit}
    let newEntranceExits = workingFrenchScene.on_stages.map((entranceExit) => {
      if (entranceExit.id == newEntranceExit.id) {
        return newEntranceExit
      } else {
        return entranceExit
      }
    })
    workingFrenchScene = {
      ...workingFrenchScene,
      entrance_exits: newEntranceExits
    }

    let newFrenchScenes = workingScene.french_scenes.map((frenchScene) => {
      if (frenchScene.id == workingFrenchScene.id) {
        return workingFrenchScene
      } else {
        return frenchScene
      }
    })
    workingScene = {
      ...workingScene,
      french_scenes: newFrenchScenes
    }

    let workingScenes = workingAct.scenes.map((scene) => {
      if (scene.id === workingScene.id) {
        return workingScene
      } else {
        return scene
      }
    })

    workingAct = {
      ...workingAct,
      scenes: workingScenes
    }

    let workingActs = this.state.play.acts.map((act) => {
      if (act.id === workingAct.id) {
        return workingAct
      } else {
        return act
      }
    })
    let workingPlay = {...this.state.play, acts: workingActs}
    this.setState({
      play: {
        ...this.state.play,
        acts: workingActs
        }
    })
  }
}

async updateFrenchScene(actId, sceneId, updatedFrenchScene) {
  const response = await updateServerItem(updatedFrenchScene, 'french_scene')
  if (response.status >= 400) {
    this.setState({
      errorStatus: 'Error updating scene'
    })
  } else {
    let workingAct = _.find(this.state.play.acts, {'id': actId})
    let workingScene = _.find(workingAct.scenes, {'id': sceneId})
    let workingFrenchScene = _.find(workingScene.french_scenes, {'id': updatedFrenchScene})
    let newFrenchScene = {...workingFrenchScene, ...updatedFrenchScene}
    let workingFrenchScenes = workingScene.french_scenes.map((frenchScene =>{
      if (frenchScene.id === newFrenchScene.id) {
        return newFrenchScene
      } else {
        return frenchScene
      }}
    ))
    workingScene = {
      ...workingScene,
      french_scenes: workingFrenchScenes
    }

    let workingScenes = workingAct.scenes.map((scene) => {
      if (scene.id === workingScene.id) {
        return workingScene
      } else {
        return scene
      }
    })

    workingAct = {
      ...workingAct,
      scenes: workingScenes
    }

    let workingActs = this.state.play.acts.map((act) => {
      if (act.id === actId) {
        return workingAct
      } else {
        return act
      }
    })
    this.setState({
      play: {
        ...this.state.play,
        acts: workingActs
        }
    })
  }
}

async updateOnStage(actId, sceneId, frenchSceneId, updatedOnStage) {
  const response = await updateServerItem(updatedOnStage, 'on_stage')
  if (response.status >= 400) {
    this.setState({
      errorStatus: 'Error updating scene'
    })
  } else {
    let workingAct = _.find(this.state.play.acts, {'id': actId})
    let workingScene = _.find(workingAct.scenes, {'id': sceneId})
    let workingFrenchScene = _.find(workingScene.french_scenes, {'id': frenchSceneId})
    let workingOnStage = _.find(workingFrenchScene.on_stages, {'id': updatedOnStage.id})
    let newOnStage = {...workingOnStage, ...updatedOnStage}
    console.log('new onstage is', newOnStage)
    let newOnStages = workingFrenchScene.on_stages.map((onStage) => {
      if (onStage.id == newOnStage.id) {
        return newOnStage
      } else {
        return onStage
      }
    })
    console.log('new onstages', newOnStages)
    workingFrenchScene = {
      ...workingFrenchScene,
      on_stages: newOnStages
    }
    console.log('new fs', workingFrenchScene)

    let newFrenchScenes = workingScene.french_scenes.map((frenchScene) => {
      if (frenchScene.id == workingFrenchScene.id) {
        return workingFrenchScene
      } else {
        return frenchScene
      }
    })
    workingScene = {
      ...workingScene,
      french_scenes: newFrenchScenes
    }
    console.log('new scene', workingScene)

    let workingScenes = workingAct.scenes.map((scene) => {
      if (scene.id === workingScene.id) {
        return workingScene
      } else {
        return scene
      }
    })

    workingAct = {
      ...workingAct,
      scenes: workingScenes
    }

    let workingActs = this.state.play.acts.map((act) => {
      if (act.id === workingAct.id) {
        return workingAct
      } else {
        return act
      }
    })
    let workingPlay = {...this.state.play, acts: workingActs}
    console.log('play', workingPlay )
    this.setState({
      play: {
        ...this.state.play,
        acts: workingActs
        }
    })
  }
}

async updatePlayOnServer(play) {
  const response = await updateServerPlay(play)
  if (response.status >= 400) {
    this.setState({
      errorStatus: 'Error updating play'
    })
  } else {
    this.setState({
      play: response.data
    })
  }
}

async updateScene(actId, updatedScene) {
  const response = await updateServerItem(updatedScene, 'scene')
  if (response.status >= 400) {
    this.setState({
      errorStatus: 'Error updating scene'
    })
  } else {
    let workingAct = _.find(this.state.play.acts, {'id': updatedScene.act_id})
    let updatedSceneInAct = _.find(workingAct.scenes, {'id': updatedScene.id})
    updatedSceneInAct = {...updatedSceneInAct, ...updatedScene}
    workingAct = {
      ...workingAct,
      scenes: {...workingAct.scenes, updatedSceneInAct}
    }
    this.setState({
      play: {
        ...this.state.play,
        acts: {...this.state.play.acts, ...workingAct}
        }
    })
  }
}

componentDidMount = () => {
  this.loadPlayFromServer(this.props.match.params.playId)
}

handleFormClose = () => {
  this.toggleeForm()
}

handleSubmit = (play) => {
  this.updatePlayOnServer(play)
  this.toggleForm()
}

onActCreateFormSubmit = (act) => {
  this.createAct(this.state.play.id, act)
}

onActDeleteClick = (actId) => {
  this.deleteAct(actId)
}

onActEditFormSubmit = (act) => {
  this.updateAct(act)
}

onCharacterCreateFormSubmit = (character) => {
  this.createCharacter(this.state.play.id, character)
}

onCharacterDeleteClick = (characterId) => {
  this.deleteCharacter(characterId)
}

onCharacterEditFormSubmit = (character) => {
  this.updateCharacter(character)
}

onEntranceExitCreateFormSubmit = (actId, sceneId, frenchSceneId, entranceExit) => {
  this.createEntranceExit(actId, sceneId, frenchSceneId, entranceExit)
}

onEntranceExitDeleteClick = (actId, sceneId, frenchSceneId, entranceExitId) => {
  this.deleteEntranceExit(actId, sceneId, frenchSceneId, entranceExitId)
}

onEntranceExitEditFormSubmit = (actId, sceneId, frenchSceneId, entranceExit) => {
  this.updateEntranceExit(actId, sceneId, frenchSceneId, entranceExit)
}

onFrenchSceneCreateFormSubmit = (actId, sceneId, frenchScene) => {
  this.createFrenchScene(actId, sceneId, frenchScene)
}

onFrenchSceneDeleteClick = (actId, sceneId, frenchSceneId) => {
  this.deleteFrenchScene(actId, sceneId, frenchSceneId)
}

onFrenchSceneEditFormSubmit = (actId, sceneId, frenchScene) => {
  this.updateFrenchScene(actId, sceneId, frenchScene)
}

onOnStageCreateFormSubmit = (actId, sceneId, frenchSceneId, onStage) => {
  this.createOnStage(actId, sceneId, frenchSceneId, onStage)
}

onOnStageDeleteClick = (actId, sceneId, frenchSceneId, onStageId) => {
  console.log('args in caller', actId, sceneId, frenchSceneId, onStageId)
  this.deleteOnStage(actId, sceneId, frenchSceneId, onStageId)
}

onOnStageEditFormSubmit = (actId, sceneId, frenchSceneId, onStage) => {
  this.updateOnStage(actId, sceneId, frenchSceneId, onStage)
}

onSceneCreateFormSubmit = (actId, scene) => {
  this.createScene(actId, scene)
}

onSceneDeleteClick = (actId, sceneId) => {
  this.deleteScene(actId, sceneId)
}

onSceneEditFormSubmit = (actId, scene) => {
  this.updateScene(actId, scene)
}

onDeleteClick = (playId) => {
  this.deletePlay(playId)
}

onEditClick = () => {
  this.toggleForm()
}

toggleForm = () => {
  this.setState({
    editFormOpen: !this.state.editFormOpen
  })
}

render() {
  if (this.state.toPlaysList === true) {
    return <Redirect to='/plays' />
  }
  if (this.state.editFormOpen) {
    return (
      <PlayForm
        isOnAuthorPage={false}
        onFormClose={this.handleFormClose}
        onFormSubmit={this.handleSubmit}
        play={this.state.play}
      />
    )
  }
  if (this.state.play === null) {
    return (
      <div>Loading!</div>
    )
  }
  return (
    <PlayShow
      handleActCreateFormSubmit={this.onActCreateFormSubmit}
      handleActDeleteClick={this.onActDeleteClick}
      handleActEditFormSubmit={this.onActEditFormSubmit}
      handleCharacterCreateFormSubmit={this.onCharacterCreateFormSubmit}
      handleCharacterDeleteClick={this.onCharacterDeleteClick}
      handleCharacterEditFormSubmit={this.onCharacterEditFormSubmit}
      handleEntranceExitCreateFormSubmit={this.onEntranceExitCreateFormSubmit}
      handleEntranceExitDeleteClick={this.onEntranceExitDeleteClick}
      handleEntranceExitEditFormSubmit={this.onEntranceExitEditFormSubmit}
      handleFrenchSceneCreateFormSubmit={this.onFrenchSceneCreateFormSubmit}
      handleFrenchSceneDeleteClick={this.onFrenchSceneDeleteClick}
      handleFrenchSceneEditFormSubmit={this.onFrenchSceneEditFormSubmit}
      handleOnStageCreateFormSubmit={this.onOnStageCreateFormSubmit}
      handleOnStageDeleteClick={this.onOnStageDeleteClick}
      handleOnStageEditFormSubmit={this.onOnStageEditFormSubmit}
      handleSceneCreateFormSubmit={this.onSceneCreateFormSubmit}
      handleSceneDeleteClick={this.onSceneDeleteClick}
      handleSceneEditFormSubmit={this.onSceneEditFormSubmit}
      handleDeleteClick={this.onDeleteClick}
      handleEditClick={this.onEditClick}
      play={this.state.play}
    />
  )
}
}

export default EditablePlay

import API from './api'

async function createAct(playId, act) {
  return API.post(
    `plays/${playId}/acts`,
      {
        act
      }
    )
}

async function createPlay(play) {
  return API.post(
    'plays',
      {
        play
      }
    )
}

async function deletePlay(playId) {
  return API.delete(`plays/${playId}`)
}

async function getPlay(playId) {
  return API.request(`plays/${playId}`)
}

async function getActs(playId) {
  return API.request(`plays/${playId}/acts`)
}

async function getPlays() {
    return API.request(`plays`)
}

async function updateServerPlay(play) {
  return API.put(`plays/${play.id}`,
    {
      play: play
    }
  )
}

export { createAct, createPlay, deletePlay, getActs, getPlay, getPlays, updateServerPlay }

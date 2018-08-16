import API from './api'

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


export { createPlay, deletePlay, getPlay, getPlays, updateServerPlay }

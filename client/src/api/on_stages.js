import API from './api'

async function updateServerOnStage(onStage) {
  return API.put(`on_stages/${onStage.id}`, {
    on_stage: onStage
  })
}


export {
  updateServerOnStage
}
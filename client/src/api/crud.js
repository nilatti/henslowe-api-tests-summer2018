import API from './api'


async function createItem(item, itemType) {
  return API.post(
    `${itemType}s`,
      {
        item
      }
    )
}

async function createItemWithParent(parentType, parentId, itemType, item) {
  return API.post(
    `${parentType}s/${parentId}/${itemType}s`,
      item
    )
}

async function deleteItem(itemId, itemType) {
  return API.delete(`${itemType}s/${itemId}`)
}

async function getItem(itemId, itemType) {
  return API.request(`${itemType}s/${itemId}`)
}

async function getItems(itemType) {
    return API.request(`${itemType}s`)
}

async function updateServerItem(item, itemType) {
  const item_data = {}
  item_data[itemType] = item
  return API.put(`${itemType}s/${item.id}`, item_data
  )
}

export {
  createItem,
  createItemWithParent,
  deleteItem,
  getItem,
  getItems,
  updateServerItem
}

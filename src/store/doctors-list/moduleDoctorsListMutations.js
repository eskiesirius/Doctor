export default {
	TOGGLE_ITEM_IN_FAVORITE_LIST (state, item) {
    const index = state.favoriteList.findIndex(i => i.objectID === item.objectID)
    if (index < 0) {
      state.favoriteList.push(item)
    } else {
      state.favoriteList.splice(index, 1)
    }
  },
}
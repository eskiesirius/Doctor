export default {
	isInFavoriteList: state => itemId => {
    return state.favoriteList.some((item) => item.objectID === itemId)
  }
}
const musicsReducer = (state = {
  list: [{ id: 1, title: 'hello' }],
  musics: [],
  total: 0,
  isloading: true
  // movieType: props.match.params.type,
}, action) => {
  switch (action.type) {
    case 'LOAD_MUSICS':
      return {
        ...state, list: action.payload
      }
    default:
      return state
  }
}
export default musicsReducer

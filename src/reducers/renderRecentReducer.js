export const renderRecentReducer = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_RENDER_RECENT':
      return action.toggle;
    default:
      return state;
  }
};
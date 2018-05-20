export const userIdReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return action.userId;
      case 'LOGOUT':
      return null;
    default:
      return state;
  }
};
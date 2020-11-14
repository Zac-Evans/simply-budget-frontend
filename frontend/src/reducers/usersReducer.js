export default (state = [], action) => {
  switch (action.type) {
    case "FETCH USERS":
      return action.payload;
    default:
      return state;
  }
};

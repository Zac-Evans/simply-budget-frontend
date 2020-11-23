export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_PURCHASES":
      return action.payload;
    default:
      return state;
  }
};

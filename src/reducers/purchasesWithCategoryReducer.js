export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_PURCHASES_WITH_CATEGORY":
      return action.payload;
    default:
      return state;
  }
};

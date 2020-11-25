export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_PURCHASE":
      return action.payload;
    default:
      return state;
  }
};

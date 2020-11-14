import backendCall from "../apis/backendCall";

//Fetch categories for specific user
export const fetchCategories = (id) => async (dispatch) => {
  const response = await backendCall.get(`/${id}/budget`);
  dispatch({ type: "FETCH_CATEGORIES", payload: response.data });
};

//Fetch info on specific user
export const fetchUser = (id) => async (dispatch) => {
  const response = await backendCall.get(`/user/${id}`);
  dispatch({ type: "FETCH_USERS", payload: response.data });
};

//Fetch all bills for a specific user
export const fetchCategories = (id) => async (dispatch) => {
  const response = await backendCall.get(`user/${id}/bills`);
  dispatch({ type: "FETCH_BILLS", payload: response.data });
};

//Fetch all purchases for a specific user
export const fetchCategories = () => async (dispatch) => {
  const response = await backendCall.get("/1/budget");
  dispatch({ type: "FETCH_CATEGORIES", payload: response.data });
};

// //Action creator
// export const selectCategory = (category) => {
//   //Return an action
//   return {
//     type: "CATEGORY_SELECTED",
//     payload: category,
//   };
// };

// export const incrementAsync = () => {
//   return (dispatch) => {
//     setTimeout(() => {
//       // You can invoke sync or async actions with `dispatch`
//       dispatch(selectCategory());
//     }, 1000);
//   };
// };

// GET_CURRENT_USER_SUCCESS;

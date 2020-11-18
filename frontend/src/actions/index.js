import API from "../apis/API";
import _ from "lodash";

//Fetch categories for specific user
export const fetchCategories = (user_id) => async (dispatch) => {
  const response = await API.get(`/user/${user_id}/budget`);
  dispatch({ type: "FETCH_CATEGORIES", payload: response.data });
};

// //Fetch specific category for specific user
// export const fetchCategory = (user_id, category_id) => async (dispatch) => {
//   const response = await API.get(
//     `/user/${user_id}/budget/category/${category_id}`
//   );
//   dispatch({ type: "FETCH_CATEGORY", payload: response.data });
// };

export const fetchCategory = (user_id, category_id) => (dispatch) =>
  _fetchCategory(user_id, category_id, dispatch);

const _fetchCategory = _.memoize(async (user_id, category_id, dispatch) => {
  const response = await API.get(
    `/user/${user_id}/budget/category/${category_id}`
  );
  dispatch({ type: "FETCH_CATEGORY", payload: response.data });
});

//Fetch info on specific user
export const fetchUser = (user_id) => async (dispatch) => {
  const response = await API.get(`/user/${user_id}`);
  dispatch({ type: "FETCH_USERS", payload: response.data });
};

//Fetch all bills for a specific user
export const fetchBills = (user_id) => async (dispatch) => {
  const response = await API.get(`user/${user_id}/bills`);
  dispatch({ type: "FETCH_BILLS", payload: response.data });
};

//Fetch all purchases for a specific user
export const fetchPurchases = (user_id) => async (dispatch) => {
  const response = await API.get(`user/${user_id}/purchases`);
  dispatch({ type: "FETCH_PURCHASES", payload: response.data });
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

import axios from "axios";
import swal from "sweetalert";

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    await axios.post("/api/users/register", user);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
    window.location.href = "/login";
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: error });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const response = await axios.post("/api/users/login", user);
    // console.log(response);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const res = await axios.get("/api/users/getallusers");
    dispatch({ type: "GET_USERS_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAIL", payload: error });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.post("/api/users/deleteuser", {
      userId,
    });
    swal("User Deleted Success!", "success");
    window.location.href = "/admin/userlist";
  } catch (error) {
    swal("Error While Deleting User");
  }
};

export const ChangeUserType = (userid) => async (dispatch) => {
  try {
    await axios.post("/api/users/changeusertype", { userid });
    alert("Changes Success");

    window.location.href = "/admin/userlist";
  } catch (error) {
    console.log(error);
  }
};

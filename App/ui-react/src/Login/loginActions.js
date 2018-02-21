import axios from "axios";
import jwt from "jsonwebtoken";
import setAuth from "./../Auth/setAuth.js";
import { SET_CURRENT_USER } from "./../redux/types.js";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem("token");
    setAuth(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(userData) {
  return dispatch => {
    return axios.post("/CheckUser/user", userData).then(res => {
      const token = jwt.sign(
        {
          username: JSON.stringify(userData.nick)
        },
        "spoko"
      );

      localStorage.setItem("token", JSON.stringify(token));
      setAuth(token);
      dispatch(setCurrentUser(token));
    });
  };
}

import { GET_ERRORS } from "./types";
import axios from "axios";
//REGISTER USER

//history param was added when withRouter was implemented in Register.js

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

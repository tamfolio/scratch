import { getAccessToken, getRefreshToken } from "./token";

const def = {
  DONE: 'done',
  TRUE: 'true',
  FALSE: 'false',
  FETCH_ACCOUNT_DATA_REQUEST: "FETCH_ACCOUNT_DATA_REQUEST",
  FETCH_ACCOUNT_DATA_SUCCESS: "FETCH_ACCOUNT_DATA_SUCCESS",
  FETCH_ACCOUNT_DATA_FAILURE: "FETCH_ACCOUNT_DATA_FAILURE",
  RESET_ACCOUNT_DATA: "RESET_ACCOUNT_DATA",
  CONFIRM_ACCOUNT: "confirm account",
  LOGIN_VIEW: "login",
  REGISTER_VIEW: "register",
  IMAGE: "img",
  CARD: "card",
  MINUS: 'minus',
  PLUS: "plus",
  STRING: "string",
  BACKWARD: "backward",
  FORWARD: "forward",
  TESTIMONY: "testimony",
  GRAPHQL_URL: "https://betascratchv2.herokuapp.com/graphql",
  FETCH_API_DEFAULT: {
    method: 'post',
    credentials: 'include',
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Credentials": true
    }
  },
  NEW_ACCESS_TOKEN: () => {
    return {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${getRefreshToken()}`,
        "Access-Control-Allow-Credentials": true
      }
    };
  },

  DEFAULT_WITH_AUTH: () => {
    return {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${getAccessToken()}`,
        "Access-Control-Allow-Credentials": true
      }
    };
  },
  FORGOT_PASSWORD_VIEW: "forgot_password",
  ACTIVE: "active",
  FORGOT_PASS_EMAIL: "forgot_password_email",
  FORGOT_PASS_NEW_PASS: "forgot_password_new_pass"
};
export default def;
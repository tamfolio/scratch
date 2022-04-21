import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.credentials = "include";

const Axios = axios;
/**
 * 
 * @param query: `query { users { id name, email, ...rest}}` : String
 * @param variables: {email: e.email, password: e.password, ...rest}: Object 
 * @param [dispatch] : [Function]: Array
 * @param url : String
 */

export const graphql = (query = '', variables = {},
  dispatches = false,
  url = 'https://betascratchv2.herokuapp.com/graphql'
) => async (dispatch) => {
  try {
    dispatches && dispatch(dispatches[0]());
    const response = await axios.post(url, { query, variables });
    console.log(response.data)
    if (response.data.errors) {
      const errObj = { error: true, errorType: response.data.errors[0]?.error?.response?.name || response.data.errors[0]?.error?.name || response.data.errors[0]?.name, errorMessage: response.data.errors[0]?.error?.message || response.data.errors[0]?.message };
      if (dispatch) {
        dispatch(dispatches[2](errObj))
      } else {
        return errObj;
      }
    } else {
      if (dispatch) {
        dispatch(dispatches[1](response.data.data))
      } else {
        return { error: false, data: response.data.data }
      }
    }
  } catch (error) {
    console.log(error.message)
    const errorObj = { error: true, errorType: 'request', errorMessage: error.message };
    if (dispatches) {
      dispatch(dispatches[2](errorObj));
    } else {
      return errorObj;
    }
  }
};
export default Axios;
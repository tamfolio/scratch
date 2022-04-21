import axios from "axios";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import Router from 'next/router'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(async (req) => {
  const token = Cookies.get();
  if (!token.access_token || !token.refresh_token) {
    throw new axios.Cancel('invalid_token');
  }
  const access_token = token.access_token;
  const expired = Date.now >= (jwtDecode(access_token).exp * 1000);
  if (expired) {
    try {
      let error = await axios.post('https://betascratchv2.herokuapp.com/refresh_token', "{}");
      error = await error.data.error;
      if (error)
        throw new axios.Cancel('invalid_token');
      else
        return req;
    } catch (error) {
      throw new axios.Cancel('invalid_token')
    }
  }
  return req;
}, function (error) {
  return Promise.reject(error);
})

const Axios = axios;
/**
 * 
 * @param query: graphql` { users { id name, email, ...rest}}` 
 * @param variables: {email: e.email, password: e.password, ...rest} 
 * @param [dispatch] : Function
 * @param url : String
 */

export const graphql = (query = false, variables = {},
  dispatches = false,
  url = 'https://betascratchv2.herokuapp.com/graphql') => async (dispatch) => {
    try {
      dispatches && dispatch(dispatches[0]());
      const response = await axios.post(url, { query, variables });
      // console.log(response)
      if (response.data.errors) {
        const errObj = { error: true, errorMessage: response.data.errors[0].error.message };
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
      if (error.message === 'invalid_token') {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Router.replace('/?login');
        // window.location.href = '/?login'
      }
      const errorObj = { error: true, errorMessage: error.message };
      if (dispatches) {
        dispatch(dispatches[2](errorObj));
      } else {
        return errorObj;
      }
    }
  };
export default Axios;
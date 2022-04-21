import def from './enum';
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import Router from 'next/router'
import { getAccessToken } from '../store/graphql/onboading';
import { cookiesFromHead } from './token';

const checkCookieStatus = async () => {
  const errorObj = { error: true, message: 'invalid_token' };
  const token = Cookies.get();
  if (!token?.access_token || !token?.refresh_token) {
    throw errorObj;
  }
  const access_token = token.access_token;
  const expired = Date.now >= (jwtDecode(access_token).exp * 1000);
  if (expired) {
    try {
      let token = await fetch(def.GRAPHQL_URL, { ...def.NEW_ACCESS_TOKEN(), body: JSON.stringify({ query: getAccessToken }) });
      token = await token.json();
      if (token.error) {
        throw errorObj;
      }
      else {
        await cookiesFromHead(token)
        return true;
      }
    } catch (error) {
      throw errorObj;
    }
  }
  return true;
}

/**
 * 
 * @param query: graphql` { users { id name, email, ...rest}}` 
 * @param variables: {email: e.email, password: e.password, ...rest} 
 * @param [dispatch] : Function
 * @param url : String
 */

export const graphql = (query = false, variables = {},
  dispatches = false,
  url = def.GRAPHQL_URL) => async (dispatch) => {
    try {
      const token = await checkCookieStatus();
      console.log('token', token)
      if (token) {
        dispatches && dispatch(dispatches[0]());
        let response = await fetch(url, { ...def.DEFAULT_WITH_AUTH(), body: JSON.stringify({ query, variables }) });
        await cookiesFromHead(response);
        response = await response.json();
        console.log(response)
        if (response.errors) {
          const errObj = { error: true, errorMessage: response.errors[0].error.message };
          if (dispatch) {
            dispatch(dispatches[2](errObj))
          } else {
            return errObj;
          }
        } else {
          if (dispatch) {

            dispatch(dispatches[1](response.data))
            // dispatch(dispatches[1](response.data[Object.keys(response.data)[0]]))
          } else {
            return { error: false, data: response.data }
          }
        }
      }
    } catch (error) {
      if (error.message === 'invalid_token') {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        // Router.replace('/?login');
        window.location.href = '/?login'
      }
      const errorObj = { error: true, errorMessage: error.message };
      if (dispatches) {
        dispatch(dispatches[2](errorObj));
      } else {
        return errorObj;
      }
    }
  };
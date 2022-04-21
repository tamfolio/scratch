import def from './enum';
import { cookiesFromHead } from './token';

/**
 * 
 * @param query: `query { users { id name, email, ...rest}}` : String
 * @param variables: {email: e.email, password: e.password, ...rest}: Object 
 * @param [dispatch] : [Function]: Array
 * @param url : String
 */

export const graphql = (query = '', variables = {},
  dispatches = false,
  url = def.GRAPHQL_URL
) => async (dispatch) => {
  try {
    dispatches && dispatch(dispatches[0]());
    let response = await fetch(url, { ...def.FETCH_API_DEFAULT, body: JSON.stringify({ query, variables }) })
    await cookiesFromHead(response)
    response = await response.json();
    if (response.errors) {
      const errObj = { error: true, errorType: response.errors[0]?.error?.response?.name || response.errors[0]?.error?.name || response.errors[0]?.name, errorMessage: response.errors[0]?.error?.message || response.errors[0]?.message };
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
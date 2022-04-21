import Cookies from 'js-cookie';
import def from './enum';
import jwtDecode from "jwt-decode";

export const cookiesFromHead = async (response) => {
  try {
    const access_token = response.headers.get("access_token");
    const refresh_token = response.headers.get("refresh_token");
    Cookies.set("access_token", access_token, { expires: 1 / 96 });
    if (refresh_token) {
      Cookies.set("refresh_token", refresh_token, { expires: 15 });
    }
  } catch (error) {
  }
}


export const getAccessToken = () => {
  try {
    const token = Cookies.get();
    return token?.access_token || '';
  } catch (error) {
    return '';
  }
  return '';
}

export const getRefreshToken = () => {
  try {
    const token = Cookies.get();
    return token?.refresh_token || '';
  } catch (error) {
    return '';
  }
  return '';
}

const goodToken = async (token = null) => {
  const url = def.GRAPHQL_URL;
  try {
    if (token === null) {
      token = Cookies.get();
    }
    const { access_token, refresh_token } = token;
    if (!access_token || !refresh_token) {
      return false;
    }
    const expired = Date.now >= (jwtDecode(access_token).exp * 1000);
    if (expired) {
      console.log('executed goodToken', 'awaiting new access_token & refresh_token')
      const response = await fetch(url, {
        ...def.FETCH_API_DEFAULT,
        body: JSON.stringify({ query: `query {generateAccessToken}` })
      })
      await cookiesFromHead(response);
      const data = await response.json();
      if (data.error) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }

}

export default goodToken;
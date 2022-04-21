import jwtDecode from 'jwt-decode';
import { NextResponse, NextRequest } from 'next/server';
import goodToken from '../services/token';



// function isAuth(req, res) {
//   try {
//     const access_token = req.cookies['access_token'];
//     // res.cookie('hello', 'world')
//     // res.cookie('hello', 'world', {
//     //   path: '/',
//     //   maxAge: 1000 * 60 * 60 * 24 * 7,
//     //   httpOnly: true,
//     //   sameSite: 'strict',
//     //   domain: 'example.com',
//     // })
//     // res.clearCookie('hello')
//     // const access_token = req.cookies.access_token;
//     if (access_token) {
//       const expired = Date.now >= (jwtDecode(access_token).exp * 1000);
//       return expired ? false : true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return false;
//   }
// }


export async function middleware(req, res) {
  const url = req.nextUrl.clone()
  url.pathname = '/';
  const { pathname } = req.nextUrl;
  const token = req.cookies;
  switch (pathname) {
    case '/account':
      const isGood = await goodToken({ access_token: token?.access_token, refresh_token: token?.refresh_token });
      if (!isGood) {
        return NextResponse.redirect(url + '?login=true')
      }
    default:
      break;
  }
  return NextResponse.next()
}
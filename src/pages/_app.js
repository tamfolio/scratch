import Head from 'next/head';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Loading from '../components/loading';
import Dashboard from '../components/dashboard';
import { wrapper } from '../store';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/bootstrap.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'remixicon/fonts/remixicon.css'
import '../styles/globals.css'
import '../styles/dashboard.css'
import '../styles/home.css'
import '../styles/account.css'
import '../styles/invite.css'
import '../styles/chat.css'
import '../styles/how-to-play.css'
import '../styles/sports.css'
import '../styles/history.css'
import '../styles/my-games.css'
import '../styles/mobilenav.css'
import '../styles/winners.css'
import 'react-toastify/dist/ReactToastify.css';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const start = () => setLoading(true)
  const end = () => setLoading(false)

  return <>
    <Head>
      <link rel="icon" href="/favicon.ico?v1" />
      <title key="title">Betascratch</title>
      <link href="https://fonts.cdnfonts.com/css/circular-std" rel="stylesheet" />
      <meta key="description" name="description" content="Betascratch App." />
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Dashboard>
      {
        loading ? <Loading /> : <Component {...pageProps} />
      }
    </Dashboard>
  </>
}

export default wrapper.withRedux(MyApp);

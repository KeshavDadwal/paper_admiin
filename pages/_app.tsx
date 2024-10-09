import { Provider } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import '../styles/globals.css'
import { Store } from '../redux'
import { createWrapper } from "next-redux-wrapper";
import { GlobalC, Wrapper } from '../components/base_components';
import { Fragment, useEffect } from 'react'

if (process.env.NODE_ENV === "production") {
  console.log = () => { };
  console.warn = () => { };
}
function MyApp({ Component, pageProps }: any) {

  return (<Fragment>
    <Head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"/>
      <link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css"/>
      <link rel="stylesheet" href="/plugins/overlayScrollbars/css/OverlayScrollbars.min.css"/>
      <link rel="stylesheet" href="/dist/css/adminlte.min.css"></link>
      <link rel="stylesheet" href="/developer.css" />
    </Head>
    <Provider store={Store}>
      <GlobalC />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>

    <script src="/plugins/jquery/jquery.min.js"></script>
    <script src="/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
    <script src="/dist/js/adminlte.js"></script>

    <script src="/plugins/jquery-mousewheel/jquery.mousewheel.js"></script>
    <script src="/plugins/raphael/raphael.min.js"></script>
    <script src="/plugins/jquery-mapael/jquery.mapael.min.js"></script>
    <script src="/plugins/jquery-mapael/maps/usa_states.min.js"></script>
    <script src="/sweetalert/dist/sweetalert.min.js"></script>

  </Fragment>);
}

const makeStore = () => Store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

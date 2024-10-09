import * as React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Auth } from '../components/auth'
import { authRoute, unAuthRoute } from '../components/base_components'
import { Reflection } from '../components/dashboard';
import { login_state_to_props, user_logout } from '../redux/login/Action'
import { home_system_state_to_props, system_state_to_props } from '../redux/system/Action'
import { ERROR } from '../redux/Types';
import { Provider } from 'react-redux'
import { Store } from '../redux'
import styles from '../styles/Home.module.css'
import { createWrapper } from 'next-redux-wrapper';
import TestData from '@/components/login/TestData';

const AuthComponent = unAuthRoute(Auth);
function Home() {

  const { isAuthenticated, isSetProfile, loading, isSetReminder } = useSelector(home_system_state_to_props, shallowEqual);

  const renderBody = useMemo(() => {

    if (loading) return (
      <main className={styles.main}>
        <img src="/images/loader.gif" height="30" />
      </main>
    );

    if (isAuthenticated) {
      return <Reflection />;
    }

    return (
      <AuthComponent />
    );
  }, [isAuthenticated, isSetProfile, loading]);

  return (
    <>
        <Head>
          <title>Paper | Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {
          renderBody
        }
    </>
  )
}

const makeStore = () => Store;
const wrapper = createWrapper(makeStore);

const Index = authRoute(Home);

const Root = () => {
   return <>
      <Provider store={Store}>
        <Index />
      </Provider>
    </>
}

export default wrapper.withRedux(Root);
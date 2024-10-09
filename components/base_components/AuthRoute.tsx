import React, { Component, memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { shallowEqual, useSelector } from 'react-redux';
import { system_state_to_props } from '../../redux/system/Action';
import { useRouter } from 'next/router';

export default function authRoute(component: any) {

    const AsyncFunc = () => {

        const { isAuthenticated, loading } = useSelector(system_state_to_props, shallowEqual);
        const router = useRouter();

        useEffect(() => {
            console.log("router ===> ", router);
            if(typeof isAuthenticated === "boolean" && !isAuthenticated && !loading){
                router.push(`/auth/login?redirect=${router.asPath}`);
            }
        }, [isAuthenticated, loading]);

        const Loading = <h1>Loading...</h1>;
        const Component = component || Loading;

        return <Component />;
    }

    return memo(AsyncFunc);
}

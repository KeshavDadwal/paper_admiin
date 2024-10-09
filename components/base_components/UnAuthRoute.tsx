import React, { Component, memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { shallowEqual, useSelector } from 'react-redux';
import { system_state_to_props } from '../../redux/system/Action';
import { useRouter } from 'next/router';

const querystring = (name: any, url = window.location.href) => {
    name = name.replace(/[[]]/g, "\\$&");

    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return "";
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function unAuthRoute(component: any) {

    const AsyncFunc = () => {

        const { isAuthenticated, loading } = useSelector(system_state_to_props, shallowEqual);
        const router = useRouter();

        useEffect(() => {
            if(typeof isAuthenticated === "boolean" && isAuthenticated && !loading){
                const redirect = querystring("redirect");
                const url = redirect === "" || redirect === null ? "/" : redirect;

                router.push(url);
            }
        }, [isAuthenticated, loading]);

        const Loading = <h1>Loading...</h1>;
        const Component = component || Loading;

        return <Component />;
    }

    return memo(AsyncFunc);
}

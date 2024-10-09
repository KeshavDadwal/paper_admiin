import { memo, useCallback, useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SignupForm } from "../../../components/signup";
import { resetSignupState, signup_state_to_props } from "../../../redux/signup/Action";
import { ERROR } from "../../../redux/Types";
import Head from 'next/head';
import { unAuthRoute } from "../../../components/base_components";
import { useRouter } from "next/router";

function Signup() {
    console.log("Page ===> Signup");

    const dispatch = useDispatch();
    const router = useRouter();
    
    const { status, message } = useSelector(signup_state_to_props, shallowEqual);

    useEffect(() => {

        return (() => {
            dispatch(resetSignupState());
        });
    }, [])

    const _responseMessage = useMemo(() => {
        if (status !== ERROR || !message) return;

        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }, [message]);

    const openUrl = useCallback((path: string) => {
        if(!path) return;

        router.push(path);
    }, []);

    return (
        <>
            <Head>
                <title>Paper | Signup</title>
            </Head>
            <div className="overlay"></div>
            <div className="loginContainer bgImg">
                <div className="login-wrapper">
                    <div className="logo loginLogo"><a><img src="/images/logo.png" /></a></div>
                    <div className="logoName mb-4">Blossom</div>
                    <div className="loginTitle py-3">Welcome to Blossom!</div>
                    <a className="cross" onClick={openUrl.bind(Signup, "/")}><img src="/images/cross.png" /></a>
                    {_responseMessage}
                    <SignupForm />
                    {/* <div className="or">or</div>
                            <div className="socialOuter">
                                <a><i className="uil uil-linkedin"></i></a>
                                <a><i className="uil uil-google"></i></a>
				        </div> */}
                </div>
            </div>
        </>
    )
}

export default memo(unAuthRoute(Signup));
import { memo, useCallback, useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { login_state_to_props, resetLoginState } from "../../../redux/login/Action";
import { ERROR } from "../../../redux/Types";
import Head from 'next/head';
import { unAuthRoute } from "../../../components/base_components";
import { LoginForm } from '../../../components/login';
import { useRouter } from "next/router";

function Login() {
    console.log("Page ===> Login");

    const dispatch = useDispatch();
    const router = useRouter();
    const { status, message } = useSelector(login_state_to_props, shallowEqual);

    useEffect(() => {

        return (() => {
            dispatch(resetLoginState());
        });
    }, []);

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
        if (!path) return;

        router.push(path);
    }, []);

    return (
        <>
            <Head>
                <title>PAPER | Login</title>
            </Head>
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="#"><b>PAPER</b>Admin</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p data-testid="l1" className="login-box-msg">Sign in to start your session</p>

                            {_responseMessage}
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>




            {/* <div className="overlay"></div>
            <div className="loginContainer bgImg">
                <div className="login-wrapper">
                    <div className="logo loginLogo"><a><img src="/images/logo.png" /></a></div>
                    <div className="logoName mb-4">Blossom</div>
                    <div className="loginTitle pt-2 pb-5">Welcome back to Blossom!</div>
                    <a className="cross" onClick={openUrl.bind(this, "/")}><img src="/images/cross.png" /></a>

                    <div className="signupBtnOuter mt-2">
                        <LinkedinLogin label={"Log In with Linkedin"} />
                        <GoogleLogin label={"Log In with Google"} />
                    </div>

                    <div className="or">or log in with email</div>
                    {_responseMessage}
                    <LoginForm />
                </div>
            </div> */}
        </>
    )
}

export default memo(unAuthRoute(Login));
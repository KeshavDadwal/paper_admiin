import { memo, useCallback, useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ERROR, FORGOT_PASSWORD_FORM_EMAIL, SUCCESS } from "../../../redux/Types";
import Head from 'next/head';
import { forgot_password_state_to_props, resetForgotPasswordState, updateForgotPasswordFormData } from "../../../redux/forgotpassword/Action";
import { ForgotPasswordForm } from "../../../components/forgot_password";
import { unAuthRoute } from "../../../components/base_components";
import { useRouter } from "next/router";
import { updateResetPasswordFormData } from "../../../redux/resetpassword/Action";

function ForgotPassword() {
    console.log("Page ===> Forgot Password");

    const dispatch = useDispatch();
    const router = useRouter();
    const { status, message } = useSelector(forgot_password_state_to_props, shallowEqual);

    useEffect(() => {

        return (() => {
            dispatch(resetForgotPasswordState());
        });
    }, []);

    const _responseMessage = useMemo(() => {
        if (!message) return;

        switch (status) {
            case SUCCESS:
                dispatch(updateForgotPasswordFormData({
                    [FORGOT_PASSWORD_FORM_EMAIL]: ""
                }));
                return (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {message}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                );
            case ERROR:
                return (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {message}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                );
        }
    }, [message]);

    const openUrl = useCallback((path: string) => {
        if (!path) return;

        router.push(path);
    }, []);

    return (
        <>
            <Head>
                <title>Paper | Forgot Password</title>
            </Head>
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="#"><b>Paper</b>Admin</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
                            {_responseMessage}
                            <ForgotPasswordForm />
                        </div>
                    </div>
                </div>
            </div>






            {/* <div className="overlay"></div>
            <div className="loginContainer bgImg">
                <div className="login-wrapper">
                    <div className="logo loginLogo"><a><img src="/images/logo.png" /></a></div>
                    <div className="logoName mb-4">Blossom</div>
                    <div className="loginTitle py-3">Welcome to Blossom!</div>
                    <a className="cross" onClick={openUrl.bind(this, "/")}><img src="/images/cross.png" /></a>
                    {_responseMessage}
                    <ForgotPasswordForm />
                </div>
            </div> */}
        </>
    )
}

export default memo(unAuthRoute(ForgotPassword));
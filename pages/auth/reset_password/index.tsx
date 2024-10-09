import { memo, useCallback, useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ERROR, SUCCESS } from "../../../redux/Types";
import Head from 'next/head';
import { forgot_password_state_to_props, resetForgotPasswordState } from "../../../redux/forgotpassword/Action";
import { useRouter } from 'next/router'
import { ResetPasswordForm } from "../../../components/reset_password";
import { resetResetPasswordState, reset_password_state_to_props } from "../../../redux/resetpassword/Action";
import { unAuthRoute } from "../../../components/base_components";

function ResetPassword(props: any) {

    const dispatch = useDispatch();
    const router = useRouter();
    const { status, message } = useSelector(reset_password_state_to_props, shallowEqual);

    useEffect(() => {

        return (() => {
            dispatch(resetResetPasswordState());
        });
    }, []);

    const openUrl = useCallback((path: string) => {
        if (!path) return;

        router.push(path);
    }, []);

    const _responseMessage = useMemo(() => {
        if (!message) return;

        switch (status) {
            case SUCCESS:
                openUrl("/auth/login");
                break;
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

    return (
        <>
            <Head>
                <title>Paper | Reset Password</title>
            </Head>
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="#"><b>Paper</b>Admin</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">You are only one step a way from your new password, recover your password now.</p>
                            {_responseMessage}
                            <ResetPasswordForm />
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
                    <ResetPasswordForm />
                </div>
            </div> */}
        </>
    )
}

export default memo(unAuthRoute(ResetPassword));
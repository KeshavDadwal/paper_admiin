import { Fragment, memo, useCallback, useEffect, useMemo } from "react";
import Link from 'next/link'
import { useRouter } from "next/dist/client/router";
import { ERROR } from "../../redux/Types";
import { login_state_to_props, resetLoginState } from "../../redux/login/Action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function Auth() {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		
		return (() => {
			dispatch(resetLoginState());
		});
	}, []);

	const { status, message } = useSelector(login_state_to_props, shallowEqual);

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

	const openUrl = useCallback((url: any) => {
		if (!url) return;

		router.push(url);
	}, []);

	return (
		<Fragment>
			<div className="overlay"></div>
			<div className="loginContainer bgImg">
				<div className="login-wrapper">
					<div className="logo loginLogo"><a><img src="images/logo.png" /></a></div>
					<a className="simpleLogin" onClick={openUrl.bind(Auth, "/auth/login")}>Log In</a>
					<div className="logoName">Blossom</div>
					<div className="loginTitle">Be happier. Feel more fulfilled. Thrive in your career.</div>
					<p>Experience the power of regular reflection. Proven by research to improve your well-being and productivity.</p>
					<p className="mt-5">You already think about your day, why not use Blossom to grow from it?</p>

					<div className="signupBtnOuter">
						{_responseMessage}
						<a className="lineBtn" onClick={openUrl.bind(Auth, "/auth/signup")}>Sign up with email</a>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default memo(Auth);
import React, { memo, useCallback, useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Helper from "../../apis/Helper";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { SIGNUP_FORM_EMAIL, SIGNUP_FORM_PASSWORD, SIGNUP_ERRORS, SUCCESS, ERROR, SIGNUP_FORM_FIRST_NAME, SIGNUP_FORM_LAST_NAME } from "../../redux/Types";
import { useRouter } from "next/dist/client/router";
import { signup_form_state_to_props, user_signup, updateSignupUIConstraints, updateSignupFormData } from "../../redux/signup/Action";

const Signup = () => {
  console.log("Page ===> Signup Form");
  const dispatch = useDispatch();
  const router = useRouter();
  const [passwordInputType, setPasswordInputType] = useState("password");

  const { email, password, first_name, last_name, loading, errors } = useSelector(signup_form_state_to_props, shallowEqual);

  const onChange = useCallback(async (e: any) => {
    const { name = "", value = "", checked = false } = e && e.target ? e.target : {};

    dispatch(updateSignupFormData({
      [name]: value,
    }));
  }, []);

  const getSignupBtnClass = useMemo(() => {
    if (loading) return "btn btn-primary btn-md xs-block m-loader";

    return "btn btn-primary btn-md xs-block";
  }, [loading]);

  const submit = useCallback((e: any) => {
    e.preventDefault();

    if (loading) return;

    const requestBody = { email, password };

    Helper.validate(Object.keys(requestBody), requestBody)
      .then(({ status, response }) => {
        if (status) {
          dispatch(updateSignupUIConstraints({
            [SIGNUP_ERRORS]: []
          }));

          dispatch(user_signup());
        } else
          dispatch(updateSignupUIConstraints({
            [SIGNUP_ERRORS]: response && response.length ? response : []
          }));
      })
      .catch(err => console.log(err));
  }, [email, password, loading]);

  /** On error */
  const isError = useCallback((key: any) => {
    if (errors && errors.length) {
      return errors.findIndex((ele: any) => ele.fieldName === key) > -1
        ? {
          status: true,
          message:
            errors[errors.findIndex((ele: any) => ele.fieldName === key)].message
        }
        : { status: false, message: "" };
    } else return { status: false, message: "" };
  }, [errors]);

  const _handleErrorMessage = (key: any) => {
    const data = isError(key);

    if (data && data.status)
      return <p className="text-right text-default">{data.message}</p>;

    return <div />;
  };

  const openUrl = useCallback((url: string) => {
    if (!url) return;

    router.push(url);
  }, []);

  const getPasswordIconClassName = useMemo(() => {
    switch (passwordInputType) {
      case "password":
        return "fa fa-eye-slash";
      case "text":
        return "fa fa-eye";
      default:
        return ""
    }
  }, [passwordInputType]);

  const setPasswordType = useCallback(() => {
    switch (passwordInputType) {
      case "password":
        setPasswordInputType("text");
        break;
      case "text":
        setPasswordInputType("password");
        break;
    }
  }, [passwordInputType]);

  return (
    <div>
      <form className="loginOuter" onSubmit={submit}>
        <div className="formField">
          <label>Email</label>
          <div className="fieldOuter">
            <input type="text" placeholder="Enter your email" name={SIGNUP_FORM_EMAIL} onChange={onChange} value={email} />
          </div>
          {_handleErrorMessage("email")}
        </div>
        <div className="formField mb-2">
          <label>Password</label>
          <div className="fieldOuter fieldIcon">
            <input type={passwordInputType} placeholder="Enter password" name={SIGNUP_FORM_PASSWORD} onChange={onChange} value={password} />
            <i className={getPasswordIconClassName} onClick={setPasswordType}></i>
          </div>
          {_handleErrorMessage("password")}
        </div>
        <div className="mb-4 text-left">
          <label className="customeCheckbox"><input type="checkbox" /> Remember me</label>
        </div>
        <button className="lineBtn blueBtn mt-5 w-100">{
          loading ? "Please Wait..." : "Sign Up"
        }</button>
      </form>
      <div className="alreadyAccount" onClick={openUrl.bind(this, "/auth/login")}>Already have an account? <a>Log In</a></div>
    </div>
  );
};

export default memo(Signup);
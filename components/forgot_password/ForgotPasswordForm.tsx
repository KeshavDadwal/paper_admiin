import React, { memo, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import Helper from "../../apis/Helper";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { forgot_password_form_state_to_props, updateForgotPasswordFormData, updateForgotPasswordUIConstraints, user_forgot_password } from "../../redux/forgotpassword/Action";
import { FORGOT_PASSWORD_ERRORS, FORGOT_PASSWORD_FORM_EMAIL } from "../../redux/Types";

const ForgotPassword = () => {
  console.log("Page ===> Forgot Password Form");
  const dispatch = useDispatch();
  const router = useRouter();
  const { email, loading, errors } = useSelector(forgot_password_form_state_to_props, shallowEqual);

  const onChange = useCallback(async (e: any) => {
    const { name = "", value = "", checked = false } = e && e.target ? e.target : {};

    dispatch(updateForgotPasswordFormData({
      [name]: value,
    }));
  }, []);

  const submit = useCallback((e: any) => {
    e.preventDefault();

    if (loading) return;

    const requestBody = { email };

    Helper.validate(Object.keys(requestBody), requestBody)
      .then(({ status, response }) => {
        if (status) {
          dispatch(updateForgotPasswordUIConstraints({
            [FORGOT_PASSWORD_ERRORS]: []
          }));

          dispatch(user_forgot_password());
        } else
          dispatch(updateForgotPasswordUIConstraints({
            [FORGOT_PASSWORD_ERRORS]: response && response.length ? response : []
          }));
      })
      .catch(err => console.log(err));
  }, [email, loading]);

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
      return <p className="text-right text-danger">{data.message}</p>;

    return <div />;
  };

  const openUrl = useCallback((url: string) => {
    if (!url) return;

    router.push(url);
  }, []);

  return (
    <div>
      <form onSubmit={submit}>
        <div className="input-group mt-3">
          <input type="email" className="form-control" placeholder="Email" name={FORGOT_PASSWORD_FORM_EMAIL} onChange={onChange} value={email} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        {_handleErrorMessage("email")}
        <div className="row mt-3">
          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-block">{
              loading ? "Please Wait..." : "Request new password"
            }</button>
          </div>
        </div>
      </form>

      <p className="mt-3 mb-1">
        <a href="#" onClick={openUrl.bind(this, "/auth/login")}>Login</a>
      </p>

      {/* 
      <form className="loginOuter" onSubmit={submit}>
        <div className="formField">
          <label>Email</label>
          <div className="fieldOuter">
            <input type="text" placeholder="Enter your email" name={FORGOT_PASSWORD_FORM_EMAIL} onChange={onChange} value={email} />
          </div>
          {_handleErrorMessage("email")}
        </div>
        <button className="lineBtn blueBtn mt-5 w-100">{
          loading ? "Please Wait..." : "Forgot Password"
        }</button>
      </form> */}
    </div>
  );
};

export default memo(ForgotPassword);
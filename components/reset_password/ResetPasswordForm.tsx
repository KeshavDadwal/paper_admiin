import React, { memo, useCallback, useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Helper from "../../apis/Helper";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { reset_password_form_state_to_props, user_reset_password, updateResetPasswordUIConstraints, updateResetPasswordFormData } from "../../redux/resetpassword/Action";
import { useRouter } from 'next/router'
import { RESET_PASSWORD_ERRORS, RESET_PASSWORD_FORM_CONFIRM_PASSWORD, RESET_PASSWORD_FORM_PASSWORD, RESET_PASSWORD_FORM_TOKEN, RESET_PASSWORD_FORM_UID } from "../../redux/Types";

const ResetPasswordForm = () => {
  console.log("Page ===> Reset Password Form");
  const dispatch = useDispatch();
  const router = useRouter();
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState("password");

  const { password, confirm_password, loading, errors } = useSelector(reset_password_form_state_to_props, shallowEqual);

  useEffect(() => {
    const { uid, token } = router.query || {};

    dispatch(updateResetPasswordFormData({
      [RESET_PASSWORD_FORM_UID]: uid,
      [RESET_PASSWORD_FORM_TOKEN]: token
    }));
  }, [router.query]);

  const onChange = useCallback((e: any) => {
    const { name = "", value = "" } = e && e.target ? e.target : {};

    dispatch(updateResetPasswordFormData({
      [name]: value,
    }));
  }, []);

  const getLoginBtnClass = useMemo(() => {
    if (loading) return "btn btn-primary btn-md xs-block m-loader";

    return "btn btn-primary btn-md xs-block";
  }, [loading]);

  const submit = useCallback((e: any) => {
    e.preventDefault();

    if (loading) return;

    const requestBody = { password, confirm_password };

    Helper.validate(Object.keys(requestBody), requestBody)
      .then(({ status, response }) => {
        if (status) {
          dispatch(updateResetPasswordUIConstraints({
            [RESET_PASSWORD_ERRORS]: []
          }));

          dispatch(user_reset_password());
        } else
          dispatch(updateResetPasswordUIConstraints({
            [RESET_PASSWORD_ERRORS]: response && response.length ? response : []
          }));
      })
      .catch(err => console.log(err));
  }, [password, confirm_password, loading]);

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

    router.prefetch(url);
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

  const getConfirmPasswordIconClassName = useMemo(() => {
    switch (confirmPasswordInputType) {
      case "password":
        return "fa fa-eye-slash";
      case "text":
        return "fa fa-eye";
      default:
        return ""
    }
  }, [confirmPasswordInputType]);

  const setConfirmPasswordType = useCallback(() => {
    switch (confirmPasswordInputType) {
      case "password":
        setConfirmPasswordInputType("text");
        break;
      case "text":
        setConfirmPasswordInputType("password");
        break;
    }
  }, [confirmPasswordInputType]);

  return (
    <div>
      <form onSubmit={submit}>
        <div className="input-group mt-3">
          <input type={passwordInputType} className="form-control" name={RESET_PASSWORD_FORM_PASSWORD} placeholder="Enter password" onChange={onChange} value={password} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
        </div>
        {_handleErrorMessage("password")}
        <div className="input-group mt-3">
          <input type={confirmPasswordInputType} className="form-control" name={RESET_PASSWORD_FORM_CONFIRM_PASSWORD} placeholder="Enter confirm password" onChange={onChange} value={confirm_password} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
        </div>
        {_handleErrorMessage("confirm_password")}
        <div className="row mt-3">
          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-block">{
              loading ? "Please Wait..." : "Change Password"
            }</button>
          </div>
        </div>
      </form>
      <p className="mb-1">
        <a href="#" onClick={openUrl.bind(this, "/auth/login")}>Login</a>
      </p>
    </div>
  );
};

export default memo(ResetPasswordForm);
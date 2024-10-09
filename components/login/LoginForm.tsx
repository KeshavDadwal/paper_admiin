import React, { memo, useCallback, useMemo, useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";

import Helper from "../../apis/Helper";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { updateLoginFormData, login_form_state_to_props, updateLoginUIConstraints, user_login } from '../../redux/login/Action';
import { LOGIN_FORM_EMAIL, LOGIN_FORM_PASSWORD, LOGIN_FORM_REMEMBER_ME, LOGIN_ERRORS, SUCCESS, ERROR } from "../../redux/Types";
import { useRouter } from "next/dist/client/router";
import AORStorage from "../../apis/AORStorage";
import { Dropdown } from 'primereact/dropdown';

const LoginForm = () => {
  console.log("Page ===> Login Form");
  const dispatch = useDispatch();
  const router = useRouter();
  const { email, password, loading, remember_me, errors } = useSelector(login_form_state_to_props, shallowEqual);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [valueOne, setValueOne] = useState<any>(undefined);

  const onValueChange = useCallback((e: { value: any}) => {
    const { value } = e || {};

    console.log("value ===> ", value);
    setValueOne(value);
  }, []);

  const onChange = useCallback(async (e: any) => {
    const { name = "", value = "", checked = false } = e && e.target ? e.target : {};

    switch (name) {
      case LOGIN_FORM_REMEMBER_ME:
        dispatch(updateLoginFormData({
          [name]: checked
        }));
        break;
      default:
        dispatch(updateLoginFormData({
          [name]: value,
        }));
    }
    AORStorage.storeAORLoginRememberMe({ checked });

  }, []);

  useEffect(() => {
    (async () => {
      const { status, response = {} } = await AORStorage.getAORLoginRememberMe();
      const { checked } = response;

      if (checked) {
        dispatch(updateLoginFormData({
          [LOGIN_FORM_REMEMBER_ME]: checked
        }));
      } else {
        AORStorage.storeAORLoginRememberMe({ temp_checked: true }, 0);
      }
    })();
  }, []);

  const getLoginBtnClass = useMemo(() => {
    if (loading) return "btn btn-primary btn-md xs-block m-loader";

    return "btn btn-primary btn-md xs-block";
  }, [loading]);

  const submit = useCallback((e: any) => {
    e.preventDefault();

    if (loading) return;

    const requestBody = { email, user_password: password };

    Helper.validate(Object.keys(requestBody), requestBody)
      .then(({ status, response }) => {
        if (status) {
          dispatch(updateLoginUIConstraints({
            [LOGIN_ERRORS]: []
          }));

          dispatch(user_login());
        } else
          dispatch(updateLoginUIConstraints({
            [LOGIN_ERRORS]: response && response.length ? response : []
          }));
      })
      .catch(err => console.log(err));
  }, [email, password, loading, remember_me]);

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
      return <p className="text-right text-danger" style={{ margin: 0, padding: 0 }}>{data.message}</p>;

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
      <form onSubmit={submit}>
        <div className="input-group mt-3">
          <input type="email" className="form-control" placeholder="Email" name={LOGIN_FORM_EMAIL} onChange={onChange} value={email} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        {_handleErrorMessage("email")}
        <div className="input-group mt-3">
          <input type="password" className="form-control" placeholder="Password" name={LOGIN_FORM_PASSWORD} onChange={onChange} value={password} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
        </div>
        {_handleErrorMessage("user_password")}
        <div className="row mt-3">
          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-block">{
              loading ? "Please Wait..." : "Sign In"
            }</button>
          </div>
        </div>
      </form>
      {/* <p className="mb-1">
        <a href="#" onClick={openUrl.bind(this, "/auth/forgot_password")}>I forgot my password</a>
      </p> */}
    </div>
  );
};

export default memo(LoginForm);
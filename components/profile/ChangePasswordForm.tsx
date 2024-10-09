import React, { memo, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import Helper from "../../apis/Helper";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { updateUpdateProfileFormData, updateUpdateProfileUIConstraints, change_password_form_state_to_props, user_change_password } from "../../redux/updateprofile/Action";
import { UPDATE_PROFILE_ERRORS, UPDATE_PROFILE_FORM_PASSWORD, UPDATE_PROFILE_FORM_OLD_PASSWORD, UPDATE_PROFILE_FORM_CONFIRM_PASSWORD } from "../../redux/Types";

const ChangePasswordForm = () => {
    console.log("Page ===> Change Password Form");
    const dispatch = useDispatch();

    //Props
    const {
        password,
        confirm_password,
        old_password,

        loading,

        errors
    } = useSelector(
        change_password_form_state_to_props,
        shallowEqual
    );

    const onChange = useCallback((e: any) => {
        const { name, value } = e && e.target ? e.target : {} as any;

        dispatch(
            updateUpdateProfileFormData({
                [name]: value,
            })
        );
    }, []);

    const submit = useCallback(
        (e: any) => {
            e.preventDefault();

            if (loading) return;

            let requestBody = { password, old_password, confirm_password };

            Helper.validate(Object.keys(requestBody), requestBody)
                .then(({ status, response }) => {
                    if (status) {
                        dispatch(
                            updateUpdateProfileUIConstraints({
                                [UPDATE_PROFILE_ERRORS]: [],
                            })
                        );

                        dispatch(user_change_password())
                    } else
                        dispatch(
                            updateUpdateProfileUIConstraints({
                                [UPDATE_PROFILE_ERRORS]:
                                    response && response.length ? response : []
                            })
                        );
                })
                .catch((err) => console.log(err));
        }, [password, confirm_password, old_password, loading]);

    const getChangePasswordBtnClass = useMemo(() => {
        if (loading) return "btn btn-primary btn-md xs-block mt-4 m-loader";

        return "btn btn-primary btn-md xs-block mt-4";
    }, [loading]);

    /** On error */
    const isError = useCallback(
        (key: any) => {
            if (errors && errors.length) {
                return errors.findIndex((ele: any) => ele.fieldName === key) > -1
                    ? {
                        status: true,
                        message:
                            errors[errors.findIndex((ele: any) => ele.fieldName === key)]
                                .message,
                    }
                    : { status: false, message: "" };
            } else return { status: false, message: "" };
        },
        [errors]
    );

    const _handleErrorMessage = (key: any) => {
        const data = isError(key);

        if (data && data.status)
            return <p className="text-right text-danger">{data.message}</p>;

        return <div />;
    };

    return (
        <form onSubmit={submit}>
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="form-group">
                        <label>Old Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name={UPDATE_PROFILE_FORM_OLD_PASSWORD}
                            value={old_password}
                            onChange={onChange}
                            placeholder="Required" />
                        {_handleErrorMessage("old_password")}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name={UPDATE_PROFILE_FORM_PASSWORD}
                            value={password}
                            onChange={onChange}
                            placeholder="Required" />
                        {_handleErrorMessage("password")}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name={UPDATE_PROFILE_FORM_CONFIRM_PASSWORD}
                            value={confirm_password}
                            onChange={onChange}
                            placeholder="Required" />
                        {_handleErrorMessage("confirm_password")}
                    </div>
                </div>
            </div>
            <button type="submit" className={getChangePasswordBtnClass}>
                Update Profile
        </button>
        </form>
    );
};

export default memo(ChangePasswordForm);

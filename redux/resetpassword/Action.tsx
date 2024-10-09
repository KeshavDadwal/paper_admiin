import Utils from '../../components/util/Utils';
import { reset_password } from "../../apis/APIs";
import { RESET_PASSWORD_RESET, RESET_PASSWORD_UPDATE, RESET_PASSWORD_ROOT, RESET_PASSWORD_KEY, RESET_PASSWORD_FORM, RESET_PASSWORD_REQEUST_LOADING, RESET_PASSWORD_REQUEST_STATUS, STATUS, MESSAGE, EMPTY, ERROR, SERVER_SUCCESS, RESET_PASSWORD_FORM_UID, RESET_PASSWORD_FORM_TOKEN, RESET_PASSWORD_FORM_PASSWORD, SUCCESS, RESET_PASSWORD_ERRORS, RESET_PASSWORD_FORM_CONFIRM_PASSWORD, SERVER_VALIDATION_ERROR } from '../Types';

/** User reset password */
export const user_reset_password = () => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateResetPasswordUIConstraints({
                [RESET_PASSWORD_REQEUST_LOADING]: true,
                [RESET_PASSWORD_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const data = getState()[RESET_PASSWORD_ROOT][RESET_PASSWORD_KEY];
            const form_data = data && data[RESET_PASSWORD_FORM] ? data[RESET_PASSWORD_FORM] : {};
            const uid = form_data && form_data[RESET_PASSWORD_FORM_UID] ? form_data[RESET_PASSWORD_FORM_UID] : "";
            const forgot_password_access_token = form_data && form_data[RESET_PASSWORD_FORM_TOKEN] ? form_data[RESET_PASSWORD_FORM_TOKEN] : "";
            const password = form_data && form_data[RESET_PASSWORD_FORM_PASSWORD] ? form_data[RESET_PASSWORD_FORM_PASSWORD] : "";

            const body = {
                uid,
                forgot_password_access_token,
                password
            }
            const res = await reset_password(body);

            if (res && res.message) {
                let message = undefined;
                
                if (res.error_stack) {
                    message = res.error_stack.message ? res.error_stack.message : message;
                    message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
                    message = res.error_stack.error_message ? res.error_stack.error_message : message;
                }

                switch (res.message) {
                    case SERVER_SUCCESS:

                        dispatch(updateResetPasswordUIConstraints({
                            [RESET_PASSWORD_REQEUST_LOADING]: false,
                            [RESET_PASSWORD_REQUEST_STATUS]: {
                                [STATUS]: SUCCESS,
                                [MESSAGE]: res && res.data && res.data.message ? res.data.message : ""
                            }
                        }));

                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = message ? message : "Validation error";
                        dispatch(updateResetPasswordUIConstraints({
                            [RESET_PASSWORD_REQEUST_LOADING]: false,
                            [RESET_PASSWORD_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                        break;
                    default:
                        message = message ? message : "Internal server error";
                        dispatch(updateResetPasswordUIConstraints({
                            [RESET_PASSWORD_REQEUST_LOADING]: false,
                            [RESET_PASSWORD_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                }
            }
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
            dispatch(updateResetPasswordUIConstraints({
                [RESET_PASSWORD_REQEUST_LOADING]: false,
                [RESET_PASSWORD_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** Get Reset Password Form State */
export const reset_password_form_state_to_props = ({ reset_password }: any) => {
    const reset_password_key = reset_password && reset_password[RESET_PASSWORD_KEY] ? reset_password[RESET_PASSWORD_KEY] : undefined;
    const reset_password_form = reset_password_key && reset_password_key[RESET_PASSWORD_FORM] ? reset_password_key[RESET_PASSWORD_FORM] : undefined;

    const password = reset_password_form && reset_password_form[RESET_PASSWORD_FORM_PASSWORD] ? reset_password_form[RESET_PASSWORD_FORM_PASSWORD] : "";
    const confirm_password = reset_password_form && reset_password_form[RESET_PASSWORD_FORM_CONFIRM_PASSWORD] ? reset_password_form[RESET_PASSWORD_FORM_CONFIRM_PASSWORD] : "";

    const errors = reset_password_key && reset_password_key[RESET_PASSWORD_ERRORS] ? reset_password_key[RESET_PASSWORD_ERRORS] : [];
    
    const loading = reset_password_key && reset_password_key[RESET_PASSWORD_REQEUST_LOADING] ? reset_password_key[RESET_PASSWORD_REQEUST_LOADING] : false;

    return ({
        password,
        confirm_password,
        
        loading,

        errors
    })
}

/** Get Reset Password State */
export const reset_password_state_to_props = ({ reset_password }: any) => {
    const reset_password_key = reset_password && reset_password[RESET_PASSWORD_KEY] ? reset_password[RESET_PASSWORD_KEY] : undefined;

    const request_status = reset_password_key && reset_password_key[RESET_PASSWORD_REQUEST_STATUS] ? reset_password_key[RESET_PASSWORD_REQUEST_STATUS] : undefined;
    const status = request_status && request_status[STATUS] ? request_status[STATUS] : "";
    const message = request_status && request_status[MESSAGE] ? request_status[MESSAGE] : "";
    
    return ({
        status,
        message
    })
}

/** Manage Form Data */
export const updateResetPasswordFormData = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[RESET_PASSWORD_ROOT][RESET_PASSWORD_KEY];
            const data = Object.assign(formData[RESET_PASSWORD_FORM], obj);

            dispatch(updateResetPasswordState(Object.assign(formData, {
                [RESET_PASSWORD_FORM]: data
            })));
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
        }
    }
}

/** Manage Reset Password UI Constraints */
export const updateResetPasswordUIConstraints = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[RESET_PASSWORD_ROOT][RESET_PASSWORD_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateResetPasswordState(data));
        } catch (error: any) {
            Utils.log("Update UI Constraints ===> error ", error);
        }
    }
}

/** Update reset password data state */
const updateResetPasswordState = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[RESET_PASSWORD_ROOT][RESET_PASSWORD_KEY];

            dispatch({
                type: RESET_PASSWORD_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error: any) {
            Utils.log("Update Reset Password State ===> error ", error);
        }
    }
}

/** Reset reset password data state */
export const resetResetPasswordState = () => {
    return (dispatch: any, getState: any) => {
        try {
            dispatch({
                type: RESET_PASSWORD_RESET,
                payload: {}
            })
        } catch (error: any) {
            Utils.log("Update Reset Password State ===> error ", error);
        }
    }
}
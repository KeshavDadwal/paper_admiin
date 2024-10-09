import Utils from '../../components/util/Utils';
import { forgot_password } from "../../apis/APIs";
import { FORGOT_PASSWORD_RESET, FORGOT_PASSWORD_UPDATE, FORGOT_PASSWORD_KEY, FORGOT_PASSWORD_ROOT, FORGOT_PASSWORD_FORM, FORGOT_PASSWORD_REQUEST_STATUS, STATUS, MESSAGE, ERROR, FORGOT_PASSWORD_REQEUST_LOADING, SERVER_VALIDATION_ERROR, SERVER_SUCCESS, FORGOT_PASSWORD_FORM_EMAIL, FORGOT_PASSWORD_ERRORS, EMPTY, SUCCESS } from '../Types';

/** User forgot password */
export const user_forgot_password = () => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateForgotPasswordUIConstraints({
                [FORGOT_PASSWORD_REQEUST_LOADING]: true,
                [FORGOT_PASSWORD_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const data = getState()[FORGOT_PASSWORD_ROOT][FORGOT_PASSWORD_KEY];
            const form_data = data && data[FORGOT_PASSWORD_FORM] ? data[FORGOT_PASSWORD_FORM] : {};
            const email = form_data && form_data[FORGOT_PASSWORD_FORM_EMAIL] ? form_data[FORGOT_PASSWORD_FORM_EMAIL] : "";

            const body = {
                email
            }
            const res = await forgot_password(body);

            if (res && res.message) {
                let message = undefined;
                
                if (res.error_stack) {
                    message = res.error_stack.message ? res.error_stack.message : message;
                    message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
                    message = res.error_stack.error_message ? res.error_stack.error_message : message;
                }

                switch (res.message) {
                    case SERVER_SUCCESS:

                        dispatch(updateForgotPasswordUIConstraints({
                            [FORGOT_PASSWORD_REQEUST_LOADING]: false,
                            [FORGOT_PASSWORD_REQUEST_STATUS]: {
                                [STATUS]: SUCCESS,
                                [MESSAGE]: res && res.data && res.data.message ? res.data.message : ""
                            }
                        }));

                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = message ? message : "Validation error";
                        dispatch(updateForgotPasswordUIConstraints({
                            [FORGOT_PASSWORD_REQEUST_LOADING]: false,
                            [FORGOT_PASSWORD_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                        break;
                    default:
                        message = message ? message : "Internal server error";
                        dispatch(updateForgotPasswordUIConstraints({
                            [FORGOT_PASSWORD_REQEUST_LOADING]: false,
                            [FORGOT_PASSWORD_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                }
            }
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
            dispatch(updateForgotPasswordUIConstraints({
                [FORGOT_PASSWORD_REQEUST_LOADING]: false,
                [FORGOT_PASSWORD_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** Get Forgot Password Form State */
export const forgot_password_form_state_to_props = ({ forgot_password }: any) => {
    const forgot_password_key = forgot_password && forgot_password[FORGOT_PASSWORD_KEY] ? forgot_password[FORGOT_PASSWORD_KEY] : undefined;
    const forgot_password_form = forgot_password_key && forgot_password_key[FORGOT_PASSWORD_FORM] ? forgot_password_key[FORGOT_PASSWORD_FORM] : undefined;

    const email = forgot_password_form && forgot_password_form[FORGOT_PASSWORD_FORM_EMAIL] ? forgot_password_form[FORGOT_PASSWORD_FORM_EMAIL] : "";

    const errors = forgot_password_key && forgot_password_key[FORGOT_PASSWORD_ERRORS] ? forgot_password_key[FORGOT_PASSWORD_ERRORS] : [];
    
    const loading = forgot_password_key && forgot_password_key[FORGOT_PASSWORD_REQEUST_LOADING] ? forgot_password_key[FORGOT_PASSWORD_REQEUST_LOADING] : false;

    return ({
        email,
        
        loading,

        errors
    })
}

/** Get Forgot Password State */
export const forgot_password_state_to_props = ({ forgot_password }: any) => {
    const forgot_password_key = forgot_password && forgot_password[FORGOT_PASSWORD_KEY] ? forgot_password[FORGOT_PASSWORD_KEY] : undefined;

    const request_status = forgot_password_key && forgot_password_key[FORGOT_PASSWORD_REQUEST_STATUS] ? forgot_password_key[FORGOT_PASSWORD_REQUEST_STATUS] : undefined;
    const status = request_status && request_status[STATUS] ? request_status[STATUS] : "";
    const message = request_status && request_status[MESSAGE] ? request_status[MESSAGE] : "";
    
    return ({
        status,
        message
    })
}

/** Manage Form Data */
export const updateForgotPasswordFormData = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[FORGOT_PASSWORD_ROOT][FORGOT_PASSWORD_KEY];
            const data = Object.assign(formData[FORGOT_PASSWORD_FORM], obj);

            dispatch(updateForgotPasswordState(Object.assign(formData, {
                [FORGOT_PASSWORD_FORM]: data
            })));
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
        }
    }
}

/** Manage Forgot Password UI Constraints */
export const updateForgotPasswordUIConstraints = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[FORGOT_PASSWORD_ROOT][FORGOT_PASSWORD_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateForgotPasswordState(data));
        } catch (error: any) {
            Utils.log("Update UI Constraints ===> error ", error);
        }
    }
}

/** Update forgot password data state */
const updateForgotPasswordState = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[FORGOT_PASSWORD_ROOT][FORGOT_PASSWORD_KEY];

            dispatch({
                type: FORGOT_PASSWORD_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error: any) {
            Utils.log("Update Forgot Password State ===> error ", error);
        }
    }
}

/** Reset forgot password data state */
export const resetForgotPasswordState = () => {
    return (dispatch: any, getState: any) => {
        try {
            dispatch({
                type: FORGOT_PASSWORD_RESET,
                payload: {}
            })
        } catch (error: any) {
            Utils.log("Update Forgot Password State ===> error ", error);
        }
    }
}
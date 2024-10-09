import Utils from '../../components/util/Utils';
import { SIGNUP_ROOT, SIGNUP_KEY, SIGNUP_FORM, SIGNUP_UPDATE, SIGNUP_RESET, SIGNUP_REQEUST_LOADING, SIGNUP_REQUEST_STATUS, STATUS, MESSAGE, SUCCESS, EMPTY, ERROR, SERVER_VALIDATION_ERROR, SERVER_ERROR, SERVER_SUCCESS, SIGNUP_FORM_EMAIL, SIGNUP_FORM_FIRST_NAME, SIGNUP_FORM_LAST_NAME, SIGNUP_FORM_PASSWORD, SYSTEM_DATA_IS_AUTHENTICATED, USER_DATA, SIGNUP_FORM_ACCOUNT_TYPE, SIGNUP_FORM_ACCREDITED_INVESTOR, SIGNUP_FORM_I_AGREE_TERMS_AND_PRIVACY_POLICY, SIGNUP_ERRORS, SIGNUP_FORM_ACCOUNT_TYPE_INVESTMENT_OWNER, SIGNUP_FORM_ACCOUNT_TYPE_INVESTOR, SIGNUP_FORM_ACCREDITED_INVESTOR_TYPE_YES, SIGNUP_FORM_ACCREDITED_INVESTOR_TYPE_NO, SIGNUP_FORM_ACCREDITED_INVESTOR_TYPE_I_DONT, SIGNUP_FORM_ACCREDITED_INVESTOR_ANNUAL_INCOME, SIGNUP_FORM_ACCREDITED_INVESTOR_NETWORTH, SIGNUP_FORM_ACCREDITED_INVESTOR_LAST_OFFERING, SIGNUP_FORM_ACCREDITED_INVESTOR_AGREE_TERMS, SYSTEM_DATA_KEY, SYSTEM_DATA_ACCREDITED_INVESTOR_DATA, SYSTEM_DATA_IS_SETUP_REMINDER, SYSTEM_DATA_IS_SETUP_PROFILE } from '../Types';
import AORStorage from '../../apis/AORStorage';
import { updateUserData } from '../user/Action';
import { updateSystemData } from '../system/Action';
import { signup } from '../../apis/APIs';

/** User Signup */
export const user_signup = () => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateSignupUIConstraints({
                [SIGNUP_REQEUST_LOADING]: true,
                [SIGNUP_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const data = getState()[SIGNUP_ROOT][SIGNUP_KEY];
            const form_data = data && data[SIGNUP_FORM] ? data[SIGNUP_FORM] : {};
            const email = form_data && form_data[SIGNUP_FORM_EMAIL] ? form_data[SIGNUP_FORM_EMAIL] : "";
            const password = form_data && form_data[SIGNUP_FORM_PASSWORD] ? form_data[SIGNUP_FORM_PASSWORD] : "";
            const first_name = form_data && form_data[SIGNUP_FORM_FIRST_NAME] ? form_data[SIGNUP_FORM_FIRST_NAME] : "";
            const last_name = form_data && form_data[SIGNUP_FORM_LAST_NAME] ? form_data[SIGNUP_FORM_LAST_NAME] : "";
            const is_agree_term_and_privacy_policy = true

            const body = {
                email,
                password,
                is_agree_term_and_privacy_policy
            };

            console.log("signup ===> body", body);
            const res = await signup(body);

            if (res && res.message) {
                let message = undefined;
                
                if (res.error_stack) {
                    message = res.error_stack.message ? res.error_stack.message : message;
                    message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
                    message = res.error_stack.error_message ? res.error_stack.error_message : message;
                }

                switch (res.message) {
                    case SERVER_SUCCESS:

                        try {
                            await AORStorage.storeAORLoginData(res.data);
                            const userData = await AORStorage.getAORLoginData();
                            dispatch(updateUserData({
                                [USER_DATA]: userData && userData.response ? userData.response : userData
                            }));
                        } catch (error: any) {
                            Utils.log("Blossom Login Storage ===> Error ", error);
                            dispatch(updateSignupUIConstraints({
                                [SIGNUP_REQUEST_STATUS]: {
                                    [STATUS]: ERROR,
                                    [MESSAGE]: "Unable to store data, please try again"
                                },
                                [SIGNUP_REQEUST_LOADING]: false
                            }));
                            return;
                        }

                        dispatch(updateSignupUIConstraints({
                            [SIGNUP_REQEUST_LOADING]: false,
                            [SIGNUP_REQUEST_STATUS]: {
                                [STATUS]: SUCCESS,
                                [MESSAGE]: ""
                            }
                        }));

                        //Update System Data
                        dispatch(updateSystemData({
                            [SYSTEM_DATA_IS_AUTHENTICATED]: true,
                            [SYSTEM_DATA_IS_SETUP_PROFILE]: false,
                            [SYSTEM_DATA_IS_SETUP_REMINDER]: false
                        }));

                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = message ? message : "Validation error";
                        dispatch(updateSignupUIConstraints({
                            [SIGNUP_REQEUST_LOADING]: false,
                            [SIGNUP_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                        break;
                    default:
                        message = message ? message : "Internal server error";
                        dispatch(updateSignupUIConstraints({
                            [SIGNUP_REQEUST_LOADING]: false,
                            [SIGNUP_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                }
            }
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
            dispatch(updateSignupUIConstraints({
                [SIGNUP_REQEUST_LOADING]: false,
                [SIGNUP_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** Get Signup Form State */
export const signup_form_state_to_props = ({ signup }: any) => {
    const signup_key = signup && signup[SIGNUP_KEY] ? signup[SIGNUP_KEY] : undefined;
    const signup_form = signup_key && signup_key[SIGNUP_FORM] ? signup_key[SIGNUP_FORM] : undefined;

    const email = signup_form && signup_form[SIGNUP_FORM_EMAIL] ? signup_form[SIGNUP_FORM_EMAIL] : "";
    const password = signup_form && signup_form[SIGNUP_FORM_PASSWORD] ? signup_form[SIGNUP_FORM_PASSWORD] : "";
    const first_name = signup_form && signup_form[SIGNUP_FORM_FIRST_NAME] ? signup_form[SIGNUP_FORM_FIRST_NAME]: "";
    const last_name = signup_form && signup_form[SIGNUP_FORM_LAST_NAME] ? signup_form[SIGNUP_FORM_LAST_NAME]: "";
    const is_terms_and_privacy_policy = signup_form && signup_form[SIGNUP_FORM_I_AGREE_TERMS_AND_PRIVACY_POLICY] ? signup_form[SIGNUP_FORM_I_AGREE_TERMS_AND_PRIVACY_POLICY]: "";

    const errors = signup_key && signup_key[SIGNUP_ERRORS] ? signup_key[SIGNUP_ERRORS] : [];
    
    const loading = signup_key && signup_key[SIGNUP_REQEUST_LOADING] ? signup_key[SIGNUP_REQEUST_LOADING] : false;

    return ({
        email,
        password,
        first_name,
        last_name,
        is_terms_and_privacy_policy,
        
        loading,

        errors
    })
}

/** Get Signup Form State */
export const signup_state_to_props = ({ signup }: any) => {
    const signup_key = signup && signup[SIGNUP_KEY] ? signup[SIGNUP_KEY] : undefined;

    const request_status = signup_key && signup_key[SIGNUP_REQUEST_STATUS] ? signup_key[SIGNUP_REQUEST_STATUS] : {};
    const status = request_status && request_status[STATUS] ? request_status[STATUS] : "";
    const message = request_status && request_status[MESSAGE] ? request_status[MESSAGE] : "";

    return ({
        status,
        message
    })
}

/** Manage Form Data */
export const updateSignupFormData = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[SIGNUP_ROOT][SIGNUP_KEY];
            const data = Object.assign(formData[SIGNUP_FORM], obj);

            dispatch(updateSignupState(Object.assign(formData, {
                [SIGNUP_FORM]: data
            })));
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
        }
    }
}

/** Manage UI Constraints */
export const updateSignupUIConstraints = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[SIGNUP_ROOT][SIGNUP_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateSignupState(data));
        } catch (error: any) {
            Utils.log("Update UI Constraints ===> error ", error);
        }
    }
}

/** Update signup data state */
const updateSignupState = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[SIGNUP_ROOT][SIGNUP_KEY];

            dispatch({
                type: SIGNUP_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error: any) {
            Utils.log("Update Login State ===> error ", error);
        }
    }
}

/** Reset signup data state */
export const resetSignupState = () => {
    return (dispatch: any, getState: any) => {
        try {
            dispatch({
                type: SIGNUP_RESET,
                payload: {}
            })
        } catch (error: any) {
            Utils.log("Update Signup State ===> error ", error);
        }
    }
}
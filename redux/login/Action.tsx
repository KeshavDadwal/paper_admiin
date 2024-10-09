import { LOGIN_KEY, LOGIN_FORM, LOGIN_ROOT, LOGIN_UPDATE, LOG_OUT, LOGIN_RESET, LOGIN_REQEUST_LOADING, LOGIN_REQUEST_STATUS, STATUS, MESSAGE, EMPTY, SERVER_SUCCESS, SUCCESS, ERROR, SERVER_VALIDATION_ERROR, LOGIN_REQEUST_SESSION_LOADING, LOGIN_REQUEST_SESSION_STATUS, LOGIN_REQEUST_LOGOUT_LOADING, LOGIN_FORM_EMAIL, LOGIN_FORM_PASSWORD, SYSTEM_DATA_IS_AUTHENTICATED, USER_DATA, SERVER_FORBIDDEN, LOGIN_FORM_REMEMBER_ME, LOGIN_ERRORS, SYSTEM_DATA_IS_SETUP_PROFILE, SYSTEM_DATA_IS_SETUP_REMINDER, SYSTEM_DATA_IS_SKIP_REMINDER, LOGIN_REQEUST_GOOGLE_LOADING, LOGIN_REQEUST_LINKEDIN_LOADING, LOGIN_TYPE_GOOGLE, LOGIN_TYPE_LINKEDIN, ONBOARDING_TAB_TYPE, ONBOARDING_TAB_TYPE_REFLECT_DAILY } from "../Types";
import Utils from '../../components/util/Utils';
import { login, session_login, auth2_login, logout_user } from "../../apis/APIs";
import { updateSystemData } from '../../redux/system/Action'
import { updateUserData } from '../../redux/user/Action'
import AORStorage from "../../apis/AORStorage";
import { updateOnBoardingUIConstraints } from "../onboarding/Action";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import CryptoJS from 'crypto-js'

/** User Login */
export const user_login = () => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateLoginUIConstraints({
                [LOGIN_REQEUST_LOADING]: true,
                [LOGIN_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const data = getState()[LOGIN_ROOT][LOGIN_KEY];
            const form_data = data && data[LOGIN_FORM] ? data[LOGIN_FORM] : {};
            const email = form_data && form_data[LOGIN_FORM_EMAIL] ? form_data[LOGIN_FORM_EMAIL] : "";
            const password = form_data && form_data[LOGIN_FORM_PASSWORD] ? form_data[LOGIN_FORM_PASSWORD] : "";

            const body = {
                email,
                password
            }
            // const res = await login(body);
            const db = Utils.getFirestoreDB();
            if (!db) return dispatch(updateLoginUIConstraints({
                [LOGIN_REQEUST_LOADING]: false,
                [LOGIN_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: "Some internal error occurred. please refresh and try again."
                }
            }));

            console.log("firebase store init", email);

            const queryRef = query(collection(db, "Users"), where("email", "==", email));
            const querySnapshot: any = await getDocs(queryRef as any);
            console.log("firebase store response", querySnapshot);

            let user_data: any = undefined;
            querySnapshot.forEach((doc: any) => {
                console.log("firebase store response init", doc.data());

                const { phoneNumber, password: _password, type } = doc.data() || {};

                if (phoneNumber && _password) {
                    let stored_password: any = CryptoJS.AES.decrypt(_password, phoneNumber);
                    stored_password = stored_password.toString(CryptoJS.enc.Utf8);
                    stored_password = stored_password ? stored_password : "";
                    const isAuth = stored_password === password && type === "admin";

                    if(isAuth) user_data = doc.data();
                }
            });

            if (user_data && user_data.id) {
                try {
                    await AORStorage.storeAORLoginData(user_data);
                    const userData = await AORStorage.getAORLoginData();
                    console.log("user data ===>", user_data, userData);
                    dispatch(updateUserData({
                        [USER_DATA]: userData && userData.response ? userData.response : userData
                    }));
                } catch (error: any) {
                    Utils.log("Saascorn Login Storage ===> Error ", error);
                    dispatch(updateLoginUIConstraints({
                        [LOGIN_REQUEST_STATUS]: {
                            [STATUS]: ERROR,
                            [MESSAGE]: "Unable to store data, please try again"
                        },
                        [LOGIN_REQEUST_LOADING]: false
                    }));
                    return;
                }

                dispatch(updateLoginUIConstraints({
                    [LOGIN_REQEUST_LOADING]: false,
                    [LOGIN_REQUEST_STATUS]: {
                        [STATUS]: SUCCESS,
                        [MESSAGE]: ""
                    }
                }));

                //Update System Data
                dispatch(updateSystemData({
                    [SYSTEM_DATA_IS_AUTHENTICATED]: true
                }));
            } else {
                dispatch(updateLoginUIConstraints({
                    [LOGIN_REQEUST_LOADING]: false,
                    [LOGIN_REQUEST_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]: "Either email or password is incorrect, please try again."
                    }
                }));
            }
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
            dispatch(updateLoginUIConstraints({
                [LOGIN_REQEUST_LOADING]: false,
                [LOGIN_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** User Social Media Login */
export const user_social_media_login = (obj: any, is_google: any, is_linkedin: any) => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateLoginUIConstraints({
                [LOGIN_REQEUST_GOOGLE_LOADING]: is_google,
                [LOGIN_REQEUST_LINKEDIN_LOADING]: is_linkedin,
                [LOGIN_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const data = getState()[LOGIN_ROOT][LOGIN_KEY];
            const form_data = data && data[LOGIN_FORM] ? data[LOGIN_FORM] : {};

            const { email = "", first_name = "", last_name = "", image = "" } = obj;

            let login_type = undefined;
            const is_agree_term_and_privacy_policy = true;

            if (is_google) login_type = LOGIN_TYPE_GOOGLE;
            if (is_linkedin) login_type = LOGIN_TYPE_LINKEDIN;

            const body = {
                email,
                first_name,
                last_name,
                image,
                login_type,
                is_agree_term_and_privacy_policy
            }
            const res = await auth2_login(body);
            console.log("user data ===> init", JSON.stringify(res.data));


            if (res && res.message) {
                let message = undefined;
                switch (res.message) {
                    case SERVER_SUCCESS:
                        const { user } = res.data;

                        try {
                            await AORStorage.storeAORLoginData(res.data);
                            const userData = await AORStorage.getAORLoginData();
                            console.log("user data ===>", res.data, userData);
                            dispatch(updateUserData({
                                [USER_DATA]: userData && userData.response ? userData.response : userData
                            }));
                        } catch (error: any) {
                            Utils.log("Saascorn Login Storage ===> Error ", error);
                            dispatch(updateLoginUIConstraints({
                                [LOGIN_REQUEST_STATUS]: {
                                    [STATUS]: ERROR,
                                    [MESSAGE]: "Unable to store data, please try again"
                                },
                                [LOGIN_REQEUST_LOADING]: false
                            }));
                            return;
                        }

                        dispatch(updateLoginUIConstraints({
                            [LOGIN_REQEUST_GOOGLE_LOADING]: false,
                            [LOGIN_REQEUST_LINKEDIN_LOADING]: false,
                            [LOGIN_REQUEST_STATUS]: {
                                [STATUS]: SUCCESS,
                                [MESSAGE]: ""
                            }
                        }));

                        const is_setup_profile = user && user.is_setup_profile ? user.is_setup_profile : false;

                        //Update System Data
                        dispatch(updateSystemData({
                            [SYSTEM_DATA_IS_AUTHENTICATED]: true,
                            [SYSTEM_DATA_IS_SETUP_PROFILE]: is_setup_profile,
                            [SYSTEM_DATA_IS_SETUP_REMINDER]: user && user.is_setup_reminder ? user.is_setup_reminder : false,
                            [SYSTEM_DATA_IS_SKIP_REMINDER]: user && user.is_setup_skip_reminder ? user.is_setup_skip_reminder : false
                        }));

                        if (is_setup_profile) {
                            dispatch(updateOnBoardingUIConstraints({
                                [ONBOARDING_TAB_TYPE]: ONBOARDING_TAB_TYPE_REFLECT_DAILY
                            }))
                        }

                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = res.error_stack && res.error_stack.message ? res.error_stack.message : "Validation error";
                        dispatch(updateLoginUIConstraints({
                            [LOGIN_REQEUST_GOOGLE_LOADING]: false,
                            [LOGIN_REQEUST_LINKEDIN_LOADING]: false,
                            [LOGIN_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                        break;
                    default:
                        message = res.error_stack && res.error_stack.message ? res.error_stack.message : "Internal server error";
                        dispatch(updateLoginUIConstraints({
                            [LOGIN_REQEUST_GOOGLE_LOADING]: false,
                            [LOGIN_REQEUST_LINKEDIN_LOADING]: false,
                            [LOGIN_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                }
            }
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
            dispatch(updateLoginUIConstraints({
                [LOGIN_REQEUST_GOOGLE_LOADING]: false,
                [LOGIN_REQEUST_LINKEDIN_LOADING]: false,
                [LOGIN_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** Get Login Form State */
export const login_form_state_to_props = ({ login }: any) => {
    const login_key = login && login[LOGIN_KEY] ? login[LOGIN_KEY] : undefined;
    const login_form = login_key && login_key[LOGIN_FORM] ? login_key[LOGIN_FORM] : undefined;

    const email = login_form && login_form[LOGIN_FORM_EMAIL] ? login_form[LOGIN_FORM_EMAIL] : "";
    const password = login_form && login_form[LOGIN_FORM_PASSWORD] ? login_form[LOGIN_FORM_PASSWORD] : "";
    const remember_me = login_form && login_form[LOGIN_FORM_REMEMBER_ME] ? login_form[LOGIN_FORM_REMEMBER_ME] : false;

    const errors = login_key && login_key[LOGIN_ERRORS] ? login_key[LOGIN_ERRORS] : [];

    const loading = login_key && login_key[LOGIN_REQEUST_LOADING] ? login_key[LOGIN_REQEUST_LOADING] : false;

    return ({
        email,
        password,
        remember_me,

        loading,

        errors
    })
}

/** Get Login State */
export const login_state_to_props = ({ login }: any) => {
    const login_key = login && login[LOGIN_KEY] ? login[LOGIN_KEY] : undefined;

    const request_status = login_key && login_key[LOGIN_REQUEST_STATUS] ? login_key[LOGIN_REQUEST_STATUS] : undefined;
    const status = request_status && request_status[STATUS] ? request_status[STATUS] : "";
    const message = request_status && request_status[MESSAGE] ? request_status[MESSAGE] : "";

    return ({
        status,
        message
    })
}

/** Get Login State */
export const auth2_login_state_to_props = ({ login }: any) => {
    const login_key = login && login[LOGIN_KEY] ? login[LOGIN_KEY] : undefined;

    const googleLoading = login_key && login_key[LOGIN_REQEUST_GOOGLE_LOADING] ? login_key[LOGIN_REQEUST_GOOGLE_LOADING] : undefined;
    const linkedinLoading = login_key && login_key[LOGIN_REQEUST_LINKEDIN_LOADING] ? login_key[LOGIN_REQEUST_LINKEDIN_LOADING] : undefined;

    return ({
        googleLoading,
        linkedinLoading
    })
}

/** Get Login Form State Validate */
export const login_form_state_to_props_validate = (prevState: any, nextState: any) => {
    console.log("page ===> validate props", prevState, nextState);

    return true;
}

/** User Session Login */
export const user_session_login = (token = "") => {
    return async (dispatch: any, getState: any) => {
        try {
            const value = await AORStorage.getAORLoginData();
            const userData = value && value.response ? value.response : undefined;
            const phoneNumber = userData && userData.phoneNumber ? userData.phoneNumber : "";
            const email = userData && userData.email ? userData.email : "";

            if (!phoneNumber || !email) {

                dispatch(updateUserData({
                    [USER_DATA]: undefined
                }));
                //Update System Data
                dispatch(updateSystemData({
                    [SYSTEM_DATA_IS_AUTHENTICATED]: false
                }));

                dispatch(updateLoginUIConstraints({
                    [LOGIN_REQEUST_SESSION_LOADING]: false
                }));
                return;
            }

            //Intialize the request status and loading
            dispatch(updateLoginUIConstraints({
                [LOGIN_REQEUST_LOGOUT_LOADING]: true
            }));

            //Intialize
            dispatch(updateLoginUIConstraints({
                [LOGIN_REQEUST_SESSION_LOADING]: true,
                [LOGIN_REQUEST_SESSION_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const db = Utils.getFirestoreDB();
            if (!db) return dispatch(updateLoginUIConstraints({
                [LOGIN_REQEUST_SESSION_LOADING]: false,
                [LOGIN_REQUEST_SESSION_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: "Some internal error occurred. please refresh and try again."
                }
            }));

            const queryRef = query(collection(db, "Users"), where("email", "==", email));
            const querySnapshot: any = await getDocs(queryRef as any);

            let user_data: any = undefined;
            querySnapshot.forEach((doc: any) => {
                const { phoneNumber: _phoneNumber, password: _password } = doc.data() || {};

                if (phoneNumber === _phoneNumber) {
                    user_data = doc.data();
                }
            });

            if (user_data && user_data.id) {
                try {
                    await AORStorage.storeAORLoginData(user_data);
                    const userData = await AORStorage.getAORLoginData();
                    console.log("user data ===>", user_data, userData);
                    dispatch(updateUserData({
                        [USER_DATA]: userData && userData.response ? userData.response : userData
                    }));
                } catch (error: any) {
                    Utils.log("Saascorn Login Storage ===> Error ", error);
                    dispatch(updateLoginUIConstraints({
                        [LOGIN_REQEUST_SESSION_LOADING]: false,
                        [LOGIN_REQUEST_SESSION_STATUS]: {
                            [STATUS]: ERROR,
                            [MESSAGE]: "Unable to store data, please try again"
                        }
                    }));
                    return;
                }

                dispatch(updateLoginUIConstraints({
                    [LOGIN_REQEUST_SESSION_LOADING]: false,
                    [LOGIN_REQUEST_SESSION_STATUS]: {
                        [STATUS]: SUCCESS,
                        [MESSAGE]: ""
                    }
                }));

                //Update System Data
                dispatch(updateSystemData({
                    [SYSTEM_DATA_IS_AUTHENTICATED]: true
                }));
            } else {
                dispatch(updateLoginUIConstraints({
                    [LOGIN_REQEUST_SESSION_LOADING]: false,
                    [LOGIN_REQUEST_SESSION_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]: "Please try again"
                    }
                }));
            }
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
            dispatch(updateLoginUIConstraints({
                [LOGIN_REQEUST_SESSION_LOADING]: false,
                [LOGIN_REQUEST_SESSION_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** User silent Session Login */
export const user_silent_session_login = (token: any) => {
    return async (dispatch: any, getState: any) => {
        try {

            const value = await AORStorage.getAORLoginData();
            const userData = value && value.response && value.response.token ? value.response : undefined;

            if ((!userData && !token) || (userData && !userData.token && !token)) {
                return;
            }

            const _token = userData && userData.token && !token ? userData.token : token;

            const body = {
                "token": Utils.parseToken(_token)
            }
            const res = await session_login(body);

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
                            Utils.log("Saascorn Login Storage ===> Error ", error);
                            return;
                        }
                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = message ? message : "Validation error";
                        break;
                    case SERVER_FORBIDDEN:
                        message = message ? message : "";
                        break;
                    default:
                        message = res.error_stack && res.error_stack.message ? res.error_stack.message : "Internal server error";
                }
            }
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
        }
    }
}

/** User Logout */
export const user_logout = () => {
    return async (dispatch: any, getState: any) => {
        try {

            const value = await AORStorage.getAORLoginData();
            const userData = value && value.response && value.response.token ? value.response : undefined;

            await AORStorage.clearAORLoginData();
            //Update System Data
            dispatch(updateSystemData({
                [SYSTEM_DATA_IS_AUTHENTICATED]: false
            }));

            try {
                if ((!userData) || (userData && !userData.token)) {
                    return window.location.reload();
                }

                const _token = userData && userData.token ? userData.token : "";
                const uid = userData && userData.user && userData.user.uid ? userData.user.uid : "";

                const header = {
                    "token": Utils.parseToken(_token)
                }
                logout_user({ uid }, header);
                window.location.reload();
            } catch (error: any) {

            }

            return;
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
            dispatch(updateLoginUIConstraints({
                [LOGIN_REQEUST_LOGOUT_LOADING]: false,
                [LOGIN_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** Manage Form Data */
export const updateLoginFormData = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[LOGIN_ROOT][LOGIN_KEY];
            const data = Object.assign(formData[LOGIN_FORM], obj);

            dispatch(updateLoginState(Object.assign(formData, {
                [LOGIN_FORM]: data
            })));
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
        }
    }
}

/** Manage UI Constraints */
export const updateLoginUIConstraints = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[LOGIN_ROOT][LOGIN_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateLoginState(data));
        } catch (error: any) {
            Utils.log("Update UI Constraints ===> error ", error);
        }
    }
}

/** Update login data state */
const updateLoginState = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[LOGIN_ROOT][LOGIN_KEY];
            console.log(typeof formData, typeof obj);
            console.log(formData, obj);

            dispatch({
                type: LOGIN_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error: any) {
            Utils.log("Update Login State ===> error ", error);
        }
    }
}

/** Reset login data state */
export const resetLoginState = () => {
    return (dispatch: any, getState: any) => {
        try {
            dispatch({
                type: LOGIN_RESET,
                payload: {}
            })
        } catch (error: any) {
            Utils.log("Update Login State ===> error ", error);
        }
    }
}

/** Update logout data state */
export const updateLogoutState = () => {
    return (dispatch: any, getState: any) => {
        try {
            dispatch({
                type: LOG_OUT,
                payload: {}
            })
        } catch (error: any) {
            Utils.log("Update Login State ===> error ", error);
        }
    }
}
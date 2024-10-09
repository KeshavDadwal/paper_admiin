import { STATUS, MESSAGE, EMPTY, SERVER_SUCCESS, SUCCESS, ERROR, SERVER_VALIDATION_ERROR, UPDATE_PROFILE_ROOT, UPDATE_PROFILE_KEY, UPDATE_PROFILE_UPDATE, UPDATE_PROFILE_FORM_LAST_NAME, UPDATE_PROFILE_FORM, UPDATE_PROFILE_REQEUST_LOADING, UPDATE_PROFILE_REQUEST_STATUS, UPDATE_PROFILE_FORM_FIRST_NAME, UPDATE_PROFILE_FORM_COMPANY_NAME, UPDATE_PROFILE_FORM_EMAIL, UPDATE_PROFILE_FORM_PASSWORD, UPDATE_PROFILE_ERRORS, UPDATE_PROFILE_FORM_PHONE, UPDATE_PROFILE_FORM_IMAGE_URL, USER_KEY, USER_DATA, USER_ROOT, UPDATE_PROFILE_FORM_IMAGE_BLOB, UPDATE_PROFILE_RESET, UPDATE_PROFILE_FORM_OLD_PASSWORD, UPDATE_PROFILE_FORM_CONFIRM_PASSWORD, UPDATE_PROFILE_FORM_DEPARTMENT, UPDATE_PROFILE_FORM_JOB_TITLE, UPDATE_PROFILE_FORM_LINKDIN_URL } from "../Types";
import Utils from '../../components/util/Utils';
import { updateSystemData } from '../../redux/system/Action'
import { updateUserData } from '../../redux/user/Action'
import { update_profile, upload_profile_image, change_password } from "../../apis/APIs";
import { user_session_login } from "../login/Action";

/** User Update Profile */
export const user_update_profile = () => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateUpdateProfileUIConstraints({
                [UPDATE_PROFILE_REQEUST_LOADING]: true,
                [UPDATE_PROFILE_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const user_key = getState()[USER_ROOT][USER_KEY];
            const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
            const user = user_data && user_data.user ? user_data.user : undefined;
            const token = user_data && user_data.token ? Utils.parseToken(user_data.token) : "";

            if ((!user || (user && !user.uid)) || !token) {
                return dispatch(updateUpdateProfileUIConstraints({
                    [UPDATE_PROFILE_REQEUST_LOADING]: false,
                    [UPDATE_PROFILE_REQUEST_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]: "Eigther user ID or token is missing."
                    }
                }));
            }

            const update_profile_key = getState()[UPDATE_PROFILE_ROOT][UPDATE_PROFILE_KEY];
            const update_profile_form = update_profile_key && update_profile_key[UPDATE_PROFILE_FORM] ? update_profile_key[UPDATE_PROFILE_FORM] : undefined;

            const company_name = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_COMPANY_NAME] ? update_profile_form[UPDATE_PROFILE_FORM_COMPANY_NAME] : "";
            const image = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_IMAGE_URL] ? update_profile_form[UPDATE_PROFILE_FORM_IMAGE_URL] : "";
            const image_blob = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_IMAGE_BLOB] ? update_profile_form[UPDATE_PROFILE_FORM_IMAGE_BLOB] : undefined;

            const email = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_EMAIL] ? update_profile_form[UPDATE_PROFILE_FORM_EMAIL] : "";
            const phone = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_PHONE] ? update_profile_form[UPDATE_PROFILE_FORM_PHONE] : "";

            const department = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_DEPARTMENT] ? update_profile_form[UPDATE_PROFILE_FORM_DEPARTMENT] : "";
            const job_title = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_JOB_TITLE] ? update_profile_form[UPDATE_PROFILE_FORM_JOB_TITLE] : "";
            const linkedin_url = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_LINKDIN_URL] ? update_profile_form[UPDATE_PROFILE_FORM_LINKDIN_URL] : "";

            const first_name = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_FIRST_NAME] ? update_profile_form[UPDATE_PROFILE_FORM_FIRST_NAME] : "";
            const last_name = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_LAST_NAME] ? update_profile_form[UPDATE_PROFILE_FORM_LAST_NAME] : "";

            let body = {
                first_name,
                last_name,
                uid: user.uid,
                email,
                phone,
                image,
                company_name,

                department,
                job_title,
                linkdin_profile_url: linkedin_url ? linkedin_url : ""
            };

            if (image_blob) {
                const upload_image_form_data = new FormData();
                upload_image_form_data.append("image", image_blob);

                const upload_image_res = await upload_profile_image(upload_image_form_data);

                handle_update_profile_response(dispatch, upload_image_res, async (data: any) => {
                    const { image } = data;
                    const res = await update_profile(Object.assign(body, { image, token }));
                    handle_update_profile_response(dispatch, res);
                });

            } else {
                const res = await update_profile(Object.assign(body, { token }));
                handle_update_profile_response(dispatch, res);
            }

        } catch (error: any) {
            Utils.log("Update Update Profile Form Data ===> error ", error);
            dispatch(updateUpdateProfileUIConstraints({
                [UPDATE_PROFILE_REQEUST_LOADING]: false,
                [UPDATE_PROFILE_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** User Change Password */
export const user_change_password = () => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateUpdateProfileUIConstraints({
                [UPDATE_PROFILE_REQEUST_LOADING]: true,
                [UPDATE_PROFILE_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const user_key = getState()[USER_ROOT][USER_KEY];
            const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
            const user = user_data && user_data.user ? user_data.user : undefined;
            const token = user_data && user_data.token ? Utils.parseToken(user_data.token) : "";

            if ((!user || (user && !user.uid)) || !token) {
                return dispatch(updateUpdateProfileUIConstraints({
                    [UPDATE_PROFILE_REQEUST_LOADING]: false,
                    [UPDATE_PROFILE_REQUEST_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]: "Eigther user ID or token is missing."
                    }
                }));
            }

            const update_profile_key = getState()[UPDATE_PROFILE_ROOT][UPDATE_PROFILE_KEY];
            const update_profile_form = update_profile_key && update_profile_key[UPDATE_PROFILE_FORM] ? update_profile_key[UPDATE_PROFILE_FORM] : undefined;

            const password = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_PASSWORD] ? update_profile_form[UPDATE_PROFILE_FORM_PASSWORD] : "";
            const old_password = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_OLD_PASSWORD] ? update_profile_form[UPDATE_PROFILE_FORM_OLD_PASSWORD] : "";

            let body = {
                uid: user.uid,
                password,
                old_password
            };

            console.log("data ===> ", body, token)

            const res = await change_password(body, { token });
            handle_update_profile_response(dispatch, res);

        } catch (error: any) {
            Utils.log("Update Update Profile Form Data ===> error ", error);
            dispatch(updateUpdateProfileUIConstraints({
                [UPDATE_PROFILE_REQEUST_LOADING]: false,
                [UPDATE_PROFILE_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

export const handle_update_profile_response = (dispatch: any, res?: any, cb?: any) => {
    if (res && res.message) {
        let message = undefined;

        if (res.error_stack) {
            message = res.error_stack.message ? res.error_stack.message : message;
            message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
            message = res.error_stack.error_message ? res.error_stack.error_message : message;
        }

        switch (res.message) {
            case SERVER_SUCCESS:
                const { data = {} } = res || {};

                if (cb) return cb(res.data);

                dispatch(updateUpdateProfileUIConstraints({
                    [UPDATE_PROFILE_REQEUST_LOADING]: false,
                    [UPDATE_PROFILE_REQUEST_STATUS]: {
                        [STATUS]: SUCCESS,
                        [MESSAGE]: data.message
                    }
                }));

                dispatch(user_session_login());

                break;
            case SERVER_VALIDATION_ERROR:
                message = message ? message : "Validation error";
                dispatch(updateUpdateProfileUIConstraints({
                    [UPDATE_PROFILE_REQEUST_LOADING]: false,
                    [UPDATE_PROFILE_REQUEST_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]: message
                    }
                }));
                break;
            default:
                message = message ? message : "Internal server error";
                dispatch(updateUpdateProfileUIConstraints({
                    [UPDATE_PROFILE_REQEUST_LOADING]: false,
                    [UPDATE_PROFILE_REQUEST_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]: message
                    }
                }));
        }
    }
}

/** Set user profile form */
export const set_user_profile_data = () => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateUpdateProfileUIConstraints({
                [UPDATE_PROFILE_REQEUST_LOADING]: true,
                [UPDATE_PROFILE_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const user_key = getState()[USER_ROOT][USER_KEY];
            const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
            const user = user_data && user_data.user ? user_data.user : undefined;
            const token = user_data && user_data.token ? Utils.parseToken(user_data.token) : "";

            if ((!user || (user && !user.uid)) || !token) {
                return dispatch(updateUpdateProfileUIConstraints({
                    [UPDATE_PROFILE_REQEUST_LOADING]: false,
                    [UPDATE_PROFILE_REQUEST_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]: "Eigther user ID or token is missing."
                    }
                }));
            }

            const { phone, department, job_title, linkdin_profile_url } = user || {};

            const body = {
                [UPDATE_PROFILE_FORM_IMAGE_URL]: user && user.image ? user.image : "",

                [UPDATE_PROFILE_FORM_EMAIL]: user && user.email ? user.email : "",

                [UPDATE_PROFILE_FORM_FIRST_NAME]: user && user.first_name ? user.first_name : "",
                [UPDATE_PROFILE_FORM_LAST_NAME]: user && user.last_name ? user.last_name : "",

                [UPDATE_PROFILE_FORM_COMPANY_NAME]: user && user.company_name ? user.company_name : "",

                [UPDATE_PROFILE_FORM_PHONE]: phone ? phone : "",
                [UPDATE_PROFILE_FORM_JOB_TITLE]: job_title ? job_title : "",
                [UPDATE_PROFILE_FORM_DEPARTMENT]: department ? department : "",
                [UPDATE_PROFILE_FORM_LINKDIN_URL]: linkdin_profile_url ? linkdin_profile_url : "",
            }

            dispatch(updateUpdateProfileFormData(body))

            return dispatch(updateUpdateProfileUIConstraints({
                [UPDATE_PROFILE_REQEUST_LOADING]: false,
                [UPDATE_PROFILE_REQUEST_STATUS]: {
                    [STATUS]: SUCCESS,
                    [MESSAGE]: ""
                }
            }));
        } catch (error: any) {
            Utils.log("Update Update Profile Form Data ===> error ", error);
            dispatch(updateUpdateProfileUIConstraints({
                [UPDATE_PROFILE_REQEUST_LOADING]: false,
                [UPDATE_PROFILE_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** Get Update Profile Form State */
export const update_profile_form_state_to_props = ({ update_profile }: any) => {
    const update_profile_key = update_profile && update_profile[UPDATE_PROFILE_KEY] ? update_profile[UPDATE_PROFILE_KEY] : undefined;
    const update_profile_form = update_profile_key && update_profile_key[UPDATE_PROFILE_FORM] ? update_profile_key[UPDATE_PROFILE_FORM] : undefined;

    const first_name = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_FIRST_NAME] ? update_profile_form[UPDATE_PROFILE_FORM_FIRST_NAME] : "";
    const last_name = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_LAST_NAME] ? update_profile_form[UPDATE_PROFILE_FORM_LAST_NAME] : "";
    const company_name = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_COMPANY_NAME] ? update_profile_form[UPDATE_PROFILE_FORM_COMPANY_NAME] : "";
    const image = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_IMAGE_URL] ? update_profile_form[UPDATE_PROFILE_FORM_IMAGE_URL] : "";
    const email = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_EMAIL] ? update_profile_form[UPDATE_PROFILE_FORM_EMAIL] : "";
    const phone = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_PHONE] ? update_profile_form[UPDATE_PROFILE_FORM_PHONE] : "";

    const department = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_DEPARTMENT] ? update_profile_form[UPDATE_PROFILE_FORM_DEPARTMENT] : "";
    const job_title = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_JOB_TITLE] ? update_profile_form[UPDATE_PROFILE_FORM_JOB_TITLE] : "";
    const linkedin_url = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_LINKDIN_URL] ? update_profile_form[UPDATE_PROFILE_FORM_LINKDIN_URL] : "";

    const errors = update_profile_key && update_profile_key[UPDATE_PROFILE_ERRORS] ? update_profile_key[UPDATE_PROFILE_ERRORS] : [];

    const loading = update_profile_key && update_profile_key[UPDATE_PROFILE_REQEUST_LOADING] ? update_profile_key[UPDATE_PROFILE_REQEUST_LOADING] : false;

    return ({
        first_name,
        last_name,

        company_name,
        image,

        department,
        linkedin_url,
        job_title,

        phone,
        email,

        loading,

        errors
    })
}

/** Get Change Password Form State */
export const change_password_form_state_to_props = ({ update_profile }: any) => {
    const update_profile_key = update_profile && update_profile[UPDATE_PROFILE_KEY] ? update_profile[UPDATE_PROFILE_KEY] : undefined;
    const update_profile_form = update_profile_key && update_profile_key[UPDATE_PROFILE_FORM] ? update_profile_key[UPDATE_PROFILE_FORM] : undefined;

    const password = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_PASSWORD] ? update_profile_form[UPDATE_PROFILE_FORM_PASSWORD] : "";
    const old_password = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_OLD_PASSWORD] ? update_profile_form[UPDATE_PROFILE_FORM_OLD_PASSWORD] : "";
    const confirm_password = update_profile_form && update_profile_form[UPDATE_PROFILE_FORM_CONFIRM_PASSWORD] ? update_profile_form[UPDATE_PROFILE_FORM_CONFIRM_PASSWORD] : "";

    const errors = update_profile_key && update_profile_key[UPDATE_PROFILE_ERRORS] ? update_profile_key[UPDATE_PROFILE_ERRORS] : [];

    const loading = update_profile_key && update_profile_key[UPDATE_PROFILE_REQEUST_LOADING] ? update_profile_key[UPDATE_PROFILE_REQEUST_LOADING] : false;

    return ({
        password,
        old_password,
        confirm_password,

        errors,
        loading
    })
}

/** Get Reset Password State */
export const update_profile_state_to_props = ({ update_profile, user }: any) => {
    const update_profile_key = update_profile && update_profile[UPDATE_PROFILE_KEY] ? update_profile[UPDATE_PROFILE_KEY] : undefined;
    const user_key = user && user[USER_KEY] ? user[USER_KEY] : undefined;

    const request_status = update_profile_key && update_profile_key[UPDATE_PROFILE_REQUEST_STATUS] ? update_profile_key[UPDATE_PROFILE_REQUEST_STATUS] : undefined;
    const status = request_status && request_status[STATUS] ? request_status[STATUS] : "";
    const message = request_status && request_status[MESSAGE] ? request_status[MESSAGE] : "";

    return ({
        status,
        message
    })
}

/** Manage Update Profile Form Data */
export const updateUpdateProfileFormData = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[UPDATE_PROFILE_ROOT][UPDATE_PROFILE_KEY];
            const data = Object.assign(formData[UPDATE_PROFILE_FORM], obj);

            dispatch(updateUpdateProfileState(Object.assign(formData, {
                [UPDATE_PROFILE_FORM]: data
            })));
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
        }
    }
}

/** Manage UI Constraints */
export const updateUpdateProfileUIConstraints = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[UPDATE_PROFILE_ROOT][UPDATE_PROFILE_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateUpdateProfileState(data));
        } catch (error: any) {
            Utils.log("Update UI Constraints ===> error ", error);
        }
    }
}

/** Update update profile data state */
const updateUpdateProfileState = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[UPDATE_PROFILE_ROOT][UPDATE_PROFILE_KEY];

            dispatch({
                type: UPDATE_PROFILE_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error: any) {
            Utils.log("Update Update Profile State ===> error ", error);
        }
    }
}

/** Reset update profile data state */
export const resetUpdateProfileState = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            dispatch({
                type: UPDATE_PROFILE_RESET,
                payload: {}
            })
        } catch (error: any) {
            Utils.log("Update Update Profile State ===> error ", error);
        }
    }
}
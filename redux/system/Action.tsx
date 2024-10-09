import Utils from '../../components/util/Utils';
import { SYSTEM_DATA_UPDATE, SYSTEM_DATA_ROOT, SYSTEM_DATA_KEY, USER_KEY, SYSTEM_DATA_IS_AUTHENTICATED, LOGIN_KEY, LOGIN_REQEUST_SESSION_LOADING, LOGIN_REQUEST_SESSION_STATUS, STATUS, MESSAGE, SYSTEM_DATA_IS_SETUP_PROFILE, SYSTEM_DATA_IS_SETUP_REMINDER, SYSTEM_DATA_IS_SKIP_REMINDER, SYSTEM_DATA_IS_HIDE_SIDEBAR, SYSTEM_DATA_IS_HIDE_HEADER, SYSTEM_DATA_SELECTED_PAGE } from '../Types';

export const system_state_to_props = ({ system_data, login, user }: any) => {

    const user_data = user && user[USER_KEY] ? user[USER_KEY] : undefined;

    const system_data_data = system_data && system_data[SYSTEM_DATA_KEY] ? system_data[SYSTEM_DATA_KEY] : undefined;
    const isAuthenticated = system_data_data && typeof system_data_data[SYSTEM_DATA_IS_AUTHENTICATED] === "boolean" ? system_data_data[SYSTEM_DATA_IS_AUTHENTICATED] : undefined;
    const login_data = login && login[LOGIN_KEY] ? login[LOGIN_KEY] : undefined;
    const loading = login_data && login_data[LOGIN_REQEUST_SESSION_LOADING] ? login_data[LOGIN_REQEUST_SESSION_LOADING] : false;
    const request_status = login_data && login_data[LOGIN_REQUEST_SESSION_STATUS] ? login_data[LOGIN_REQUEST_SESSION_STATUS] : {};

    const status = request_status && request_status[STATUS] ? request_status[STATUS] : "";
    const message = request_status && request_status[MESSAGE] ? request_status[MESSAGE] : "";
    
    return ({
        isAuthenticated,
        loading,
        status,
        message
    });
}

export const system_header_state_to_props = ({ system_data, login, user }: any) => {

    const user_data = user && user[USER_KEY] ? user[USER_KEY] : undefined;

    const system_data_data = system_data && system_data[SYSTEM_DATA_KEY] ? system_data[SYSTEM_DATA_KEY] : undefined;
    const selectedPage = system_data_data && system_data[SYSTEM_DATA_SELECTED_PAGE] ? system_data_data[SYSTEM_DATA_SELECTED_PAGE] : undefined;
    
    return ({
        selectedPage
    });
}

export const home_system_state_to_props = ({ system_data, login, user }: any) => {

    const user_data = user && user[USER_KEY] ? user[USER_KEY] : undefined;

    const system_data_data = system_data && system_data[SYSTEM_DATA_KEY] ? system_data[SYSTEM_DATA_KEY] : undefined;
    const isAuthenticated = system_data_data && typeof system_data_data[SYSTEM_DATA_IS_AUTHENTICATED] === "boolean" ? system_data_data[SYSTEM_DATA_IS_AUTHENTICATED] : undefined;
    const isSetProfile = system_data_data && typeof system_data_data[SYSTEM_DATA_IS_SETUP_PROFILE] === "boolean" ? system_data_data[SYSTEM_DATA_IS_SETUP_PROFILE] : false;
    const isSetReminder = system_data_data && typeof system_data_data[SYSTEM_DATA_IS_SETUP_REMINDER] === "boolean" ? system_data_data[SYSTEM_DATA_IS_SETUP_REMINDER] : false;
    const isSkipReminder = system_data_data && typeof system_data_data[SYSTEM_DATA_IS_SKIP_REMINDER] === "boolean" ? system_data_data[SYSTEM_DATA_IS_SKIP_REMINDER] : false;
    const login_data = login && login[LOGIN_KEY] ? login[LOGIN_KEY] : undefined;
    const loading = login_data && login_data[LOGIN_REQEUST_SESSION_LOADING] ? login_data[LOGIN_REQEUST_SESSION_LOADING] : false;
    const request_status = login_data && login_data[LOGIN_REQUEST_SESSION_STATUS] ? login_data[LOGIN_REQUEST_SESSION_STATUS] : {};

    const status = request_status && request_status[STATUS] ? request_status[STATUS] : "";
    const message = request_status && request_status[MESSAGE] ? request_status[MESSAGE] : "";

    console.log("system_data_data ===> ", system_data_data, isSetProfile, isSetReminder);
    
    return ({
        isAuthenticated,
        isSetProfile,
        isSetReminder,
        isSkipReminder,
        loading,
        status,
        message
    });
}

export const header_and_sidebar_system_state_to_props = ({ system_data, login, user }: any) => {

    const system_data_data = system_data && system_data[SYSTEM_DATA_KEY] ? system_data[SYSTEM_DATA_KEY] : undefined;
    const isHideSideBar = system_data_data && typeof system_data_data[SYSTEM_DATA_IS_HIDE_SIDEBAR] === "boolean" ? system_data_data[SYSTEM_DATA_IS_HIDE_SIDEBAR] : undefined;
    const isHideHeader = system_data_data && typeof system_data_data[SYSTEM_DATA_IS_HIDE_HEADER] === "boolean" ? system_data_data[SYSTEM_DATA_IS_HIDE_HEADER] : false;
    const selectedPage = system_data_data && system_data_data[SYSTEM_DATA_SELECTED_PAGE] ? system_data_data[SYSTEM_DATA_SELECTED_PAGE] : undefined;
    
    return ({
        isHideSideBar,
        isHideHeader,
        selectedPage
    });
}

/** Manage System Data */
export const updateSystemData = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[SYSTEM_DATA_ROOT][SYSTEM_DATA_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateSystemDataState(data));
        } catch (error: any) {
            Utils.log("Update System Data ===> error ", error);
        }
    }
}

/** Update system data state */
const updateSystemDataState = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[SYSTEM_DATA_ROOT][SYSTEM_DATA_KEY];

            dispatch({
                type: SYSTEM_DATA_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error: any) {
            Utils.log("Update System Data State ===> error ", error);
        }
    }
}
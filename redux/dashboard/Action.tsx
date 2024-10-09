import Utils from '../../components/util/Utils';
import { DASHBOARD_ROOT, DASHBOARD_KEY, DASHBOARD_UPDATE, DASHBOARD_REQUEST_STATUS, STATUS, MESSAGE, TOKEN_NOT_FOUND, DASHBOARD_LOADING, DASHBOARD_DATA, SUCCESS, ERROR, USER_ROOT, USER_KEY, USER_DATA, EMPTY, DASHBOARD_DATE, DASHBOARD_REFLECTION_DATA, SERVER_SUCCESS, SERVER_VALIDATION_ERROR, DASHBOARD_RELECTION_LOADING, DASHBOARD_ERRORS, DASHBOARD_SELECTED_REFLECTION_DATA } from '../Types';
import { get_month_reflections, get_reflection_via_date } from '../../apis/APIs';

/** Get user reflections */
export const get_user_reflections = () => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateDashboardData({
                [DASHBOARD_LOADING]: true,
                [DASHBOARD_DATA]: [],
                [DASHBOARD_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const user_key = getState()[USER_ROOT][USER_KEY];
            const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
            const user = user_data && user_data.user ? user_data.user : undefined;
            const token = user_data && user_data.token ? Utils.parseToken(user_data.token) : "";

            if ((!user || (user && !user.uid)) || !token) {
                return dispatch(updateDashboardData({
                    [DASHBOARD_LOADING]: false,
                    [DASHBOARD_REQUEST_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]: "Eigther user ID or token is missing."
                    }
                }));
            }

            const data = getState()[DASHBOARD_ROOT][DASHBOARD_KEY];
            const date = data && data[DASHBOARD_DATE] ? data[DASHBOARD_DATE] : undefined;

            const body = {
                month: new Date(date).getMonth() + 1,
                year: new Date(date).getFullYear()
            };

            console.log("reflections ===> body", body);
            const res = await get_month_reflections(body, { token });

            if (res && res.message) {
                let message = undefined;

                if (res.error_stack) {
                    message = res.error_stack.message ? res.error_stack.message : message;
                    message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
                    message = res.error_stack.error_message ? res.error_stack.error_message : message;
                }

                switch (res.message) {
                    case SERVER_SUCCESS:

                        console.log("reflections ===> res", res.data && res.data && res.data.data.length ? res.data.data : [], res);

                        dispatch(updateDashboardData({
                            [DASHBOARD_LOADING]: false,
                            [DASHBOARD_DATA]: res.data && res.data && res.data.data.length ? res.data.data : [],
                            [DASHBOARD_REQUEST_STATUS]: {
                                [STATUS]: SUCCESS,
                                [MESSAGE]: ""
                            }
                        }));

                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = message ? message : "Validation error";
                        dispatch(updateDashboardData({
                            [DASHBOARD_LOADING]: false,
                            [DASHBOARD_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                        break;
                    default:
                        message = message ? message : "Internal server error";
                        dispatch(updateDashboardData({
                            [DASHBOARD_LOADING]: false,
                            [DASHBOARD_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                }
            }
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
            dispatch(updateDashboardData({
                [DASHBOARD_LOADING]: false,
                [DASHBOARD_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** Get user reflection */
export const get_user_reflection = () => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateDashboardData({
                [DASHBOARD_RELECTION_LOADING]: true,
                [DASHBOARD_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const data = getState()[DASHBOARD_ROOT][DASHBOARD_KEY];
            const date = data && data[DASHBOARD_DATE] ? data[DASHBOARD_DATE] : undefined;

            const body = {
                date: date
            };

            console.log("reflection ===> body", body);
            const res = await get_reflection_via_date(body);

            if (res && res.message) {
                let message = undefined;

                if (res.error_stack) {
                    message = res.error_stack.message ? res.error_stack.message : message;
                    message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
                    message = res.error_stack.error_message ? res.error_stack.error_message : message;
                }

                switch (res.message) {
                    case SERVER_SUCCESS:

                        dispatch(updateDashboardData({
                            [DASHBOARD_RELECTION_LOADING]: false,
                            [DASHBOARD_DATA]: res.data && res.data.length ? res.data : [],
                            [DASHBOARD_REQUEST_STATUS]: {
                                [STATUS]: SUCCESS,
                                [MESSAGE]: ""
                            }
                        }));

                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = message ? message : "Validation error";
                        dispatch(updateDashboardData({
                            [DASHBOARD_RELECTION_LOADING]: false,
                            [DASHBOARD_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                        break;
                    default:
                        message = message ? message : "Internal server error";
                        dispatch(updateDashboardData({
                            [DASHBOARD_RELECTION_LOADING]: false,
                            [DASHBOARD_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                }
            }
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
            dispatch(updateDashboardData({
                [DASHBOARD_RELECTION_LOADING]: false,
                [DASHBOARD_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** Get Dashboard State */
export const dashboard_state_to_props = ({ dashboard }: any) => {
    const dashboard_key = dashboard && dashboard[DASHBOARD_KEY] ? dashboard[DASHBOARD_KEY] : undefined;

    const date = dashboard_key && dashboard_key[DASHBOARD_DATE] ? dashboard_key[DASHBOARD_DATE] : undefined;
    const data = dashboard_key && dashboard_key[DASHBOARD_DATA] ? dashboard_key[DASHBOARD_DATA] : undefined;
    const reflection = dashboard_key && dashboard_key[DASHBOARD_REFLECTION_DATA] ? dashboard_key[DASHBOARD_REFLECTION_DATA] : undefined;

    let _selected_reflection: any = [];
    let selected_relfection = dashboard_key && dashboard_key[DASHBOARD_SELECTED_REFLECTION_DATA] ? dashboard_key[DASHBOARD_SELECTED_REFLECTION_DATA] : undefined;
    let selected_relfection_created_at = dashboard_key && dashboard_key[DASHBOARD_SELECTED_REFLECTION_DATA] ? dashboard_key[DASHBOARD_SELECTED_REFLECTION_DATA].created_at : undefined;

    console.log("datadata ===> selected_relfection", data)
    if (selected_relfection && selected_relfection._id) {
        const { _id: selected_relfection_id, answers, sub_category, created_at } = selected_relfection;
        _selected_reflection.push({
            root: true,
            selected_relfection_id,
            sub_category,
            created_at
        });

        _selected_reflection = _selected_reflection.concat(answers && answers.length ? answers.map((ele: any) => ({ ...ele, selected_relfection_id })) : []);
    }

    selected_relfection = _selected_reflection;

    const errors = dashboard_key && dashboard_key[DASHBOARD_ERRORS] ? dashboard_key[DASHBOARD_ERRORS] : [];

    const loading = dashboard_key && dashboard_key[DASHBOARD_LOADING] ? dashboard_key[DASHBOARD_LOADING] : false;
    const reflection_loading = dashboard_key && dashboard_key[DASHBOARD_RELECTION_LOADING] ? dashboard_key[DASHBOARD_RELECTION_LOADING] : false;

    return ({
        date,
        data,
        reflection,
        reflection_loading,

        selected_relfection,
        selected_relfection_created_at,

        loading,

        errors
    })
}

/** Manage User Data */
export const updateDashboardData = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[DASHBOARD_ROOT][DASHBOARD_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateDashboardDataState(data));
        } catch (error: any) {
            Utils.log("Update User Data ===> error ", error);
        }
    }
}

/** Update user data state */
const updateDashboardDataState = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[DASHBOARD_ROOT][DASHBOARD_KEY];

            dispatch({
                type: DASHBOARD_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error: any) {
            Utils.log("Update User Data State ===> error ", error);
        }
    }
}
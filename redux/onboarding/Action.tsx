import { DASHBOARD_DATA, DASHBOARD_KEY, DASHBOARD_ROOT, EMPTY, ERROR, MESSAGE, ONBOARDING_DATA, ONBOARDING_ERRORS, ONBOARDING_FORM, ONBOARDING_FORM_BRINGS_YOU_TO_AOR, ONBOARDING_FORM_CATEGORY, ONBOARDING_FORM_NAME, ONBOARDING_FORM_REFLECTION_DATA, ONBOARDING_FORM_QUESTIONS, ONBOARDING_FORM_REFLECTION_DATE, ONBOARDING_FORM_REFLECTION_ID, ONBOARDING_FORM_REMINDER_REPEATS, ONBOARDING_FORM_REMINDER_TIME, ONBOARDING_GET_REQUEST_LOADING, ONBOARDING_HIDE_CATEGORY_BACK_BUTTON, ONBOARDING_HIDE_QUESTIONS_BACK_BUTTON, ONBOARDING_IS_SKIP_REMINDER, ONBOARDING_KEY, ONBOARDING_REQEUST_LOADING, ONBOARDING_REQUEST_STATUS, ONBOARDING_RESET, ONBOARDING_ROOT, ONBOARDING_TAB_TYPE, ONBOARDING_TAB_TYPE_QUESTIONS, ONBOARDING_TAB_TYPE_SELECT_CATEGORY, ONBOARDING_TAB_TYPE_USER_NAME, ONBOARDING_UPDATE, SERVER_SUCCESS, SERVER_VALIDATION_ERROR, STATUS, SUCCESS, USER_DATA, USER_KEY, USER_ROOT, ONBOARDING_FORM_ADD_TODAY_REFLECTION } from '../Types';
import Utils from '../../components/util/Utils';
import { create_reflection, create_reminder, get_user_insights, get_welcome_screen_data, update_reflection } from "../../apis/APIs";

/** Create reflection name */
export const reflection = (skipQuestion: any, cb = (obj: any) => { }) => {
    return async (dispatch: any, getState: any) => {
        try {

            const user_key = getState()[USER_ROOT][USER_KEY];
            const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
            const user = user_data && user_data.user ? user_data.user : undefined;
            const token = user_data && user_data.token ? Utils.parseToken(user_data.token) : "";

            if ((!user || (user && !user.uid)) || !token) {
                return cb({
                    [STATUS]: ERROR,
                    [MESSAGE]: "Eigther user ID or token is missing."
                });
            }

            const onboarding_key = getState()[ONBOARDING_ROOT][ONBOARDING_KEY];
            const onboarding_form = onboarding_key && onboarding_key[ONBOARDING_FORM] ? onboarding_key[ONBOARDING_FORM] : undefined;

            const scid = onboarding_form && onboarding_form[ONBOARDING_FORM_CATEGORY] ? onboarding_form[ONBOARDING_FORM_CATEGORY] : "";
            const rid = onboarding_form && onboarding_form[ONBOARDING_FORM_REFLECTION_ID] ? onboarding_form[ONBOARDING_FORM_REFLECTION_ID] : "";
            let reflection_date = onboarding_form && onboarding_form[ONBOARDING_FORM_REFLECTION_DATE] ? onboarding_form[ONBOARDING_FORM_REFLECTION_DATE] : new Date().toISOString();
            reflection_date = new Date(reflection_date);
            reflection_date.setHours(new Date().getHours());
            reflection_date.setMinutes(new Date().getMinutes());
            reflection_date.setSeconds(0, 0);

            let questions = onboarding_form && onboarding_form[ONBOARDING_FORM_QUESTIONS] ? onboarding_form[ONBOARDING_FORM_QUESTIONS] : [];
            const questions_answer = questions && questions.length ? questions.map((ele: any) => ({ aid: ele.answer_id, answer: ele.answer, qid: ele._id })).filter((ele: any) => ele.answer) : [];
            questions = questions && questions.length ? questions.map((ele: any) => ({ aid: ele.answer_id, answer: ele.answer || "", qid: ele._id })).filter((ele: any) => ele.qid) : [];

            if (!skipQuestion && (!questions_answer || (questions_answer && !questions_answer.length))) {
                return cb({
                    [STATUS]: ERROR,
                    [MESSAGE]: "All question's answer is required."
                });
            }

            if (!skipQuestion && (questions_answer  && questions && questions_answer.length !== questions.length)) {
                return cb({
                    [STATUS]: ERROR,
                    [MESSAGE]: "All question's answer is required."
                });
            }

            let body: any = {
                scid,
                answers: questions,
                date: reflection_date.toISOString()
            };

            if (rid) body.rid = rid;

            console.log("body ===> ", body);

            const res = rid ? await update_reflection(body, { token }) : await create_reflection(body, { token });

            if (res && res.message) {
                let message = undefined;

                if (res.error_stack) {
                    message = res.error_stack.message ? res.error_stack.message : message;
                    message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
                    message = res.error_stack.error_message ? res.error_stack.error_message : message;
                }

                switch (res.message) {
                    case SERVER_SUCCESS:

                        cb({
                            [STATUS]: SUCCESS,
                            [MESSAGE]: ""
                        })

                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = message ? message : "Validation error";
                        cb({
                            [STATUS]: ERROR,
                            [MESSAGE]: message
                        })
                        break;
                    default:
                        message = res.error_stack && res.error_stack.message ? res.error_stack.message : "Internal server error";
                        cb({
                            [STATUS]: ERROR,
                            [MESSAGE]: message
                        })
                }
            }
        } catch (error: any) {
            Utils.log("Update Update Profile Form Data ===> error ", error);
            cb({
                [STATUS]: ERROR,
                [MESSAGE]: (error && error.message) || "Please try again"
            })
        }
    }
}

/** Get insights */
export const get_insights = (page: any, cid: any, cb = (obj: any) => { }) => {
    return async (dispatch: any, getState: any) => {
        try {

            const user_key = getState()[USER_ROOT][USER_KEY];
            const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
            const user = user_data && user_data.user ? user_data.user : undefined;
            const token = user_data && user_data.token ? Utils.parseToken(user_data.token) : "";

            console.log("insights data ===> data", token);
            if ((!user || (user && !user.uid)) || !token) {
                return cb({
                    [STATUS]: ERROR,
                    [MESSAGE]: "Eigther user ID or token is missing."
                });
            }

            let body: any = {
                page,
                cid
            };

            console.log("body ===> insights", body);

            const res = await get_user_insights(body, { token });

            if (res && res.message) {
                let message = undefined;

                if (res.error_stack) {
                    message = res.error_stack.message ? res.error_stack.message : message;
                    message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
                    message = res.error_stack.error_message ? res.error_stack.error_message : message;
                }

                switch (res.message) {
                    case SERVER_SUCCESS:

                        cb({
                            [STATUS]: SUCCESS,
                            data: res.data,
                            [MESSAGE]: ""
                        })

                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = message ? message : "Validation error";
                        cb({
                            [STATUS]: ERROR,
                            [MESSAGE]: message
                        })
                        break;
                    default:
                        message = res.error_stack && res.error_stack.message ? res.error_stack.message : "Internal server error";
                        cb({
                            [STATUS]: ERROR,
                            [MESSAGE]: message
                        })
                }
            }
        } catch (error: any) {
            Utils.log("Update Update Profile Form Data ===> error ", error);
            cb({
                [STATUS]: ERROR,
                [MESSAGE]: (error && error.message) || "Please try again"
            })
        }
    }
}

/** Create set reminder */
export const set_reminder = (code: any, cb = (obj: any) => { }) => {
    return async (dispatch: any, getState: any) => {
        try {

            const user_key = getState()[USER_ROOT][USER_KEY];
            const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
            const user = user_data && user_data.user ? user_data.user : undefined;
            const token = user_data && user_data.token ? Utils.parseToken(user_data.token) : "";

            if ((!user || (user && !user.uid)) || !token) {
                return cb({
                    [STATUS]: ERROR,
                    [MESSAGE]: "Eigther user ID or token is missing."
                });
            }

            const onboarding_key = getState()[ONBOARDING_ROOT][ONBOARDING_KEY];
            const onboarding_form = onboarding_key && onboarding_key[ONBOARDING_FORM] ? onboarding_key[ONBOARDING_FORM] : undefined;

            const repeats = onboarding_form && onboarding_form[ONBOARDING_FORM_REMINDER_REPEATS] ? onboarding_form[ONBOARDING_FORM_REMINDER_REPEATS] : [];
            let time = onboarding_form && onboarding_form[ONBOARDING_FORM_REMINDER_TIME] ? onboarding_form[ONBOARDING_FORM_REMINDER_TIME] : "";
            // time = time.split(":");
            const selected_time = time;

            // if (time && time.length) {
            //     const hours = parseInt(time[0]);
            //     const minutes = parseInt(time[1]);

            //     if (hours <= 12 && minutes <= 59) {
            //         selected_time.setHours(hours);
            //         selected_time.setMinutes(minutes);
            //     } else {
            //         return cb({
            //             [STATUS]: ERROR,
            //             [MESSAGE]: "Invalid time"
            //         })
            //     }
            // } else {
            //     return cb({
            //         [STATUS]: ERROR,
            //         [MESSAGE]: "Invalid time"
            //     })
            // }

            if (!repeats || (repeats && !repeats.length)) {
                return cb({
                    [STATUS]: ERROR,
                    [MESSAGE]: "No day is selected, yet."
                })
            }

            let body: any = {
                code,
                repeats,
                time: selected_time.toISOString()
            };

            console.log("body ===> ", body);

            const res = await create_reminder(body, { token });

            if (res && res.message) {
                let message = undefined;

                if (res.error_stack) {
                    message = res.error_stack.message ? res.error_stack.message : message;
                    message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
                    message = res.error_stack.error_message ? res.error_stack.error_message : message;
                }

                switch (res.message) {
                    case SERVER_SUCCESS:

                        cb({
                            [STATUS]: SUCCESS,
                            [MESSAGE]: ""
                        })

                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = message ? message : "Validation error";
                        cb({
                            [STATUS]: ERROR,
                            [MESSAGE]: message
                        })
                        break;
                    default:
                        message = res.error_stack && res.error_stack.message ? res.error_stack.message : "Internal server error";
                        cb({
                            [STATUS]: ERROR,
                            [MESSAGE]: message
                        })
                }
            }
        } catch (error: any) {
            Utils.log("Update Update Profile Form Data ===> error ", error);
            cb({
                [STATUS]: ERROR,
                [MESSAGE]: (error && error.message) || "Please try again"
            })
        }
    }
}

/** Set onboarding form data */
export const set_onboarding_data = () => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateOnBoardingUIConstraints({
                [ONBOARDING_GET_REQUEST_LOADING]: true,
                [ONBOARDING_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const user_key = getState()[USER_ROOT][USER_KEY];
            const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
            const user = user_data && user_data.user ? user_data.user : undefined;
            const token = user_data && user_data.token ? Utils.parseToken(user_data.token) : "";

            if ((!user || (user && !user.uid)) || !token) {
                return dispatch(updateOnBoardingUIConstraints({
                    [ONBOARDING_GET_REQUEST_LOADING]: false,
                    [ONBOARDING_REQUEST_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]: "Eigther user ID or token is missing."
                    }
                }));
            }

            const body = {
                date: new Date().toISOString()
            }

            const res = await get_welcome_screen_data(body, { token });

            if (res && res.message) {
                let message = undefined;

                if (res.error_stack) {
                    message = res.error_stack.message ? res.error_stack.message : message;
                    message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
                    message = res.error_stack.error_message ? res.error_stack.error_message : message;
                }

                switch (res.message) {
                    case SERVER_SUCCESS:

                        const { list_option = [], user = {}, sub_categories = [], reflection = {}, reminder = {} } = res.data || {};

                        const sub_category = reflection && reflection.sub_category ? reflection.sub_category : "";
                        const index = sub_categories && sub_categories.length ? sub_categories.findIndex((ele: any) => ele._id === sub_category) : -1;
                        let questions = index !== -1 ? sub_categories[index].questions : [];
                        if (questions && questions.length) {
                            questions = questions.map((ele: any) => {
                                const _answer: any = reflection.answers && reflection.answers.length ? Array.from(reflection.answers).filter((ele: any) => ele) : [];
                                const _index = _answer && _answer.length ? _answer.findIndex((value: any) => value && ele._id === value.question) : -1;

                                if (_index !== -1) {
                                    ele.answer_id = _answer[_index]._id;
                                    ele.answer = _answer[_index].answer;
                                }

                                return ele;
                            });

                            console.log("questions ===> ", questions);
                        }

                        console.log("questions ===> ", questions, sub_categories[index], index);

                        const { repeats, time } = reminder || {};
                        const _time = time ? new Date(time) : new Date();

                        _time.setHours(time ? _time.getHours() : 17);
                        _time.setMinutes(time ? _time.getMinutes() : 0);
                        _time.setSeconds(0, 0);

                        const _body = {
                            [ONBOARDING_FORM_NAME]: user && user.first_name ? user.first_name : "",
                            [ONBOARDING_FORM_BRINGS_YOU_TO_AOR]: user && user.what_brings_you_to_blossom && user.what_brings_you_to_blossom.length ? user.what_brings_you_to_blossom : [],
                            [ONBOARDING_FORM_CATEGORY]: reflection && reflection.sub_category ? reflection.sub_category : "",
                            [ONBOARDING_FORM_QUESTIONS]: questions,
                            [ONBOARDING_FORM_REFLECTION_ID]: reflection._id,
                            [ONBOARDING_FORM_REMINDER_REPEATS]: repeats && repeats.length ? repeats : [],
                            [ONBOARDING_FORM_REFLECTION_DATE]: reflection.created_at,
                            [ONBOARDING_FORM_ADD_TODAY_REFLECTION]: reflection.created_at && (new Date(reflection.created_at).toDateString() !== new Date().toDateString()) ? true : false,
                            [ONBOARDING_FORM_REMINDER_TIME]: _time
                        }

                        dispatch(updateOnBoardingFormData(_body));

                        dispatch(updateOnBoardingUIConstraints({
                            [ONBOARDING_DATA]: res.data || {},
                            [ONBOARDING_GET_REQUEST_LOADING]: false,
                            [ONBOARDING_REQUEST_STATUS]: {
                                [STATUS]: SUCCESS,
                                [MESSAGE]: ""
                            }
                        }));

                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = message ? message : "Validation error";
                        dispatch(updateOnBoardingUIConstraints({
                            [ONBOARDING_GET_REQUEST_LOADING]: false,
                            [ONBOARDING_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                        break;
                    default:
                        message = res.error_stack && res.error_stack.message ? res.error_stack.message : "Internal server error";
                        dispatch(updateOnBoardingUIConstraints({
                            [ONBOARDING_GET_REQUEST_LOADING]: false,
                            [ONBOARDING_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                }
            }
        } catch (error: any) {
            Utils.log("Update Update Profile Form Data ===> error ", error);
            dispatch(updateOnBoardingUIConstraints({
                [ONBOARDING_GET_REQUEST_LOADING]: false,
                [ONBOARDING_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** Set onboarding reflection page form data */
export const set_reflection_page_data = (rid: any) => {
    return async (dispatch: any, getState: any) => {
        try {

            //Intialize
            dispatch(updateOnBoardingUIConstraints({
                [ONBOARDING_GET_REQUEST_LOADING]: true,
                [ONBOARDING_REQUEST_STATUS]: {
                    [STATUS]: EMPTY,
                    [MESSAGE]: ""
                }
            }));

            const user_key = getState()[USER_ROOT][USER_KEY];
            const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
            const user = user_data && user_data.user ? user_data.user : undefined;
            const token = user_data && user_data.token ? Utils.parseToken(user_data.token) : "";

            if ((!user || (user && !user.uid)) || !token) {
                return dispatch(updateOnBoardingUIConstraints({
                    [ONBOARDING_GET_REQUEST_LOADING]: false,
                    [ONBOARDING_REQUEST_STATUS]: {
                        [STATUS]: ERROR,
                        [MESSAGE]: "Eigther user ID or token is missing."
                    }
                }));
            }

            const body = {
                date: new Date().toISOString()
            }

            const res = await get_welcome_screen_data(body, { token });

            if (res && res.message) {
                let message = undefined;

                if (res.error_stack) {
                    message = res.error_stack.message ? res.error_stack.message : message;
                    message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
                    message = res.error_stack.error_message ? res.error_stack.error_message : message;
                }

                switch (res.message) {
                    case SERVER_SUCCESS:

                        const { list_option = [], user = {}, sub_categories = [], reflection = {}, reminder = {} } = res.data || {};

                        const dashboard_key = getState()[DASHBOARD_ROOT][DASHBOARD_KEY];
                        const reflections_data = dashboard_key && dashboard_key[DASHBOARD_DATA] ? dashboard_key[DASHBOARD_DATA] : undefined;

                        const reflection_index = reflections_data && reflections_data.length ? reflections_data.findIndex((ele: any) => ele._id === rid) : -1;
                        const selected_reflection = reflection_index !== -1 ? reflections_data[reflection_index] : "";
                        const selected_rid = rid ? rid : "";
                        let selected_category = "";
                        if (selected_reflection && selected_reflection.sub_category) {
                            selected_category = selected_reflection && selected_reflection.sub_category ? selected_reflection.sub_category._id : "";
                        }

                        const index = sub_categories && sub_categories.length ? sub_categories.findIndex((ele: any) => ele._id === selected_category) : -1;
                        let questions = index !== -1 ? sub_categories[index].questions : [];
                        if (questions && questions.length) {
                            questions = questions.map((ele: any) => {
                                const _answer: any = selected_reflection.answers && selected_reflection.answers.length ? Array.from(selected_reflection.answers).filter((ele: any) => ele) : [];
                                const _index = _answer && _answer.length ? _answer.findIndex((value: any) => value && value.question._id && ele._id === value.question._id) : -1;

                                if (_index !== -1) {
                                    ele.answer_id = _answer[_index]._id;
                                    ele.answer = _answer[_index].answer;
                                }

                                return ele;
                            });

                            console.log("questions ===> ", questions);
                        }

                        console.log("questions ===> selected_category", questions, sub_categories[index], index, selected_category, reflection_index, reflections_data);

                        const { repeats, time } = reminder || {};

                        console.log("selectedDates ===> ", questions, sub_categories, index, selected_reflection)

                        const _body = {
                            [ONBOARDING_FORM_NAME]: user && user.first_name ? user.first_name : "",
                            [ONBOARDING_FORM_BRINGS_YOU_TO_AOR]: user && user.what_brings_you_to_blossom && user.what_brings_you_to_blossom.length ? user.what_brings_you_to_blossom : [],
                            [ONBOARDING_FORM_CATEGORY]: selected_category,
                            [ONBOARDING_FORM_QUESTIONS]: questions,
                            [ONBOARDING_FORM_REFLECTION_ID]: selected_rid,
                            [ONBOARDING_FORM_REMINDER_REPEATS]: repeats && repeats.length ? repeats : [],
                            [ONBOARDING_FORM_REMINDER_TIME]: time
                        }

                        dispatch(updateOnBoardingFormData(_body));

                        dispatch(updateOnBoardingUIConstraints({
                            [ONBOARDING_DATA]: res.data || {},
                            [ONBOARDING_GET_REQUEST_LOADING]: false,
                            [ONBOARDING_REQUEST_STATUS]: {
                                [STATUS]: SUCCESS,
                                [MESSAGE]: ""
                            }
                        }));

                        break;
                    case SERVER_VALIDATION_ERROR:
                        message = message ? message : "Validation error";
                        dispatch(updateOnBoardingUIConstraints({
                            [ONBOARDING_GET_REQUEST_LOADING]: false,
                            [ONBOARDING_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                        break;
                    default:
                        message = res.error_stack && res.error_stack.message ? res.error_stack.message : "Internal server error";
                        dispatch(updateOnBoardingUIConstraints({
                            [ONBOARDING_GET_REQUEST_LOADING]: false,
                            [ONBOARDING_REQUEST_STATUS]: {
                                [STATUS]: ERROR,
                                [MESSAGE]: message
                            }
                        }));
                }
            }
        } catch (error: any) {
            Utils.log("Update Update Profile Form Data ===> error ", error);
            dispatch(updateOnBoardingUIConstraints({
                [ONBOARDING_GET_REQUEST_LOADING]: false,
                [ONBOARDING_REQUEST_STATUS]: {
                    [STATUS]: ERROR,
                    [MESSAGE]: (error && error.message) || "Please try again"
                }
            }));
        }
    }
}

/** Get Welcome Form State */
export const welcome_wrapper_form_state_to_props = ({ onboarding }: any) => {
    const onboarding_key = onboarding && onboarding[ONBOARDING_KEY] ? onboarding[ONBOARDING_KEY] : undefined;
    const onboarding_form = onboarding_key && onboarding_key[ONBOARDING_FORM] ? onboarding_key[ONBOARDING_FORM] : undefined;

    const type = onboarding_key && onboarding_key[ONBOARDING_TAB_TYPE] ? onboarding_key[ONBOARDING_TAB_TYPE] : "";

    const errors = onboarding_key && onboarding_key[ONBOARDING_ERRORS] ? onboarding_key[ONBOARDING_ERRORS] : [];

    const loading = onboarding_key && onboarding_key[ONBOARDING_GET_REQUEST_LOADING] ? onboarding_key[ONBOARDING_GET_REQUEST_LOADING] : false;

    return ({
        type,

        loading,

        errors
    })
}

/** Get Progress Form State */
export const get_welcome_progress_form_state_to_props = ({ onboarding }: any) => {
    const onboarding_key = onboarding && onboarding[ONBOARDING_KEY] ? onboarding[ONBOARDING_KEY] : undefined;

    const isSkipReminder = onboarding_key && onboarding_key[ONBOARDING_IS_SKIP_REMINDER] ? onboarding_key[ONBOARDING_IS_SKIP_REMINDER] : "";

    return ({
        isSkipReminder
    })
}

/** Get Welcome Form State */
export const reminder_wrapper_form_state_to_props = ({ onboarding }: any) => {
    const onboarding_key = onboarding && onboarding[ONBOARDING_KEY] ? onboarding[ONBOARDING_KEY] : undefined;
    const onboarding_form = onboarding_key && onboarding_key[ONBOARDING_FORM] ? onboarding_key[ONBOARDING_FORM] : undefined;

    const time = onboarding_form && onboarding_form[ONBOARDING_FORM_REMINDER_TIME] ? onboarding_form[ONBOARDING_FORM_REMINDER_TIME] : "";
    const repeats = onboarding_form && onboarding_form[ONBOARDING_FORM_REMINDER_REPEATS] ? onboarding_form[ONBOARDING_FORM_REMINDER_REPEATS] : [];

    return ({
        time,
        repeats,
        repeats_length: repeats && repeats.length ? repeats.length : 0
    })
}

/** Get Welcome Update Profile Form State */
export const welcome_update_profile_form_state_to_props = ({ onboarding }: any) => {
    const onboarding_key = onboarding && onboarding[ONBOARDING_KEY] ? onboarding[ONBOARDING_KEY] : undefined;
    const onboarding_form = onboarding_key && onboarding_key[ONBOARDING_FORM] ? onboarding_key[ONBOARDING_FORM] : undefined;

    const name = onboarding_form && onboarding_form[ONBOARDING_FORM_NAME] ? onboarding_form[ONBOARDING_FORM_NAME] : "";

    const errors = onboarding_key && onboarding_key[ONBOARDING_ERRORS] ? onboarding_key[ONBOARDING_ERRORS] : [];

    return ({
        name,

        errors
    })
}

/** Get Welcome Options Form State */
export const welcome_options_form_state_to_props = ({ onboarding, user }: any) => {
    const onboarding_key = onboarding && onboarding[ONBOARDING_KEY] ? onboarding[ONBOARDING_KEY] : undefined;
    const onboarding_form = onboarding_key && onboarding_key[ONBOARDING_FORM] ? onboarding_key[ONBOARDING_FORM] : undefined;

    const name = onboarding_form && onboarding_form[ONBOARDING_FORM_NAME] ? onboarding_form[ONBOARDING_FORM_NAME] : "";
    const selected_options = onboarding_form && onboarding_form[ONBOARDING_FORM_BRINGS_YOU_TO_AOR] ? onboarding_form[ONBOARDING_FORM_BRINGS_YOU_TO_AOR] : [];

    const user_key = user && user[USER_KEY] ? user[USER_KEY] : {};
    const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
    const uid = user_data && user_data.user && user_data.user.uid ? user_data.user.uid : undefined;
    const token = user_data && user_data.token ? Utils.parseToken(user_data.token) : "";


    const onboarding_data = onboarding_key && onboarding_key[ONBOARDING_DATA] ? onboarding_key[ONBOARDING_DATA] : {};
    let options = onboarding_data && onboarding_data.list_option && onboarding_data.list_option.length ? onboarding_data.list_option : [];
    options = options.map((ele: any) => {
        if (selected_options && selected_options.length) ele.checked = selected_options.findIndex((value: any) => value === ele._id) !== -1 ? true : false;
        else ele.checked = false;

        return ele;
    });

    return ({
        options,
        name,
        uid,
        token
    })
}

/** Get Welcome Form State */
export const welcome_form_state_to_props = ({ onboarding }: any) => {
    const onboarding_key = onboarding && onboarding[ONBOARDING_KEY] ? onboarding[ONBOARDING_KEY] : undefined;
    const onboarding_form = onboarding_key && onboarding_key[ONBOARDING_FORM] ? onboarding_key[ONBOARDING_FORM] : undefined;

    const name = onboarding_form && onboarding_form[ONBOARDING_FORM_NAME] ? onboarding_form[ONBOARDING_FORM_NAME] : "";

    const errors = onboarding_key && onboarding_key[ONBOARDING_ERRORS] ? onboarding_key[ONBOARDING_ERRORS] : [];

    const loading = onboarding_key && onboarding_key[ONBOARDING_REQEUST_LOADING] ? onboarding_key[ONBOARDING_REQEUST_LOADING] : false;

    return ({
        name,

        loading,

        errors
    })
}

/** Check valid reflection edit */
export const checkReflectionEdit = (cb = (obj: any) => { }) => {
    return async (dispatch: any, getState: any) => {
        try {
            const onboarding_key = getState()[ONBOARDING_ROOT][ONBOARDING_KEY];
            const onboarding_form = onboarding_key && onboarding_key[ONBOARDING_FORM] ? onboarding_key[ONBOARDING_FORM] : undefined;

            const created_at = onboarding_form && onboarding_form[ONBOARDING_FORM_REFLECTION_DATE] ? onboarding_form[ONBOARDING_FORM_REFLECTION_DATE] : "";

            const date1: any = new Date();
            const date2: any = new Date(created_at);

            console.log(date1 >= date2)
            if (date1 >= date2) {
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60));

                console.log("created_at ===> data", created_at, diffDays);
                if (diffDays <= 6) return cb(true);
                else return cb(null);
            } else {
                return cb(null);
            }
        } catch (error: any) {
            Utils.log("Update Update Profile Form Data ===> error ", error);
            cb({
                [STATUS]: ERROR,
                [MESSAGE]: (error && error.message) || "Please try again"
            })
        }
    }
}

/** Get Welcome Reflection Form State */
export const welcome_reflection_form_state_to_props = ({ onboarding, user }: any) => {
    const onboarding_key = onboarding && onboarding[ONBOARDING_KEY] ? onboarding[ONBOARDING_KEY] : undefined;
    const onboarding_form = onboarding_key && onboarding_key[ONBOARDING_FORM] ? onboarding_key[ONBOARDING_FORM] : undefined;

    const selected_reflection = onboarding_form && onboarding_form[ONBOARDING_FORM_CATEGORY] ? onboarding_form[ONBOARDING_FORM_CATEGORY] : "";

    const onboarding_data = onboarding_key && onboarding_key[ONBOARDING_DATA] ? onboarding_key[ONBOARDING_DATA] : {};
    let reflections = onboarding_data && onboarding_data.sub_categories && onboarding_data.sub_categories.length ? onboarding_data.sub_categories : [];
    reflections = reflections.map((ele: any) => {
        ele.checked = ele._id === selected_reflection ? true : false;

        return ele;
    });
    const index = reflections.findIndex((ele: any) => ele._id === selected_reflection);
    const questions = index !== -1 ? reflections[index].questions : [];
    const selected_reflection_name = index !== -1 ? reflections[index].name.toUpperCase() : "";
    const selected_reflection_id = onboarding_form && onboarding_form[ONBOARDING_FORM_REFLECTION_ID] ? onboarding_form[ONBOARDING_FORM_REFLECTION_ID] : "";
    const created_at = onboarding_form && onboarding_form[ONBOARDING_FORM_REFLECTION_DATE] ? onboarding_form[ONBOARDING_FORM_REFLECTION_DATE] : null;
    const is_add_today_reflection = onboarding_form && onboarding_form[ONBOARDING_FORM_ADD_TODAY_REFLECTION] ? onboarding_form[ONBOARDING_FORM_ADD_TODAY_REFLECTION] : false;

    console.log("created_at ===> ", created_at, reflections, index)

    const hideCategoryBackButton = onboarding_key && onboarding_key[ONBOARDING_HIDE_CATEGORY_BACK_BUTTON] ? onboarding_key[ONBOARDING_HIDE_CATEGORY_BACK_BUTTON] : [];
    const errors = onboarding_key && onboarding_key[ONBOARDING_ERRORS] ? onboarding_key[ONBOARDING_ERRORS] : [];

    const user_key = user && user[USER_KEY] ? user[USER_KEY] : {};
    const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
    const first_name = user_data && user_data.user && user_data.user.first_name ? user_data.user.first_name : undefined;

    return ({
        reflections,
        first_name,

        selected_reflection_id,

        selected_reflection,
        selected_reflection_name,
        hideCategoryBackButton,
        questions: JSON.stringify(questions),
        created_at,
        is_add_today_reflection,

        errors
    })
}

/** Get Welcome Question Form State */
export const welcome_question_form_state_to_props = ({ onboarding }: any) => {
    const onboarding_key = onboarding && onboarding[ONBOARDING_KEY] ? onboarding[ONBOARDING_KEY] : undefined;
    const onboarding_form = onboarding_key && onboarding_key[ONBOARDING_FORM] ? onboarding_key[ONBOARDING_FORM] : undefined;

    const questions = onboarding_form && onboarding_form[ONBOARDING_FORM_QUESTIONS] ? onboarding_form[ONBOARDING_FORM_QUESTIONS] : [];
    const hideQuestionButton = onboarding_key && onboarding_key[ONBOARDING_HIDE_QUESTIONS_BACK_BUTTON] ? onboarding_key[ONBOARDING_HIDE_QUESTIONS_BACK_BUTTON] : false;

    console.log("reflections ===> ", questions);

    const errors = onboarding_key && onboarding_key[ONBOARDING_ERRORS] ? onboarding_key[ONBOARDING_ERRORS] : [];

    return ({
        questions,
        hideQuestionButton
    })
}

/** Manage Update Profile Form Data */
export const updateOnBoardingFormOptionsData = (value: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[ONBOARDING_ROOT][ONBOARDING_KEY];
            const data = Object.assign(formData[ONBOARDING_FORM]);
            let selected_options = data && data[ONBOARDING_FORM_BRINGS_YOU_TO_AOR] && data[ONBOARDING_FORM_BRINGS_YOU_TO_AOR].length ? data[ONBOARDING_FORM_BRINGS_YOU_TO_AOR] : [];

            const index = selected_options && selected_options.length ? selected_options.indexOf(value) : -1;

            if (index !== -1) {
                selected_options.splice(index, 1);
            } else {
                selected_options.push(value);
            }

            dispatch(updateOnBoardingFormData(Object.assign(formData, {
                [ONBOARDING_FORM_BRINGS_YOU_TO_AOR]: selected_options
            })));
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
        }
    }
}

/** Manage Questions Form Data */
export const updateOnBoardingFormQuestionsData = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[ONBOARDING_ROOT][ONBOARDING_KEY];
            const data = Object.assign(formData[ONBOARDING_FORM]);
            let questions = data && data[ONBOARDING_FORM_QUESTIONS] && data[ONBOARDING_FORM_QUESTIONS].length ? data[ONBOARDING_FORM_QUESTIONS] : [];

            const { id, answer } = obj;
            const index = questions && questions.length ? questions.findIndex((ele: any) => ele._id === id) : -1;

            if (index !== -1) {
                questions[index].answer = answer;
            }

            dispatch(updateOnBoardingFormData(Object.assign(formData, {
                [ONBOARDING_FORM_BRINGS_YOU_TO_AOR]: questions
            })));
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
        }
    }
}

/** Manage Reminder Repeat Form Data */
export const updateOnBoardingFormReminderRepeatsData = (value: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[ONBOARDING_ROOT][ONBOARDING_KEY];
            const data = Object.assign(formData[ONBOARDING_FORM]);
            let repeats = data && data[ONBOARDING_FORM_REMINDER_REPEATS] && data[ONBOARDING_FORM_REMINDER_REPEATS].length ? data[ONBOARDING_FORM_REMINDER_REPEATS] : [];

            const index = repeats && repeats.length ? repeats.indexOf(value) : -1;

            if (index !== -1) {
                if (repeats && repeats.length) repeats.splice(index, 1);
            } else {
                repeats.push(value);
            }

            dispatch(updateOnBoardingFormData(Object.assign(formData, {
                [ONBOARDING_FORM_REMINDER_REPEATS]: repeats
            })));
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
        }
    }
}

/** Manage Update Profile Form Data */
export const updateOnBoardingFormData = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[ONBOARDING_ROOT][ONBOARDING_KEY];
            const data = Object.assign(formData[ONBOARDING_FORM], obj);

            dispatch(updateOnBoardingState(Object.assign(formData, {
                [ONBOARDING_FORM]: data
            })));
        } catch (error: any) {
            Utils.log("Update Form Data ===> error ", error);
        }
    }
}

/** Manage UI Constraints */
export const updateOnBoardingUIConstraints = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[ONBOARDING_ROOT][ONBOARDING_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateOnBoardingState(data));
        } catch (error: any) {
            Utils.log("Update UI Constraints ===> error ", error);
        }
    }
}

/** Update onboarding data state */
const updateOnBoardingState = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[ONBOARDING_ROOT][ONBOARDING_KEY];

            dispatch({
                type: ONBOARDING_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error: any) {
            Utils.log("Update Onboarding State ===> error ", error);
        }
    }
}

/** Reset onboarding data state */
export const resetOnBoardingState = () => {
    return (dispatch: any, getState: any) => {
        try {
            dispatch({
                type: ONBOARDING_RESET,
                payload: {}
            })
        } catch (error: any) {
            Utils.log("Reset Onboarding State ===> error ", error);
        }
    }
}
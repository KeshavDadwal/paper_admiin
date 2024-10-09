import { EMPTY, LOG_OUT, MESSAGE, ONBOARDING_DATA, ONBOARDING_ERRORS, ONBOARDING_FORM, ONBOARDING_FORM_BRINGS_YOU_TO_AOR, ONBOARDING_FORM_CATEGORY, ONBOARDING_FORM_NAME, ONBOARDING_FORM_QUESTIONS, ONBOARDING_FORM_REFLECTION_ID, ONBOARDING_FORM_REMINDER_REPEATS, ONBOARDING_GET_REQUEST_LOADING, ONBOARDING_IS_SETUP_PROFILE, ONBOARDING_KEY, ONBOARDING_REQEUST_LOADING, ONBOARDING_REQUEST_STATUS, ONBOARDING_RESET, ONBOARDING_TAB_TYPE, ONBOARDING_TAB_TYPE_WELCOME, ONBOARDING_UPDATE, STATUS, ONBOARDING_FORM_REMINDER_TIME, ONBOARDING_IS_SKIP_REMINDER, ONBOARDING_HIDE_QUESTIONS_BACK_BUTTON, ONBOARDING_HIDE_CATEGORY_BACK_BUTTON, ONBOARDING_FORM_REFLECTION_DATE, ONBOARDING_FORM_ADD_TODAY_REFLECTION } from "../Types";

const INITIAL_STATE = {
    [ONBOARDING_KEY]: {
        [ONBOARDING_FORM]: {
            [ONBOARDING_FORM_NAME]: "",
            [ONBOARDING_FORM_CATEGORY]: "",
            [ONBOARDING_FORM_REFLECTION_DATE]: "",
            [ONBOARDING_FORM_ADD_TODAY_REFLECTION]: false,
            [ONBOARDING_FORM_QUESTIONS]: "",
            [ONBOARDING_FORM_BRINGS_YOU_TO_AOR]: undefined,
            [ONBOARDING_FORM_REFLECTION_ID]: undefined,
            [ONBOARDING_FORM_REMINDER_REPEATS]: undefined,
            [ONBOARDING_FORM_REMINDER_TIME]: undefined,
        },

        [ONBOARDING_TAB_TYPE]: ONBOARDING_TAB_TYPE_WELCOME,
        [ONBOARDING_IS_SETUP_PROFILE]: false,
        [ONBOARDING_IS_SKIP_REMINDER]: false,
        [ONBOARDING_HIDE_QUESTIONS_BACK_BUTTON]: false,
        [ONBOARDING_HIDE_CATEGORY_BACK_BUTTON]: false,
        [ONBOARDING_DATA]: undefined,

        [ONBOARDING_ERRORS]: [],
        [ONBOARDING_REQEUST_LOADING]: false,
        [ONBOARDING_GET_REQUEST_LOADING]: false,
        [ONBOARDING_REQUEST_STATUS]: {
            [STATUS]: EMPTY,
            [MESSAGE]: ""
        }
    }
};

const Reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ONBOARDING_UPDATE:
            return { ...state, [ONBOARDING_KEY]: action.payload }
        case ONBOARDING_RESET:
        case LOG_OUT:
            return {
                ...state,
                [ONBOARDING_KEY]: {
                    [ONBOARDING_FORM]: {
                        [ONBOARDING_FORM_NAME]: "",
                        [ONBOARDING_FORM_CATEGORY]: "",
                        [ONBOARDING_FORM_REFLECTION_DATE]: "",
                        [ONBOARDING_FORM_ADD_TODAY_REFLECTION]: false,
                        [ONBOARDING_FORM_QUESTIONS]: "",
                        [ONBOARDING_FORM_BRINGS_YOU_TO_AOR]: undefined,
                        [ONBOARDING_FORM_REFLECTION_ID]: undefined,
                        [ONBOARDING_FORM_REMINDER_REPEATS]: undefined,
                        [ONBOARDING_FORM_REMINDER_TIME]: undefined,
                    },

                    [ONBOARDING_TAB_TYPE]: ONBOARDING_TAB_TYPE_WELCOME,
                    [ONBOARDING_IS_SETUP_PROFILE]: false,
                    [ONBOARDING_IS_SKIP_REMINDER]: false,
                    [ONBOARDING_HIDE_QUESTIONS_BACK_BUTTON]: false,
                    [ONBOARDING_HIDE_CATEGORY_BACK_BUTTON]: false,
                    [ONBOARDING_DATA]: undefined,

                    [ONBOARDING_ERRORS]: [],
                    [ONBOARDING_REQEUST_LOADING]: false,
                    [ONBOARDING_GET_REQUEST_LOADING]: false,
                    [ONBOARDING_REQUEST_STATUS]: {
                        [STATUS]: EMPTY,
                        [MESSAGE]: ""
                    }
                }
            }
        default:
            return state;
    }
}

export default Reducer;
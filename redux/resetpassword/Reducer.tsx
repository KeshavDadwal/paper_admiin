import { RESET_PASSWORD_FORM, RESET_PASSWORD_FORM_TOKEN, RESET_PASSWORD_FORM_PASSWORD, RESET_PASSWORD_FORM_CONFIRM_PASSWORD, RESET_PASSWORD_FORM_UID, RESET_PASSWORD_REQEUST_LOADING, RESET_PASSWORD_REQUEST_STATUS, STATUS, EMPTY, MESSAGE, RESET_PASSWORD_UPDATE, RESET_PASSWORD_KEY, RESET_PASSWORD_RESET, LOG_OUT } from "../Types";

const INITIAL_STATE = {
    [RESET_PASSWORD_KEY]: {
        [RESET_PASSWORD_FORM]: {
            [RESET_PASSWORD_FORM_UID]: "",
            [RESET_PASSWORD_FORM_TOKEN]: "",
            [RESET_PASSWORD_FORM_PASSWORD]: "",
            [RESET_PASSWORD_FORM_CONFIRM_PASSWORD]: "",
        },
        [RESET_PASSWORD_REQEUST_LOADING]: false,
        [RESET_PASSWORD_REQUEST_STATUS]: {
            [STATUS]: EMPTY,
            [MESSAGE]: ""
        }
    }
};

const Reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case RESET_PASSWORD_UPDATE:
            return { ...state, [RESET_PASSWORD_KEY]: action.payload }
        case RESET_PASSWORD_RESET:
        case LOG_OUT:
            return {
                ...state,
                [RESET_PASSWORD_KEY]: {
                    [RESET_PASSWORD_FORM]: {
                        [RESET_PASSWORD_FORM_UID]: "",
                        [RESET_PASSWORD_FORM_TOKEN]: "",
                        [RESET_PASSWORD_FORM_PASSWORD]: "",
                        [RESET_PASSWORD_FORM_CONFIRM_PASSWORD]: "",
                    },
                    [RESET_PASSWORD_REQEUST_LOADING]: false,
                    [RESET_PASSWORD_REQUEST_STATUS]: {
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
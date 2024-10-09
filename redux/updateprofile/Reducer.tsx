import { EMPTY, LOG_OUT, MESSAGE, STATUS, UPDATE_PROFILE_ERRORS, UPDATE_PROFILE_FORM, UPDATE_PROFILE_FORM_COMPANY_NAME, UPDATE_PROFILE_FORM_CONFIRM_PASSWORD, UPDATE_PROFILE_FORM_DEPARTMENT, UPDATE_PROFILE_FORM_EMAIL, UPDATE_PROFILE_FORM_FIRST_NAME, UPDATE_PROFILE_FORM_IMAGE_BLOB, UPDATE_PROFILE_FORM_IMAGE_URL, UPDATE_PROFILE_FORM_JOB_TITLE, UPDATE_PROFILE_FORM_LAST_NAME, UPDATE_PROFILE_FORM_LINKDIN_URL, UPDATE_PROFILE_FORM_OLD_PASSWORD, UPDATE_PROFILE_FORM_PASSWORD, UPDATE_PROFILE_FORM_PHONE, UPDATE_PROFILE_KEY, UPDATE_PROFILE_REQEUST_LOADING, UPDATE_PROFILE_REQUEST_STATUS, UPDATE_PROFILE_RESET, UPDATE_PROFILE_UPDATE } from "../Types";

const INITIAL_STATE = {
    [UPDATE_PROFILE_KEY]: {
        [UPDATE_PROFILE_FORM]: {
            [UPDATE_PROFILE_FORM_IMAGE_URL]: "",
            [UPDATE_PROFILE_FORM_IMAGE_BLOB]: undefined,

            [UPDATE_PROFILE_FORM_EMAIL]: "",
            [UPDATE_PROFILE_FORM_FIRST_NAME]: "",
            [UPDATE_PROFILE_FORM_LAST_NAME]: "",

            [UPDATE_PROFILE_FORM_OLD_PASSWORD]: "",
            [UPDATE_PROFILE_FORM_PASSWORD]: "",
            [UPDATE_PROFILE_FORM_CONFIRM_PASSWORD]: "",
            
            [UPDATE_PROFILE_FORM_COMPANY_NAME]: "",            
            [UPDATE_PROFILE_FORM_PHONE]: "",

            [UPDATE_PROFILE_FORM_DEPARTMENT]: "",
            [UPDATE_PROFILE_FORM_JOB_TITLE]: "",
            [UPDATE_PROFILE_FORM_LINKDIN_URL]: ""
        },
        
        [UPDATE_PROFILE_ERRORS]: [],
        [UPDATE_PROFILE_REQEUST_LOADING]: false,
        [UPDATE_PROFILE_REQUEST_STATUS]: {
            [STATUS]: EMPTY,
            [MESSAGE]: ""
        }
    }
};

const Reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case UPDATE_PROFILE_UPDATE:
            return { ...state, [UPDATE_PROFILE_KEY]: action.payload }
        case UPDATE_PROFILE_RESET:
        case LOG_OUT:
            return {
                ...state,
                [UPDATE_PROFILE_KEY]: {
                    [UPDATE_PROFILE_FORM]: {
                        [UPDATE_PROFILE_FORM_IMAGE_URL]: "",
                        [UPDATE_PROFILE_FORM_IMAGE_BLOB]: undefined,
            
                        [UPDATE_PROFILE_FORM_EMAIL]: "",
                        [UPDATE_PROFILE_FORM_FIRST_NAME]: "",
                        [UPDATE_PROFILE_FORM_LAST_NAME]: "",
            
                        [UPDATE_PROFILE_FORM_OLD_PASSWORD]: "",
                        [UPDATE_PROFILE_FORM_PASSWORD]: "",
                        [UPDATE_PROFILE_FORM_CONFIRM_PASSWORD]: "",
                        
                        [UPDATE_PROFILE_FORM_COMPANY_NAME]: "",            
                        [UPDATE_PROFILE_FORM_PHONE]: "",
            
                        [UPDATE_PROFILE_FORM_DEPARTMENT]: "",
                        [UPDATE_PROFILE_FORM_JOB_TITLE]: "",
                        [UPDATE_PROFILE_FORM_LINKDIN_URL]: ""
                    },
                    
                    [UPDATE_PROFILE_ERRORS]: [],
                    [UPDATE_PROFILE_REQEUST_LOADING]: false,
                    [UPDATE_PROFILE_REQUEST_STATUS]: {
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
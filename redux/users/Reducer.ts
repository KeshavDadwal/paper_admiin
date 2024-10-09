import { LOG_OUT, USERS_KEY, USERS_DATA, USERS_UPDATE, USERS_REQUEST_STATUS, STATUS, EMPTY, MESSAGE, USERS_LOADING, USERS_DELETE_LOADING } from "../Types";

const INITIAL_STATE = {
    [USERS_KEY]: {
        [USERS_LOADING]:false,
        [USERS_DELETE_LOADING]:false,
    }
};

const Reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case USERS_UPDATE:
            return { ...state, [USERS_KEY]: action.payload }
        case LOG_OUT:
            return {
                ...state,
                [USERS_KEY]: {
                    [USERS_LOADING]:false,
                    [USERS_DELETE_LOADING]:false
                }
            }
        default:
            return state;
    }
}

export default Reducer;

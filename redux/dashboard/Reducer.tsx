import { LOG_OUT, DASHBOARD_KEY, DASHBOARD_DATA, DASHBOARD_UPDATE, DASHBOARD_REQUEST_STATUS, STATUS, EMPTY, MESSAGE, DASHBOARD_LOADING, DASHBOARD_SELECTED_REFLECTION_DATA } from "../Types";

const INITIAL_STATE = {
    [DASHBOARD_KEY]: {
        [DASHBOARD_DATA]: undefined,
        [DASHBOARD_LOADING]: false,
        [DASHBOARD_REQUEST_STATUS]: {
            [STATUS]: EMPTY,
            [MESSAGE]: ""
        },
        [DASHBOARD_SELECTED_REFLECTION_DATA]: undefined
    }
};

const Reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case DASHBOARD_UPDATE:
            return { ...state, [DASHBOARD_KEY]: action.payload }
        case LOG_OUT:
            return {
                ...state,
                [DASHBOARD_KEY]: {
                    [DASHBOARD_DATA]: undefined,
                    [DASHBOARD_LOADING]: false,
                    [DASHBOARD_REQUEST_STATUS]: {
                        [STATUS]: EMPTY,
                        [MESSAGE]: ""
                    },
                    [DASHBOARD_SELECTED_REFLECTION_DATA]: undefined
                }
            }
        default:
            return state;
    }
}

export default Reducer;
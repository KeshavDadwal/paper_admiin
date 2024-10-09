import {
  SYSTEM_DATA_KEY,
  SYSTEM_DATA_IS_AUTHENTICATED,
  SYSTEM_DATA_UPDATE,
  LOG_OUT,
  SYSTEM_DATA_PAGE_TITLE,
  SYSTEM_DATA_ACCREDITED_INVESTOR_DATA,
  SYSTEM_DATA_IS_SETUP_PROFILE,
  SYSTEM_DATA_IS_SETUP_REMINDER,
  SYSTEM_DATA_IS_SKIP_REMINDER,
  SYSTEM_DATA_IS_HIDE_HEADER,
  SYSTEM_DATA_IS_HIDE_SIDEBAR
} from "../Types";

const INITIAL_STATE = {
  [SYSTEM_DATA_KEY]: {
    [SYSTEM_DATA_IS_AUTHENTICATED]: false,
    [SYSTEM_DATA_IS_SETUP_PROFILE]: false,
    [SYSTEM_DATA_IS_SETUP_REMINDER]: false,
    [SYSTEM_DATA_IS_SKIP_REMINDER]: false,
    [SYSTEM_DATA_IS_HIDE_HEADER]: false,
    [SYSTEM_DATA_IS_HIDE_SIDEBAR]: false,
    [SYSTEM_DATA_PAGE_TITLE]: ""
  }
};

const Reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SYSTEM_DATA_UPDATE:
      return { ...state, [SYSTEM_DATA_KEY]: action.payload };
    case LOG_OUT:
      return {
        ...state,
        [SYSTEM_DATA_KEY]: {
          [SYSTEM_DATA_IS_AUTHENTICATED]: false,
          [SYSTEM_DATA_IS_SETUP_PROFILE]: false,
          [SYSTEM_DATA_IS_SETUP_REMINDER]: false,
          [SYSTEM_DATA_IS_SKIP_REMINDER]: false,
          [SYSTEM_DATA_IS_HIDE_HEADER]: false,
          [SYSTEM_DATA_IS_HIDE_SIDEBAR]: false,
          [SYSTEM_DATA_PAGE_TITLE]: ""
        }
      };
    default:
      return state;
  }
};

export default Reducer;

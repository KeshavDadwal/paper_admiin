import {
  SIDEBAR_KEY,
  SIDEBAR_IS_SHOW,
  SIDEBAR_PROPS,
  SIDEBAR_UPDATE,
  LOG_OUT,
  SIDEBAR_PAGE_PATH,
  STATUS,
  EMPTY,
  MESSAGE
} from "../Types";

const INITIAL_STATE = {
  [SIDEBAR_KEY]: {
    [SIDEBAR_IS_SHOW]: false,
    [SIDEBAR_PROPS]: undefined,
    [SIDEBAR_PAGE_PATH]: ""
  }
};

const Reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SIDEBAR_UPDATE:
      return { ...state, [SIDEBAR_KEY]: action.payload };
    case LOG_OUT:
      return {
        ...state,
        [SIDEBAR_KEY]: {
          [SIDEBAR_IS_SHOW]: false,
          [SIDEBAR_PROPS]: undefined,
          [SIDEBAR_PAGE_PATH]: ""
        }
      };
    default:
      return state;
  }
};

export default Reducer;

import { SIGNUP_KEY, SIGNUP_FORM, SIGNUP_FORM_FIRST_NAME, SIGNUP_FORM_LAST_NAME, SIGNUP_FORM_EMAIL, SIGNUP_FORM_PASSWORD, SIGNUP_REQEUST_LOADING, SIGNUP_REQUEST_STATUS, STATUS, EMPTY, MESSAGE, SIGNUP_ERRORS, SIGNUP_FORM_ACCOUNT_TYPE, SIGNUP_FORM_ACCREDITED_INVESTOR, SIGNUP_FORM_I_AGREE_TERMS_AND_PRIVACY_POLICY, SIGNUP_FORM_ACCOUNT_TYPE_INVESTMENT_OWNER, SIGNUP_UPDATE, SIGNUP_RESET, LOG_OUT, SIGNUP_FORM_ACCREDITED_INVESTOR_AGREE_TERMS, SIGNUP_FORM_ACCREDITED_INVESTOR_ANNUAL_INCOME, SIGNUP_FORM_ACCREDITED_INVESTOR_NETWORTH, SIGNUP_FORM_ACCREDITED_INVESTOR_LAST_OFFERING } from "../Types";

const INITIAL_STATE = {
  [SIGNUP_KEY]: {
    [SIGNUP_FORM]: {
      [SIGNUP_FORM_FIRST_NAME]: "",
      [SIGNUP_FORM_LAST_NAME]: "",
      [SIGNUP_FORM_EMAIL]: "",
      [SIGNUP_FORM_PASSWORD]: "",
      [SIGNUP_FORM_ACCOUNT_TYPE]: SIGNUP_FORM_ACCOUNT_TYPE_INVESTMENT_OWNER,
      [SIGNUP_FORM_ACCREDITED_INVESTOR]: "",

      [SIGNUP_FORM_ACCREDITED_INVESTOR_AGREE_TERMS]: "",
      [SIGNUP_FORM_ACCREDITED_INVESTOR_ANNUAL_INCOME]: "",
      [SIGNUP_FORM_ACCREDITED_INVESTOR_NETWORTH]: "",
      [SIGNUP_FORM_ACCREDITED_INVESTOR_LAST_OFFERING]: "",

      [SIGNUP_FORM_I_AGREE_TERMS_AND_PRIVACY_POLICY]: false
    },
    [SIGNUP_REQEUST_LOADING]: false,
    [SIGNUP_REQUEST_STATUS]: {
      [STATUS]: EMPTY,
      [MESSAGE]: ""
    },
    [SIGNUP_ERRORS]: []
  }
};

const Reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SIGNUP_UPDATE:
      return { ...state, [SIGNUP_KEY]: action.payload };
    case SIGNUP_RESET:
    case LOG_OUT:
      return {
        ...state,
        ...{
          [SIGNUP_KEY]: {
            [SIGNUP_FORM]: {
              [SIGNUP_FORM_FIRST_NAME]: "",
              [SIGNUP_FORM_LAST_NAME]: "",
              [SIGNUP_FORM_EMAIL]: "",
              [SIGNUP_FORM_PASSWORD]: "",
              [SIGNUP_FORM_ACCOUNT_TYPE]: SIGNUP_FORM_ACCOUNT_TYPE_INVESTMENT_OWNER,
              [SIGNUP_FORM_ACCREDITED_INVESTOR]: "",
        
              [SIGNUP_FORM_ACCREDITED_INVESTOR_AGREE_TERMS]: "",
              [SIGNUP_FORM_ACCREDITED_INVESTOR_ANNUAL_INCOME]: "",
              [SIGNUP_FORM_ACCREDITED_INVESTOR_NETWORTH]: "",
              [SIGNUP_FORM_ACCREDITED_INVESTOR_LAST_OFFERING]: "",
        
              [SIGNUP_FORM_I_AGREE_TERMS_AND_PRIVACY_POLICY]: false
            },
            [SIGNUP_REQEUST_LOADING]: false,
            [SIGNUP_REQUEST_STATUS]: {
              [STATUS]: EMPTY,
              [MESSAGE]: ""
            },
            [SIGNUP_ERRORS]: []
          }
        }
      };
    default:
      return state;
  }
};

export default Reducer;
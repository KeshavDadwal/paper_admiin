import Utils from "../../components/util/Utils";
import { FOOTER_ROOT, FOOTER_KEY, FOOTER_UPDATE, FOOTER_FORM } from "../Types";

/** Manage Footer UI Constraints */
export const updateFooterUIConstraints = (obj: any) => {
  return (dispatch: any, getState: any) => {
    try {
      const formData = getState()[FOOTER_ROOT][FOOTER_KEY];
      const data = Object.assign(formData, obj);

      dispatch(updateFooterState(data));
    } catch (error) {
      Utils.log("Update Footer UI Constraints ===> error ", error);
    }
  };
};

/** Update Footer data state */
const updateFooterState = (obj: any) => {
  return (dispatch: any, getState: any) => {
    try {
      const formData = getState()[FOOTER_ROOT][FOOTER_KEY];

      dispatch({
        type: FOOTER_UPDATE,
        payload: Object.assign(formData, obj)
      });
    } catch (error) {
      Utils.log("Update Footer State ===> error ", error);
    }
  };
};

/** Manage Form Data */
export const updateFooterFormData = (obj: any) => {
  return (dispatch: any, getState: any) => {
    try {
      const formData = getState()[FOOTER_ROOT][FOOTER_KEY];
      const data = Object.assign(formData[FOOTER_KEY], obj);

      dispatch(
        updateFooterState(
          Object.assign(formData, {
            [FOOTER_KEY]: data
          })
        )
      );
    } catch (error) {
      Utils.log("Update Form Data ===> error ", error);
    }
  };
};

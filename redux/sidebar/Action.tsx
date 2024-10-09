import {
  SIDEBAR_ROOT,
  SIDEBAR_KEY,
  SIDEBAR_UPDATE
} from "../Types";
import Utils from "../../components/util/Utils";

/** Manage Sidebar UI Constraints */
export const updateSidebarUIConstraints = (obj: any) => {
  return (dispatch: any, getState: any) => {
    try {
      const formData = getState()[SIDEBAR_ROOT][SIDEBAR_KEY];
      const data = Object.assign(formData, obj);

      dispatch(updateSidebarState(data));
    } catch (error: any) {
      Utils.log("Update Sidebar UI Constraints ===> error ", error);
    }
  };
};

/** Update Sidebar data state */
const updateSidebarState = (obj: any) => {
  return (dispatch: any, getState: any) => {
    try {
      const formData = getState()[SIDEBAR_ROOT][SIDEBAR_KEY];

      dispatch({
        type: SIDEBAR_UPDATE,
        payload: Object.assign(formData, obj)
      });
    } catch (error: any) {
      Utils.log("Update Sidebar State ===> error ", error);
    }
  };
};

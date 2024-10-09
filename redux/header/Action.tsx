import Utils from '../../components/util/Utils';
import { HEADER_ROOT, HEADER_KEY, HEADER_UPDATE, USER_KEY, USER_DATA } from '../Types';

/** Get Header State */
export const header_state_to_props = ({ user }: any) => {
    const user_key = user && user[USER_KEY] ? user[USER_KEY] : undefined;

    const user_data = user_key && user_key[USER_DATA] ? user_key[USER_DATA] : undefined;
    const user_detail = user_data && user_data.user ? user_data.user : undefined;
    const is_setup_profile = user_detail && user_detail.is_setup_profile ? user_detail.is_setup_profile : false;
    const company_associated_person = user_detail && user_detail.company_associated_person ? user_detail.company_associated_person : null;
    
    console.log("profile ", user_detail, is_setup_profile);

    return ({
        is_logged_in: user_detail && user_detail.uid ? true : false,
        is_setup_profile,
        is_open_company_associated_person_page: !company_associated_person ? true : false
    })
}

/** Manage Header UI Constraints */
export const updateHeaderUIConstraints = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[HEADER_ROOT][HEADER_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateHeaderState(data));
        } catch (error: any) {
            Utils.log("Update Header UI Constraints ===> error ", error);
        }
    }
}

/** Update Header data state */
const updateHeaderState = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[HEADER_ROOT][HEADER_KEY];

            dispatch({
                type: HEADER_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error: any) {
            Utils.log("Update Header State ===> error ", error);
        }
    }
}
import AORStorage from 'apis/AORStorage';
import Utils from '../../components/util/Utils';
import { USERS_ROOT, USERS_KEY, USERS_UPDATE, USERS_REQUEST_STATUS, STATUS, MESSAGE, TOKEN_NOT_FOUND, USERS_LOADING, USERS_DATA, SUCCESS, ERROR, USER_ROOT, USER_KEY, USER_DATA, EMPTY, USERS_DELETE_LOADING, RESPONSE } from '../Types';
import { collection, deleteDoc, getDoc, getDocs, query, where } from "firebase/firestore";

export const user_delete_btn_state_to_props = ({ users }: any) => {
    const users_key = users && users[USERS_KEY] ? users[USERS_KEY] : {};
    const users_list_loading = users_key && users_key[USERS_LOADING] ? users_key[USERS_LOADING] : undefined;

    return ({
        users_list_loading
    });
}

export const user_list_state_to_props = ({ users }: any) => {
    const users_key = users && users[USERS_KEY] ? users[USERS_KEY] : {};
    const users_list_loading = users_key && users_key[USERS_LOADING] ? users_key[USERS_LOADING] : undefined;

    return ({
        users_list_loading
    });
}

/** Manage User Data */
export const updateUsersUIConstraintsData = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[USERS_ROOT][USERS_KEY];
            const data = Object.assign(formData, obj);

            dispatch(updateUsersDataState(data));
        } catch (error: any) {
            Utils.log("Update User Data ===> error ", error);
        }
    }
}

/** Update user data state */
const updateUsersDataState = (obj: any) => {
    return (dispatch: any, getState: any) => {
        try {
            const formData = getState()[USERS_ROOT][USERS_KEY];

            dispatch({
                type: USERS_UPDATE,
                payload: Object.assign(formData, obj)
            })
        } catch (error: any) {
            Utils.log("Update User Data State ===> error ", error);
        }
    }
}

const RemoveUsers = (id: string) => {
    return new Promise(async (resolve, reject) => {

        const db = Utils.getFirestoreDB();

        const queryRef = query(collection(db, "Users"), where("id", "==", id));
        const querySnapshot: any = await getDocs(queryRef as any);

        if(!querySnapshot.empty) {
            let count = 0;
            querySnapshot.forEach((doc: any) => {
                function removeData(value: any) {
                    deleteDoc(value.ref);
                }

                removeData(doc);

                if(count === querySnapshot.size-1) {
                    return resolve(null);
                }
                count++;
            });
        } else {
            return resolve(null);
        }
    })
}

const RemoveReport = (id: string) => {
    return new Promise(async (resolve, reject) => {

        const db = Utils.getFirestoreDB();

        const queryRef = query(collection(db, "Report"), where("id", "==", id));
        const querySnapshot: any = await getDocs(queryRef as any);

        if(!querySnapshot.empty) {
            let count = 0;
            querySnapshot.forEach((doc: any) => {
                function removeData(value: any) {
                    deleteDoc(value.ref);
                }

                removeData(doc);

                if(count === querySnapshot.size-1) {
                    return resolve(null);
                }
                count++;
            });
        } else {
            return resolve(null);
        }
    })
}

const RemovePosts = (id: string) => {
    return new Promise(async (resolve, reject) => {

        const db = Utils.getFirestoreDB();

        const queryRef = query(collection(db, "Posts"), where("uid", "==", id));
        const querySnapshot: any = await getDocs(queryRef as any);

        if(!querySnapshot.empty) {
            let count = 0;
            querySnapshot.forEach((doc: any) => {
                function removeData(value: any) {
                    deleteDoc(value.ref);
                }

                removeData(doc);

                if(count === querySnapshot.size-1) {
                    return resolve(null);
                }
                count++;
            });
        } else {
            return resolve(null);
        }
    })
}

const RemoveBookmarks = (id: string) => {
    return new Promise(async (resolve, reject) => {

        const db = Utils.getFirestoreDB();

        const queryRef = query(collection(db, "BookMarks"), where("uid", "==", id));
        const querySnapshot: any = await getDocs(queryRef as any);

        if(!querySnapshot.empty) {
            let count = 0;
            querySnapshot.forEach((doc: any) => {
                function removeData(value: any) {
                    deleteDoc(value.ref);
                }

                removeData(doc);

                if(count === querySnapshot.size-1) {
                    return resolve(null);
                }
                count++;
            });
        } else {
            return resolve(null);
        }
    })
}

const RemoveComments = (id: string) => {
    return new Promise(async (resolve, reject) => {
        const db = Utils.getFirestoreDB();

        const queryRef = query(collection(db, "Comments"), where("uid", "==", id));
        const querySnapshot: any = await getDocs(queryRef as any);

        if(!querySnapshot.empty) {
            let count = 0;
            querySnapshot.forEach((doc: any) => {
                function removeData(value: any) {
                    deleteDoc(value.ref);
                }

                removeData(doc);

                if(count === querySnapshot.size-1) {
                    return resolve(null);
                }
                count++;
            });
        } else {
            return resolve(null);
        }
    })
}

const RemoveFollowUsers = (id: string) => {
    return new Promise(async (resolve, reject) => {
        const db = Utils.getFirestoreDB();

        const queryRef = query(collection(db, "FollowFollowing"), where("uid", "==", id));
        const querySnapshot: any = await getDocs(queryRef as any);

        if(!querySnapshot.empty) {
            let count = 0;
            querySnapshot.forEach((doc: any) => {
                function removeData(value: any) {
                    deleteDoc(value.ref);
                }

                removeData(doc);

                if(count === querySnapshot.size-1) {
                    return resolve(null);
                }
                count++;
            });
        } else {
            return resolve(null);
        }
    })
}

const RemoveFollowingUsers = (id: string) => {
    return new Promise(async (resolve, reject) => {
        const db = Utils.getFirestoreDB();

        const queryRef = query(collection(db, "FollowFollowing"), where("other_user_id", "==", id));
        const querySnapshot: any = await getDocs(queryRef as any);

        if(!querySnapshot.empty) {
            let count = 0;
            querySnapshot.forEach((doc: any) => {
                function removeData(value: any) {
                    deleteDoc(value.ref);
                }

                removeData(doc);

                if(count === querySnapshot.size-1) {
                    return resolve(null);
                }
                count++;
            });
        } else {
            return resolve(null);
        }
    })
}

export const DeleteAccount = (id: string, cb = (value: string) => {}): any => {
    return async (dispatch: any, getState: any) => {
        const user_data_obj: any = await AORStorage.getAORLoginData();
        const user_data = user_data_obj && user_data_obj[STATUS] === SUCCESS ? user_data_obj[RESPONSE] : {};
        const user_id = user_data && user_data.id ? user_data.id : ""
        let { phoneNumber = "" } = user_data || {};
        // phoneNumber = phoneNumber && phoneNumber.length ? phoneNumber.replace(/ /gi, "") : "";
        // phoneNumber = phoneNumber && phoneNumber.length ? phoneNumber.replace("+", "") : "";

        if (user_id) {
            try {

                // console.log("Delete user account ===> init", user_id);
                await Promise.all([
                    RemoveComments(id),
                    RemoveBookmarks(id),
                    RemovePosts(id),
                    RemoveUsers(id),
                    RemoveFollowUsers(id),
                    RemoveFollowingUsers(id)
                ]);
                // console.log("Delete user account ===> done");
                cb(SUCCESS);
            }
            catch (error) {
                Utils.log("Delete user account ===> error ", error);
                cb(ERROR);
            }
        } else return cb(ERROR);
    }
}

export const DeleteReport = (id: string, cb = (value: string) => {}): any => {
    return async (dispatch: any, getState: any) => {
        if (id) {
            try {
                await Promise.all([
                    RemoveReport(id)
                ]);
                cb(SUCCESS);
            }
            catch (error) {
                Utils.log("Delete user account ===> error ", error);
                cb(ERROR);
            }
        } else return cb(ERROR);
    }
}
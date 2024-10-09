import React, { memo, useCallback, useState, useMemo, useEffect } from 'react';
import swal from 'sweetalert';
import { user_delete_btn_state_to_props, updateUsersUIConstraintsData, DeleteAccount } from '../../redux/users/Action';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { USERS_DELETE_LOADING, USERS_LOADING, SUCCESS, USER_ACTIVE, USER_INACTIVE, ERROR } from '../../redux/Types';
import { delete_user } from '../../apis/APIs';
import AORStorage from '../../apis/AORStorage';
import Utils from '../util/Utils';

const DeleteBtn = ({ user_id = "" }: any) => {
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);

    const { users_list_loading } = useSelector(user_delete_btn_state_to_props, shallowEqual);

    useEffect(() => {
        if(!users_list_loading) setLoading(users_list_loading);
    }, [users_list_loading]);

    const deleteRecord = useCallback(() => {
            if(loading) return;

            if(users_list_loading) swal("Fetching latest users list, please wait...");
            
            swal({
                title: "Are you sure?",
                text: `You wants to delete this user!`,
                icon: "warning",
                // buttons: true,
                dangerMode: true,
            })
            .then(async (willDelete) => {
                if (willDelete) {
                    setLoading(true);

                    dispatch(DeleteAccount(user_id, (status) => {
                        setLoading(false);
                        switch(status) {
                            case SUCCESS:
                                dispatch(updateUsersUIConstraintsData({
                                    [USERS_LOADING]: true
                                }));
                                swal("User account has been deleted successfully.", {
                                    icon: "success",
                                });
                                break;
                            case ERROR:
                                swal("Something went wrong, Please try again.", {
                                    icon: "error",
                                });
                                break;
                        }
                    }));
                } else setLoading(false);
            });
    }, [loading, users_list_loading, user_id]);

    const delete_btn_icon = useMemo(() => {
        if(!loading) return <i className={"fas fa-trash"}></i>

        return <i className="fas fa-spinner fa-pulse fa-1x fa-fw"></i>;
    }, [loading])
    
    return <>
            <button type="button" onClick={deleteRecord} className="btn btn-danger btn-circle btn-sm">
                {delete_btn_icon}
            </button>
        </>;
}

export default memo(DeleteBtn);
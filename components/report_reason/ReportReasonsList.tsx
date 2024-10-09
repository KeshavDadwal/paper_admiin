import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { report_reasons_list, users_list } from '../../apis/APIs';
import { SUCCESS, USERS_LOADING } from '../../redux/Types';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { user_list_state_to_props, updateUsersUIConstraintsData } from '../../redux/users/Action';
import swal from 'sweetalert';
import AORStorage from '../../apis/AORStorage';
import Utils from '../util/Utils';
import moment from 'moment-timezone';
import { ReportDeleteBtn, ReportReasonViewBtn } from '.';
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { UserDeleteBtn } from '../users';

createTheme('solarized', {
    background: {
      default: 'transparent',
    }
  });

const ReportReasonList = () => {
    const columns: any = [
        {
          name: 'Name',
          selector: 'first_name',
          sortable: false,
          format: (row: any) => `${row.user && row.user.name ? row.user.name : "NA"}`
        },
        {
          name: 'Reported By',
          selector: 'last_name',
          sortable: false,
          format: (row: any) => `${row.reported_by && row.reported_by.name ? row.reported_by.name : "NA"}`
        },
        {
            name: 'Created At',
            selector: 'created_at',
            sortable: false,
            format: (row: any) => `${row.created_at ? moment(new Date(row.created_at)).format("DD-MM-YYYY HH:mm:ss a") : "NA"}`
        },
        {
          name: "Action",
          selector: "action",
          cell: (row: any) => {
            return(
                <>
                    <ReportReasonViewBtn description={row.message} />
                    { row.reported_by && row.reported_by.id ? <ReportDeleteBtn report_id={row.id} /> : null }
                </>
            )
          }
        }
      ];

    const dispatch = useDispatch();

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ totalRows, setTotalRows ] = useState(0);
    const [ perPage, setPerPage ] = useState(10);
    const [ selectedPage, setSelectedPage ] = useState(1);
    const [ direction, setDirection ] = useState("");
    const [ search, setSearch ] = useState("");

    const { users_list_loading } = useSelector(user_list_state_to_props, shallowEqual);

    useEffect(() => {
        init(true);
    }, [selectedPage, perPage, direction, search]);

    useEffect(() => {
        if(users_list_loading) {
            init(!users_list_loading)
        }
    }, [users_list_loading]);

    const init = useCallback((is_loading: boolean) => {
        if(is_loading) setLoading(is_loading);

        let body = {
            page: selectedPage,
            limit: perPage
        };

        if(direction){
            body = Object.assign(body, { email_sort_by: direction })
        }

        if(search){
            body = Object.assign(body, { search })
        }
        
        get_users_res(body);
    }, [selectedPage, perPage, direction, search]);

    const get_users_res = useCallback(async (body: any) => {
        
        const value = await AORStorage.getAORLoginData();
        const userData = value && value.response && value.response.token ? value.response : undefined;

        const db = Utils.getFirestoreDB();

        const queryRef = query(collection(db, "Report"));
        const querySnapshot: any = await getDocs(queryRef as any);
        console.log("firebase store response", querySnapshot);

        let { page = 1, limit = 10 } = body || {};
        let page_start = page ? ((page - 1) * limit)+1 : 1;
        let page_end = page_start + (limit-1);

        let users: any = [];
        let records: any = [];
        let count = 1;
        querySnapshot.forEach(async (doc: any) => {
            let data = doc.data();
            if(data.reported_uid) users.push(data)
        });

        users?.forEach(async (data: any) => {
            if (count >= page_start && count <= page_end) {

                // User
                let user_data = undefined;
                if(data.uid) {
                    const userQueryRef = query(collection(db, "Users"), where("id", "==", data.uid));
                    const userQuerySnapshot: any = await getDocs(userQueryRef as any);
                    userQuerySnapshot.forEach(async (user: any) => {
                        user_data = user.data();
                    });
                }

                // Reprted By User
                let reported_by_user_data = undefined;
                if(data.reported_uid) {
                    const reportedByUserQueryRef = query(collection(db, "Users"), where("id", "==", data.reported_uid));
                    const reportedByUserQuerySnapshot: any = await getDocs(reportedByUserQueryRef as any);
                    reportedByUserQuerySnapshot.forEach(async (user: any) => {
                        reported_by_user_data = user.data();
                    });
                }

                data.user = user_data;
                data.reported_by = reported_by_user_data;

                records.push(data);
            }

            if(count === page_end || (count === users.length && page_end >= users.length)) {
                setData(Array.from(records))
                setTotalRows(users.length);
            }

            count+=1;
        });

        setLoading(false);
        dispatch(updateUsersUIConstraintsData({
            [USERS_LOADING]: false
        }))

    }, []);

    const handlePageChange = useCallback(async (page: number) => {
        setSelectedPage(page);
    }, [])

    const handlePerRowsChange = useCallback(async (perPage: number, page: number) => {
        setSelectedPage(page);
        setPerPage(perPage);
    }, []);

    const handleSortChange: any = useCallback(async (column: number, direction: string) => {
        setDirection(direction);
      }, []);

    const onChange = useCallback((e: any) => {
        const { name, value } = e.target || {};

        setSearch(value);
        setSelectedPage(1);
    }, []);

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="d-flex w-100 p-0">
                <h3 className="card-title p-3">Report Reasons</h3>
                <ul className="nav nav-pills ml-auto p-2">
                    {/* <input type="text" name="search" value={search} onChange={onChange} placeholder="Search..." /> */}
                </ul>
            </div>
        );
      }, [search]);

    return <>
        <DataTable
            onSort={handleSortChange}
            noHeader
            sortServer
            theme="solarized"
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
        />
    </>;
}

    export default memo(ReportReasonList);

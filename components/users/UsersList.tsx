import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { users_list } from '../../apis/APIs';
import { SUCCESS, USERS_LOADING } from '../../redux/Types';
import { UserViewBtn, UserDeleteBtn } from '.';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { user_list_state_to_props, updateUsersUIConstraintsData } from '../../redux/users/Action';
import swal from 'sweetalert';
import AORStorage from '../../apis/AORStorage';
import Utils from '../util/Utils';
import moment from 'moment-timezone';
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import * as XLSX from "xlsx";
import { CSVDownload, CSVLink } from "react-csv";

createTheme('solarized', {
    background: {
        default: 'transparent',
    }
});

const UsersList = () => {
    const columns: any = [
        {
            name: 'Name',
            selector: 'name',
            sortable: false,
            format: (row: any) => `${row.name ? row.name : "NA"}`
        },
        {
            name: 'Handle Name',
            selector: 'name',
            sortable: false,
            format: (row: any) => `${row.handleName ? row.handleName : "NA"}`
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            format: (row: any) => `${row.email ? row.email : "NA"}`
        },
        {
            name: 'Phone Number',
            selector: 'phoneNumber',
            sortable: true,
            format: (row: any) => `${row.phoneNumber ? row.phoneNumber : "NA"}`
        },
        {
            name: 'Created At',
            selector: 'created_at',
            sortable: true,
            format: (row: any) => `${row.created_at ? moment(new Date(row.created_at)).format("DD-MM-YYYY HH:mm:ss a") : "NA"}`
        },
        {
            name: "Action",
            selector: "action",
            cell: (row: any) => {
                return (
                    <>
                        {/* <UserViewBtn user_id={row.id} /> */}
                        <UserDeleteBtn user_id={row.id} deleted_status={row.deleted_status} />
                    </>
                )
            }
        }
    ];

    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [selectedPage, setSelectedPage] = useState(1);
    const [direction, setDirection] = useState<any>(undefined);
    const [column, setColumn] = useState<any>(undefined);
    const [search, setSearch] = useState("");
    const [dbUsers, setDBUsers] = useState<any>([]);
    const [csv, setCSV] = useState([]);

    const { users_list_loading } = useSelector(user_list_state_to_props, shallowEqual);

    useEffect(() => {
        init(true);
    }, [selectedPage, perPage, direction, search]);

    useEffect(() => {
        downloadExcel()
    }, [dbUsers]);

    useEffect(() => {
        if (users_list_loading) {
            init(!users_list_loading)
        }
    }, [users_list_loading]);

    const init = useCallback((is_loading: boolean) => {
        if (is_loading) setLoading(is_loading);

        let body = {
            page: selectedPage,
            limit: perPage
        };

        if (direction) {
            body = Object.assign(body, { direction, column })
        }

        if (search) {
            body = Object.assign(body, { search })
        }

        get_users_res(body);
    }, [selectedPage, perPage, direction, column, search]);

    const downloadExcel = () => {
        const storedUsers = Array.from(dbUsers).map((ele: any) => {
            const { handleName, password, fcm_token, type, ...rest } = ele || {}
            const obj = { ...rest }
            obj.dob = obj?.dob?.seconds ? moment(new Date(obj?.dob?.seconds)).format('DD-MM-YYYY h:m:s A') : 'NA'
            obj.created_at = obj?.created_at ? moment(new Date(obj?.created_at)).format('DD-MM-YYYY h:m:s A') : 'NA'
            obj.updated_at = obj?.updated_at ? moment(new Date(obj?.updated_at)).format('DD-MM-YYYY h:m:s A') : 'NA'
            
            return obj
        }).filter(ele => ele);
        // const csvHeaderData = storedUsers?.length ? Object.keys(storedUsers[0]).sort() : [];
        const csvHeaderData = ["id", "email", "name", 'phoneNumber', "dob",	"image", "created_at", "updated_at"];
        let csvData: any = csvHeaderData?.length ? storedUsers.map(ele => csvHeaderData.map(key => (ele[key] || ""))) : []

        csvData = [csvHeaderData, ...csvData];
        console.log("csv data ===> ", csvData);

        setCSV(csvData)
        // const worksheet = XLSX.utils.json_to_sheet(storedUsers);
        // const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        // XLSX.writeFile(workbook, `Users${(new Date()).getTime()}.xlsx`);
    };

    const formatSortKey = (key: string) => {
        return key?.toLowerCase()
    }

    const formatSortDateKey = (key: string) => {
        console.log("column created at sort ===> ", column, key, (new Date(key))?.getTime() || 0)

        return (new Date(key))?.getTime() || 0
    }

    const get_users_res = useCallback(async (body: any) => {

        const value = await AORStorage.getAORLoginData();
        const userData = value && value.response && value.response.token ? value.response : undefined;

        const db = Utils.getFirestoreDB();

        const queryRef = query(collection(db, "Users"));
        const querySnapshot: any = await getDocs(queryRef as any);
        // console.log("firebase store response", querySnapshot);

        let { page = 1, limit = 10 } = body || {};
        let page_start = page ? ((page - 1) * limit)+1 : 1;
        let page_end = page_start + (limit-1);

        let users: any = [];
        let dbUsers: any = [];
        let count = 1;
        querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            if(data?.email !== "admin@gmail.com") dbUsers.push(data);
        });

        const { direction, column } = body || {}

        switch(column) {
            case 'email':
                dbUsers.sort((a: any, b: any) => {
                    switch(direction) {
                        case 'asc':
                            if ( formatSortKey(a.email) < formatSortKey(b.email) ){
                                return -1;
                              }
                            if ( formatSortKey(a.email) > formatSortKey(b.email) ){
                                return 1;
                            }
                            return 0;
                        default:
                            if ( formatSortKey(b.email) < formatSortKey(a.email) ){
                                return -1;
                              }
                            if ( formatSortKey(b.email) > formatSortKey(a.email) ){
                                return 1;
                            }
                            return 0;
                    }
                })
                break;
            case 'phoneNumber':
                dbUsers.sort((a: any, b: any) => {
                    switch(direction) {
                        case 'asc':
                            if ( formatSortKey(a.phoneNumber) < formatSortKey(b.phoneNumber) ){
                                return -1;
                              }
                            if ( formatSortKey(a.phoneNumber) > formatSortKey(b.phoneNumber) ){
                                return 1;
                            }
                            return 0;
                        default:
                            if ( formatSortKey(b.phoneNumber) < formatSortKey(a.phoneNumber) ){
                                return -1;
                              }
                            if ( formatSortKey(b.phoneNumber) > formatSortKey(a.phoneNumber) ){
                                return 1;
                            }
                            return 0;
                    }
                })
                break;
            case 'created_at':
                // users.sort((a: any, b: any) => {
                //     switch(direction) {
                //         case 'asc':
                //             if ( formatSortDateKey(a.created_at) < formatSortDateKey(b.created_at) ){
                //                 return -1;
                //               }
                //             if ( formatSortDateKey(a.created_at) > formatSortDateKey(b.created_at) ){
                //                 return 1;
                //             }
                //             return 0;
                //         default:
                //             if ( formatSortDateKey(a.created_at) < formatSortDateKey(b.created_at) ){
                //                 return -1;
                //               }
                //             if ( formatSortDateKey(a.created_at) > formatSortDateKey(b.created_at) ){
                //                 return 1;
                //             }
                //             return 0;
                //     }
                // })

                dbUsers.sort((a: any, b: any) => {
                    switch(direction) {
                        case 'asc':
                            return formatSortDateKey(a.created_at) - formatSortDateKey(b.created_at);
                        default:
                            return formatSortDateKey(b.created_at) - formatSortDateKey(a.created_at);
                    }
                })
                break;
        }

        dbUsers.forEach((doc: any) => {
            if (count >= page_start && count <= page_end) users.push(doc);
            count++;
        });

        setLoading(false);
        dispatch(updateUsersUIConstraintsData({
            [USERS_LOADING]: false
        }))

        setData(users)
        setDBUsers(dbUsers)
        setTotalRows(dbUsers.length);
    }, []);

    const handlePageChange = useCallback(async (page: number) => {
        // console.log("direction ===> data page", page);
        setSelectedPage(page);
    }, [])

    const handlePerRowsChange = useCallback(async (perPage: number, page: number) => {
        setSelectedPage(page);
        setPerPage(perPage);
    }, []);

    const handleSortChange: any = useCallback(async (column: any, direction: string) => {
        setDirection(direction);
        setColumn(column?.selector);
    }, []);

    const onChange = useCallback((e: any) => {
        const { name, value } = e.target || {};

        setSearch(value);
        setSelectedPage(1);
    }, []);

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="d-flex w-100 p-0">
                <h3 className="card-title p-3">Users</h3>
                <ul className="nav nav-pills ml-auto p-2">
                {/* <button onClick={downloadExcel}>
                    Download As Excel
                </button> */}
                {
                    csv?.length ?
                        <CSVLink data={csv}>Download CSV</CSVLink>
                        :
                        <p>Loading...</p>
                }
                {/* <CSVDownload data={csv} uFEFF={ false } /> */}
                    {/* <input type="text" name="search" value={search} onChange={onChange} placeholder="Search..." /> */}
                </ul>
            </div>
        );
    }, [search, csv]);

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
            paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 200]}
        />
    </>;
}

export default memo(UsersList);

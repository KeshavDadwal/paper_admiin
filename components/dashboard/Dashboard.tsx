// import { authRoute } from "../../components/base_components";
// import { checkReflectionEdit, resetOnBoardingState, set_onboarding_data, updateOnBoardingFormData, updateOnBoardingUIConstraints, welcome_question_form_state_to_props, welcome_reflection_form_state_to_props, welcome_wrapper_form_state_to_props } from "../../redux/onboarding/Action";
// import { updateSystemData } from "../../redux/system/Action";
// import { DASHBOARD_DATE, ONBOARDING_FORM_ADD_TODAY_REFLECTION, ONBOARDING_FORM_REFLECTION_DATE, ONBOARDING_HIDE_CATEGORY_BACK_BUTTON, ONBOARDING_HIDE_QUESTIONS_BACK_BUTTON, ONBOARDING_TAB_TYPE, ONBOARDING_TAB_TYPE_QUESTIONS, ONBOARDING_TAB_TYPE_SELECT_CATEGORY, SYSTEM_DATA_IS_HIDE_HEADER, SYSTEM_DATA_IS_HIDE_SIDEBAR, SYSTEM_DATA_IS_SETUP_PROFILE, SYSTEM_DATA_IS_SETUP_REMINDER, SYSTEM_DATA_IS_SKIP_REMINDER } from "../../redux/Types";
// import { useRouter } from "next/router";
// import { memo, useCallback, useEffect, useState } from "react";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import moment from 'moment-timezone';
// import Head from 'next/head'
// import { qoutes } from "../../redux/onboarding/qoutes";
// import { get_user_reflections, updateDashboardData } from "../../redux/dashboard/Action";
// import { UsersList } from "../users";
// import AORStorage from "../../apis/AORStorage";
// import { Utils } from "../util";
// import { get_dashboard_stats, matches_list, users_list } from '../../apis/APIs';
// import { SUCCESS } from "../../redux/Types";

// const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     arrows: true,
//     variableWidth: true,

//     responsive: [{
//         breakpoint: 992,
//         settings: {
//             slidesToShow: 2,
//             slidesToScroll: 1
//         }
//     },
//     {
//         breakpoint: 600,
//         settings: {
//             arrows: false,
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             dots: false,
//         }
//     }],

//     className: "st_slider"

// };
// function Stats() {

//     const dispatch = useDispatch();
//     const router = useRouter();
//     const [qoute, setQoute] = useState("");
//     const [isProfileSetup, setIsProfileSetup] = useState(false);
//     const [_selected_relfection_id, setSelectedRelfectionId] = useState(undefined);
//     const { type } = useSelector(welcome_wrapper_form_state_to_props, shallowEqual);
//     const { questions } = useSelector(welcome_question_form_state_to_props, shallowEqual);
//     const { reflections, selected_reflection, selected_reflection_id, selected_reflection_name, created_at, is_add_today_reflection } = useSelector(welcome_reflection_form_state_to_props, shallowEqual);
//     const [loading, setLoading] = useState(false);
//     const [blogs, setBlogs] = useState(0);

//     const [userLoading, setUserLoading] = useState(false);
//     const [users, setUsers] = useState<any>(undefined);
//     const [matchesLoading, setMatchesLoading] = useState(false);
//     const [matches, setMatches] = useState<any>(undefined);

//     useEffect(() => {
//         getStats();
//         getUsers();
//         getMatches();
//     }, []);

//     const openUrl = useCallback((path: string) => {
//         if(!path) return;

//         router.push(path);
//     }, []);

//     const getStats = useCallback(async () => {
//         try {
//             const { bid } = router.query || {};

//             if (loading) return;

//             setLoading(true);
//             const value: any = await AORStorage.getAORLoginData();
//             const userData = value && value.response && value.response.token ? value.response : undefined;

//             const _token = userData && userData.token ? userData.token : undefined;

//             const headers = {
//                 "token": Utils.parseToken(_token)
//             }

//             const res = await get_dashboard_stats({}, headers);

//             setLoading(false);
//             if (res.message) {
//                 switch (res.message) {
//                     case SUCCESS:
//                         const { data } = res || {};
//                         const { users, blogs } = data || {};

//                         console.log("data ===> ", data);

//                         break;
//                     default:
//                         let message = "Please try again.";
//                         if (res.error_stack) {
//                             message = res.error_stack.message ? res.error_stack.message : message;
//                             message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
//                             message = res.error_stack.error_message ? res.error_stack.error_message : message;
//                         }
//                 }
//             }
//         } catch (error: any) { 
//             const message = error && error.message ? error.message : "Please try again";
//             setLoading(false);
//         }
//     }, [loading]);


//     const getUsers = useCallback(async () => {
//         try {
//             const { bid } = router.query || {};

//             if (loading) return;

//             setUserLoading(true);
//             const value: any = await AORStorage.getAORLoginData();
//             const userData = value && value.response && value.response.token ? value.response : undefined;

//             const _token = userData && userData.token ? userData.token : undefined;

//             const headers = {
//                 "token": Utils.parseToken(_token)
//             }

//             const body = {
//                 page: 1,
//                 limit: 8
//             };

//             const res = await users_list(body, headers);
//             setUserLoading(false);
//             if (res.message) {
//                 switch (res.message) {
//                     case SUCCESS:
//                         let { data, total } = res.data || {};

//                         setUsers(data);

//                         break;
//                     default:
//                         let message = "Please try again.";
//                         if (res.error_stack) {
//                             message = res.error_stack.message ? res.error_stack.message : message;
//                             message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
//                             message = res.error_stack.error_message ? res.error_stack.error_message : message;
//                         }
//                 }
//             }
//         } catch (error: any) {
//             const message = error && error.message ? error.message : "Please try again";
//             setUserLoading(false);
//         }
//     }, [loading]);

//     const getMatches = useCallback(async () => {
//         try {
//             const { bid } = router.query || {};

//             if (loading) return;

//             setMatchesLoading(true);
//             const value: any = await AORStorage.getAORLoginData();
//             const userData = value && value.response && value.response.token ? value.response : undefined;

//             const _token = userData && userData.token ? userData.token : undefined;

//             const headers = {
//                 "token": Utils.parseToken(_token)
//             }

//             const body = {
//                 page: 1,
//                 limit: 10
//             }

//             const res = await matches_list(body, headers);

//             setMatchesLoading(false);
//             if (res.message) {
//                 switch (res.message) {
//                     case SUCCESS:
//                         let { data, total } = res.data || {};

//                         console.log("matches ===> matches", data)
//                         setMatches(data);

//                         break;
//                     default:
//                         let message = "Please try again.";
//                         if (res.error_stack) {
//                             message = res.error_stack.message ? res.error_stack.message : message;
//                             message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) => ele.message).toString()}` : message;
//                             message = res.error_stack.error_message ? res.error_stack.error_message : message;
//                         }
//                 }
//             }
//         } catch (error: any) { 
//             const message = error && error.message ? error.message : "Please try again";
//             setMatchesLoading(false);
//         }
//     }, [loading]);

//     // return (
//     //     <div>
//     //         <Head>
//     //             <title>Paper | Stats</title>
//     //         </Head>
//     //         <div className="content-wrapper">
//     //             <section className="content-header">
//     //                 <div className="container-fluid">
//     //                     <div className="row mb-2">
//     //                         <div className="col-sm-6">
//     //                         </div>
//     //                         <div className="col-sm-6">
//     //                             <ol className="breadcrumb float-sm-right">
//     //                                 <li className="breadcrumb-item active">Dashboard</li>
//     //                             </ol>
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //             </section>

//     //             <section className="content">

//     //                 <div className="container-fluid">
//     //                     <div className="row">
//     //                         <div className="col-lg-3 col-6">
//     //                             <div className="small-box bg-info">
//     //                                 <div className="inner">
//     //                                     <h3>{users}</h3>

//     //                                     <p>Blogs</p>
//     //                                 </div>
//     //                                 <div className="icon">
//     //                                     <i className="ion ion-bag"></i>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                         <div className="col-lg-3 col-6">
//     //                             <div className="small-box bg-warning">
//     //                                 <div className="inner">
//     //                                     <h3>{blogs}</h3>

//     //                                     <p>User Registrations</p>
//     //                                 </div>
//     //                                 <div className="icon">
//     //                                     <i className="ion ion-person-add"></i>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                     </div>
//     //                 </div>

//     //             </section>
//     //         </div>
//     //     </div>);

//     return (
//         <div className="content-wrapper">
//             <div className="content-header">
//                 <div className="container-fluid">
//                     <div className="row mb-2">
//                         <div className="col-sm-6">
//                             <h1 className="m-0">Dashboard</h1>
//                         </div>
//                         <div className="col-sm-6">
//                             <ol className="breadcrumb float-sm-right">
//                                 <li className="breadcrumb-item active">Dashboard</li>
//                             </ol>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <section className="content">
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-12 col-sm-6 col-md-3">
//                             <div className="info-box">
//                                 <span className="info-box-icon bg-info elevation-1"><i className="fas fa-users"></i></span>

//                                 <div className="info-box-content">
//                                     <span className="info-box-text">Users</span>
//                                     <span className="info-box-number">
//                                         0
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-12 col-sm-6 col-md-3">
//                             <div className="info-box mb-3">
//                                 <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users"></i></span>

//                                 <div className="info-box-content">
//                                     <span className="info-box-text">Blocked Users</span>
//                                     <span className="info-box-number">0</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-12 col-sm-6 col-md-3">
//                             <div className="info-box mb-3">
//                                 <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-thumbs-up"></i></span>

//                                 <div className="info-box-content">
//                                     <span className="info-box-text">Products</span>
//                                     <span className="info-box-number">0</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="clearfix hidden-md-up"></div>

//                         <div className="col-12 col-sm-6 col-md-3">
//                             <div className="info-box mb-3">
//                                 <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart"></i></span>

//                                 <div className="info-box-content">
//                                     <span className="info-box-text">Sales</span>
//                                     <span className="info-box-number">0</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-md-8">
//                             <div className="row">
//                                 <div className="col-md-12">
//                                     <div className="card">
//                                         <div className="card-header">
//                                             <h3 className="card-title">Latest Members</h3>

//                                             <div className="card-tools">
//                                                 {/* <button type="button" className="btn btn-tool" data-card-widget="collapse">
//                                                     <i className="fas fa-minus"></i>
//                                                 </button> */}
//                                             </div>
//                                         </div>
//                                         <div className="card-body p-0">
//                                             <ul className="users-list clearfix">
//                                                 {
//                                                     users && users.length ?
//                                                         users.map((ele: any) => (<li>
//                                                             <img src={ele.image ? JSON.parse(ele.image).url : "/dist/img/default-150x150.png"} width="114" height="114" alt="User Image" />
//                                                             <a className="users-list-name" href="#">{ele.first_name} {ele.last_name}</a>
//                                                             <span className="users-list-date">{moment(ele.created_at).fromNow()}</span>
//                                                         </li>)) : null
//                                                 }
//                                             </ul>
//                                         </div>
//                                         <div className="card-footer text-center">
//                                             <a href="javascript:" onClick={openUrl.bind(Stats, "/users")}>View All Users</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="col-md-4">
//                             <div className="card">
//                                 <div className="card-header">
//                                     <h3 className="card-title">Recently Matches</h3>

//                                     <div className="card-tools"></div>
//                                 </div>
//                                 <div className="card-body p-0">
//                                     <ul className="products-list product-list-in-card pl-2 pr-2">
//                                         {
//                                             matches && matches.length ?
//                                                 matches.map((ele: any) => <li className="item">
//                                                     <div className="product-info">
//                                                         <a href="javascript:void(0)" className="product-title">{ele.first_name1} {ele.last_name1}
//                                                             <span className="badge badge-warning float-right">{ele.match_status}</span></a>
//                                                         <span className="product-description">
//                                                             Requested To: {ele.first_name2} {ele.last_name2}
//                                                         </span>
//                                                     </div>
//                                                 </li>) : null
//                                         }
//                                     </ul>
//                                 </div>
//                                 <div className="card-footer text-center">
//                                     <a href="javascript:void(0)" onClick={openUrl.bind(Stats, "/matches")} className="uppercase">View All Matches</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default memo(Stats);


















import { authRoute } from "../../components/base_components";
import { UsersList } from "../../components/users";
import { Head } from "next/document";
import { useRouter } from "next/router";
import { memo, useCallback } from "react";

function Users() {
    const router = useRouter();

    const openUrl = useCallback((path: string) => {
        if(!path) return;

        router.push(path);
    }, []);
    
    return (
        <div>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a className={"blossom-admin-cursor"} onClick={openUrl.bind(Users, "/")}>Dashboard</a></li>
                                    <li className="breadcrumb-item active">Users</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">

                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <UsersList />
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}

export default memo(authRoute(Users));
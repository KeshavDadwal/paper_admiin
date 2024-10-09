import { get_user_detail } from "../../../apis/APIs";
import AORStorage from "../../../apis/AORStorage";
import { Utils } from "../../../components/util";
import { SUCCESS } from "../../../redux/Types";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import moment from 'moment-timezone';
import { authRoute } from "../../../components/base_components";

function User() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("initialState");
    const [data, setData] = useState<any>(undefined);

    const travel = data && data.travel ? data.travel : null;
    const sports = data && data.sports ? data.sports : null;
    const share_economy = data && data.share_economy ? data.share_economy : null;
    const business = data && data.business ? data.business : null;

    useEffect(() => {
        const { uid } = router.query || {};

        if (uid) getRecord(uid as string);
    }, []);

    const getRecord = useCallback(async (uid: string) => {
        if (loading) return;

        setLoading(true);
        setErrorMessage("");
        const value = await AORStorage.getAORLoginData();
        const userData = value && value.response && value.response.token ? value.response : undefined;

        const _token = userData && userData.token ? userData.token : undefined;

        const headers = {
            "token": Utils.parseToken(_token)
        }
        const res = await get_user_detail(uid, headers);

        if (res.message) {
            setLoading(false);

            switch (res.message) {
                case SUCCESS:
                    const { data } = res;
                    setData(data);
                    break;
                default:
                    let message = "Please try again.";
                    if (res.error_stack) {
                        message = res.error_stack.message ? res.error_stack.message : message;
                        message = res.error_stack && res.error_stack.length ? `Validation Error: ${res.error_stack.map((ele: any) =>  ele.message).toString()}` : message;
                        message = res.error_stack.error_message ? res.error_stack.error_message : message;
                    }
                    setErrorMessage(message);
            }
        }
    }, [loading]);

    const openUrl = useCallback((path: string) => {
        if (!path) return;

        router.push(path);
    }, []);

    const getLocationAddress = (location: any) => {
        if(!location || (location && !location.lat)) return "NA";

        const { address="", city="", state="", country="", zip_code="" } = location || {};

        return `${address} ${city} ${state} ${country} ${zip_code}`;
    }

    const getImage = (obj: any) => {
        if(!obj || (obj && !obj.url) || (obj && !obj.url.includes("http"))) return "/images/default.png";

        return obj.url;
    }

    console.log("data ===> ", data);
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>User Detail</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a className={"blossom-admin-cursor"} onClick={openUrl.bind(User, "/")}>Dashboard</a></li>
                                <li className="breadcrumb-item"><a className={"blossom-admin-cursor"} onClick={openUrl.bind(User, "/users")}>Users</a></li>
                                <li className="breadcrumb-item active">Detail</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ?
                    <p className={"text-center"}>Loading...</p> : null
            }
            {
                data && data.uid ?
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3">

                                    <div className="card card-primary card-outline">
                                        <div className="card-body box-profile">
                                            <div className="text-center">
                                                <img className="profile-user-img img-fluid img-circle"
                                                    src={getImage(data.image)}
                                                    alt="User profile picture" />
                                            </div>

                                            <h3 className="profile-username text-center">{`${data.first_name || ""} ${data.last_name || ""}`}</h3>
                                        </div>
                                    </div>

                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">About Me</h3>
                                        </div>
                                        <div className="card-body">
                                            <strong><i className="fas fa-book mr-1"></i> Education</strong>

                                            {
                                                data.education && data.education.length ? 
                                                data.education.map((ele: any) =>  (
                                                    <p className="text-muted">
                                                        <span>Institute: {ele.institution}</span><br />
                                                        <span>Graduation Year: {ele.graduation_year}</span><br />
                                                        {ele.is_primary ? <span><strong>Default</strong></span> : null}
                                                    </p>
                                                ))
                                                : <p className="text-muted">
                                                    NA
                                                </p>
                                            }

                                            <hr />

                                            <strong><i className="fas fa-file-alt mr-1"></i> Work</strong>
                                            {
                                                data.work && data.work.length ? 
                                                data.work.map((ele: any) =>  (
                                                    <p className="text-muted">
                                                        <span>Title: {ele.title}</span><br />
                                                        <span>Company: {ele.company}</span><br />
                                                        {ele.is_primary ? <span><strong>Default</strong></span> : null}
                                                    </p>
                                                ))
                                                : <p className="text-muted">
                                                    NA
                                                </p>
                                            }

                                            <hr />

                                            <strong><i className="fas fa-map-marker-alt mr-1"></i> Location</strong>

                                            <p className="text-muted">{getLocationAddress(data.my_address)}</p>

                                            <hr />

                                            <strong><i className="fas fa-map-marker-alt mr-1"></i> Born in</strong>

                                            <p className="text-muted">{getLocationAddress(data.born_in_address)}</p>

                                            <hr />

                                            <strong><i className="fas fa-map-marker-alt mr-1"></i> Live in</strong>

                                            <p className="text-muted">{getLocationAddress(data.live_in_address)}</p>

                                            <hr />

                                            <strong><i className="far fa-file-alt mr-1"></i> Bio</strong>

                                            <p className="text-muted">{data.about_me || "NA"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">Extra Info</h3>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-group list-group-unbordered mb-3">
                                                <li className="list-group-item">
                                                    <b>ID</b> <a className="float-right">{data.email || data.phone_number || "NA"}</a>
                                                </li>
                                                <li className="list-group-item">
                                                    {/* <b>DOB</b> <a className="float-right">{data.dob ? moment(data.dob).format("DD/MM/YYYY") : "" || "NA"}</a> */}
                                                    <b>DOB</b> <a className="float-right"></a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Height</b> <a className="float-right">{data.height || "NA"}</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Exercise</b> <a className="float-right">{data.exercise || "NA"}</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Star Sign</b> <a className="float-right">{data.star_sign || "NA"}</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Education Level</b> <a className="float-right">{data.education_level || "NA"}</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Drinking</b> <a className="float-right">{data.drinking || "NA"}</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Smoking</b> <a className="float-right">{data.smoking || "NA"}</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Pets</b> <a className="float-right">{data.pets || "NA"}</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Cannabis</b> <a className="float-right">{data.cannabis || "NA"}</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Kids</b> <a className="float-right">{data.kids || "NA"}</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Religion</b> <a className="float-right">{data.religion || "NA"}</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Politics</b> <a className="float-right">{data.politics || "NA"}</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header p-2">
                                            <ul className="nav nav-pills">
                                                <li className="nav-item"><a className="nav-link active" href="#travel" data-toggle="tab">Travel</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#sports" data-toggle="tab">Sports</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#share_economy" data-toggle="tab">Share Economy</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#business" data-toggle="tab">Business</a></li>
                                            </ul>
                                        </div>
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div className="active tab-pane" id="travel">

                                                    <div className="row mb-3">
                                                        <div className="col-sm-12">
                                                            <div className="row">
                                                                {
                                                                    travel && travel.images && travel.images.length ?
                                                                        travel.images.map((ele: any) =>  (
                                                                            <div className="col-sm-2">
                                                                                <div className="text-center">
                                                                                    <img className="profile-user-img img-fluid img-circle"
                                                                                        src={getImage(ele)}
                                                                                        alt="User profile picture" />
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mt-5">
                                                                <div className="card-body">
                                                                    <ul className="list-group list-group-unbordered mb-3">
                                                                        <li className="list-group-item">
                                                                            <b>Date Mode</b> <a className="float-right">{ travel && travel.date_mode ? "YES" : "NO" }</a>
                                                                        </li>
                                                                    </ul>
                                                                    <strong>Desired Location</strong>

                                                                    {
                                                                        data.desired_location && data.desired_location.length ? 
                                                                        data.desired_location.map((ele: any) =>  (
                                                                            <p className="text-muted">
                                                                                <span>{getLocationAddress(ele.address)}</span><br />
                                                                                <span>{ele.from_time ? moment(ele.from_time).format("DD/MM/YYYY hh:mmA") : ""} to {ele.to_time ? moment(ele.to_time).format("DD/MM/YYYY hh:mmA") : ""}</span><br />
                                                                            </p>
                                                                        ))
                                                                        : <p className="text-muted">
                                                                            NA
                                                                        </p>
                                                                    }

                                                                    <hr />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="tab-pane" id="sports">
                                                    <div className="row mb-3">
                                                        <div className="col-sm-12">
                                                            <div className="row">
                                                                {
                                                                    sports && sports.images && sports.images.length ?
                                                                        sports.images.map((ele: any) =>  (
                                                                            <div className="col-sm-2">
                                                                                <div className="text-center">
                                                                                    <img className="profile-user-img img-fluid img-circle"
                                                                                        src={getImage(ele)}
                                                                                        alt="User profile picture" />
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mt-5">
                                                                <div className="card-body">
                                                                    <ul className="list-group list-group-unbordered mb-3">
                                                                        <li className="list-group-item">
                                                                            <b>Date Mode</b> <a className="float-right">{ sports && sports.date_mode ? "YES" : "NO" }</a>
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            <b>I Like to</b> <a className="float-right">{ sports && sports.i_like_to ? sports.i_like_to : "NA" }</a>
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            <b>Desired Match</b> <a className="float-right">{ sports && sports.desired_match ? sports.desired_match : "NA" }</a>
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            <b>Sports Match</b> <a className="float-right">{ sports && sports.sports_match ? sports.sports_match : "NA" }</a>
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            <b>Entertainment Match</b> <a className="float-right">{ sports && sports.entertainment_match ? sports.entertainment_match : "NA" }</a>
                                                                        </li>
                                                                    </ul>
                                                                    <strong>My Description</strong>

                                                                    <p className="text-muted">
                                                                        { sports && sports.my_description ? sports.my_description : "NA" }
                                                                    </p>

                                                                    <hr />

                                                                    <strong>Eventbrite Link:</strong>

                                                                    <p className="text-muted">
                                                                        { sports && sports.event_brite_link ? sports.event_brite_link : "NA" }
                                                                    </p>

                                                                    <hr />

                                                                    <strong>Open Table Link</strong>

                                                                    <p className="text-muted">
                                                                        { sports && sports.open_table_link ? sports.open_table_link : "NA" }
                                                                    </p>

                                                                    <hr />

                                                                    <strong>Place You Want to Go Link</strong>

                                                                    <p className="text-muted">
                                                                        { sports && sports.place_link ? sports.place_link : "NA" }
                                                                    </p>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="tab-pane" id="share_economy">
                                                    <div className="row mb-3">
                                                        <div className="col-sm-12">
                                                            <div className="row">
                                                                {
                                                                    share_economy && share_economy.images && share_economy.images.length ?
                                                                        share_economy.images.map((ele: any) =>  (
                                                                            <div className="col-sm-2">
                                                                                <div className="text-center">
                                                                                    <img className="profile-user-img img-fluid img-circle"
                                                                                        src={getImage(ele)}
                                                                                        alt="User profile picture" />
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mt-5">
                                                                <div className="card-body">
                                                                    <ul className="list-group list-group-unbordered mb-3">
                                                                        <li className="list-group-item">
                                                                            <b>Profile Mode</b> <a className="float-right">
                                                                                { share_economy && share_economy.date_mode ? "YES" : "NO" }
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            <b>Category</b> <a className="float-right">
                                                                                { share_economy && share_economy.category ? share_economy.category : "NA" }
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            <b>Experience Level</b> <a className="float-right">
                                                                                { share_economy && share_economy.experience_level ? share_economy.experience_level : "NA" }
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            <b>Budget</b> <a className="float-right">
                                                                                { share_economy && share_economy.budget_from ? `${share_economy.budget_from}-${share_economy.budget_to}` : "NA" }
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                    <strong>I Like to</strong>

                                                                    <p className="text-muted">
                                                                        { share_economy && share_economy.i_like_to ? share_economy.i_like_to : "NA" }
                                                                    </p>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="tab-pane" id="business">
                                                    <div className="row mb-3">
                                                        <div className="col-sm-12">
                                                            <div className="row">
                                                                {
                                                                    business && business.images && business.images.length ?
                                                                        business.images.map((ele: any) =>  (
                                                                            <div className="col-sm-2">
                                                                                <div className="text-center">
                                                                                    <img className="profile-user-img img-fluid img-circle"
                                                                                        src={getImage(ele)}
                                                                                        alt="User profile picture" />
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mt-5">
                                                                <div className="card-body">
                                                                    <ul className="list-group list-group-unbordered mb-3">
                                                                        <li className="list-group-item">
                                                                            <b>Profile Mode</b> <a className="float-right">
                                                                                { business && business.date_mode ? "YES" : "NO" }
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            <b>Language</b> <a className="float-right">
                                                                                { business && business.language ? business.language : "NA" }
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            <b>Education Level</b> <a className="float-right">
                                                                                { business && business.education_level ? business.education_level : "NA" }
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            <b>Experience</b> <a className="float-right">
                                                                                { business && business.experience ? business.experience : "NA" }
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            <b>Degree</b> <a className="float-right">
                                                                                { business && business.degree ? business.degree : "NA" }
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                    <strong>Title</strong>

                                                                    <p className="text-muted">
                                                                        { business && business.title ? business.title : "NA" }
                                                                    </p>

                                                                    <hr />

                                                                    <strong>Looking for the people with following</strong>

                                                                    <p className="text-muted">
                                                                        { business && business.looking_for ? business.looking_for : "NA" }
                                                                    </p>

                                                                    <hr />

                                                                    <strong>Your Interests</strong>

                                                                    <p className="text-muted">
                                                                        { business && business.interests ? business.interests : "NA" }
                                                                    </p>

                                                                    <hr />

                                                                    <strong>Your Goals</strong>

                                                                    <p className="text-muted">
                                                                        { business && business.goals ? business.goals : "NA" }
                                                                    </p>

                                                                    <hr />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : null
            }
        </div>
    );
}

export default memo(authRoute(User));
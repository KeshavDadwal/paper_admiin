import React, { memo, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import Helper from "../../apis/Helper";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { updateUpdateProfileFormData, update_profile_form_state_to_props, updateUpdateProfileUIConstraints, user_update_profile } from "../../redux/updateprofile/Action";
import { UPDATE_PROFILE_ERRORS, UPDATE_PROFILE_FORM_PHONE, UPDATE_PROFILE_FORM_COMPANY_NAME, UPDATE_PROFILE_FORM_IMAGE_BLOB, UPDATE_PROFILE_FORM_IMAGE_URL, UPDATE_PROFILE_FORM_EMAIL, UPDATE_PROFILE_FORM_FIRST_NAME, UPDATE_PROFILE_FORM_LAST_NAME, UPDATE_PROFILE_FORM_DEPARTMENT, UPDATE_PROFILE_FORM_JOB_TITLE, UPDATE_PROFILE_FORM_LINKDIN_URL } from "../../redux/Types";
import Utils from "../util/Utils";
import { useRouter } from "next/router";

const EditProfileForm = () => {
    console.log("Page ===> Edit Profile Form");
    const dispatch = useDispatch();
    const router = useRouter();

    //Props
    const {
        first_name,
        last_name,

        company_name,
        image,
        email,
        phone,

        department,
        linkedin_url,
        job_title,

        loading,

        errors
    } = useSelector(
        update_profile_form_state_to_props,
        shallowEqual
    );

    const onChange = useCallback((e: any) => {
        const { name, value } = e && e.target ? e.target : {} as any;

        dispatch(
            updateUpdateProfileFormData({
                [name]: value,
            })
        );
    }, []);

    const onUploadFile = useCallback(async (e: any) => {
        const { files } = e && e.target ? e.target : {} as any;

        if (!files || (files && !files.length)) return;

        const url = await Utils.readURL(files[0]);
        dispatch(updateUpdateProfileFormData({
            [UPDATE_PROFILE_FORM_IMAGE_BLOB]: files[0],
            [UPDATE_PROFILE_FORM_IMAGE_URL]: url
        }));

        //Reset selected file
        (document.getElementById("profile_image_file_upload") as HTMLInputElement).value = "";
    }, []);

    const onRemoveImage = useCallback(async (e: any) =>  {
        dispatch(updateUpdateProfileFormData({
            [UPDATE_PROFILE_FORM_IMAGE_BLOB]: undefined,
            [UPDATE_PROFILE_FORM_IMAGE_URL]: ""
        }));
    }, []);

    const getLoginBtnClass = useMemo(() => {
        if (loading) return "btn btn-primary btn-md xs-block mt-4 m-loader";

        return "btn btn-primary btn-md xs-block mt-4";
    }, [loading]);

    const submit = useCallback(
        (e: any) =>  {
            e.preventDefault();

            if (loading) return;

            let requestBody = { first_name, last_name, email, company_name, phone, department, job_title };

            Helper.validate(Object.keys(requestBody), requestBody)
                .then(({ status, response }) => {
                    console.log("response ===> ", response)
                    if (status) {
                        dispatch(
                            updateUpdateProfileUIConstraints({
                                [UPDATE_PROFILE_ERRORS]: [],
                            })
                        );

                        dispatch(user_update_profile())
                    } else
                        dispatch(
                            updateUpdateProfileUIConstraints({
                                [UPDATE_PROFILE_ERRORS]:
                                    response && response.length ? response : []
                            })
                        );
                })
                .catch((err) => console.log(err));
        },
        [first_name, last_name, email, company_name, phone, job_title, department, loading]);

    /** On error */
    const isError = useCallback(
        (key: any) =>  {
            if (errors && errors.length) {
                return errors.findIndex((ele: any) =>  ele.fieldName === key) > -1
                    ? {
                        status: true,
                        message:
                            errors[errors.findIndex((ele: any) =>  ele.fieldName === key)]
                                .message,
                    }
                    : { status: false, message: "" };
            } else return { status: false, message: "" };
        },
        [errors]
    );

    const _handleErrorMessage = (key: any) =>  {
        const data = isError(key);

        if (data && data.status)
            return <p className="text-right text-danger">{data.message}</p>;

        return <div />;
    };

    const openUrl = useCallback((url: string) => {
        if (!url) return;

        router.push(url);
    }, []);

    const get_image = useMemo(() => image ? image : "/assets/images/image_placeholder.svg", [image])
    const render_remove_btn = useMemo(() => {
        if (!image) return <div />

        return (
            <button type="button" onClick={onRemoveImage} className="btn btn-danger btn-font-13 btn-less-rounded">
                Remove
            </button>
        );
    }, [image]);

    return (
        <form onSubmit={submit}>
            <div className="profile_view">
                <div className="profile_img">
                    <img
                        className="responsive"
                        src={get_image}
                        alt="image"
                    />
                </div>
                <div className="input_file">
                    <h3>{`${first_name} ${last_name}`}</h3>
                    <label
                        htmlFor="profile_image_file_upload"
                        className="btn btn-mute btn-xs"
                    >
                        
                </label>
                    <input
                        id="profile_image_file_upload"
                        onChange={onUploadFile}
                        accept=".png, .jpg, .jpeg"
                        type="file" />
                </div>
                
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name={UPDATE_PROFILE_FORM_FIRST_NAME}
                            onChange={onChange}
                            value={first_name}
                            className="form-control"
                            placeholder="Required"
                        />
                        {_handleErrorMessage("first_name")}
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name={UPDATE_PROFILE_FORM_LAST_NAME}
                            onChange={onChange}
                            value={last_name}
                            className="form-control"
                            placeholder="Required"
                        />
                        {_handleErrorMessage("last_name")}
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            name={UPDATE_PROFILE_FORM_EMAIL}
                            onChange={onChange}
                            value={email}
                            className="form-control"
                            placeholder="Required"
                        />
                        {_handleErrorMessage("last_name")}
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="form-group">
                        <label>Company Name</label>
                        <input
                            type="text"
                            name={UPDATE_PROFILE_FORM_COMPANY_NAME}
                            onChange={onChange}
                            value={company_name}
                            className="form-control"
                            placeholder="Required"
                        />
                        {_handleErrorMessage("company_name")}
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name={UPDATE_PROFILE_FORM_PHONE}
                            onChange={onChange}
                            value={phone}
                            className="form-control"
                            placeholder="Required"
                        />
                        {_handleErrorMessage("phone")}
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="form-group">
                        <label>Department</label>
                        <input
                            type="text"
                            name={UPDATE_PROFILE_FORM_DEPARTMENT}
                            onChange={onChange}
                            value={department}
                            className="form-control"
                            placeholder="Required"
                        />
                        {_handleErrorMessage("department")}
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="form-group">
                        <label>Job Title</label>
                        <input
                            type="text"
                            name={UPDATE_PROFILE_FORM_JOB_TITLE}
                            onChange={onChange}
                            value={job_title}
                            className="form-control"
                            placeholder="Required"
                        />
                        {_handleErrorMessage("job_title")}
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="form-group">
                        <label>Linkdin Profile Url</label>
                        <input
                            type="text"
                            name={UPDATE_PROFILE_FORM_LINKDIN_URL}
                            onChange={onChange}
                            value={linkedin_url}
                            className="form-control"
                            placeholder="Required"
                        />
                        {_handleErrorMessage("linkedin_url")}
                    </div>
                </div>
            </div>
            <button type="submit" className={getLoginBtnClass}>
                Update Profile
      </button>
        </form>
    );
};

export default memo(EditProfileForm);

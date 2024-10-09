import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { user_logout } from "../../redux/login/Action";
import { header_and_sidebar_system_state_to_props } from "../../redux/system/Action";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isHideSideBar, isHideHeader } = useSelector(header_and_sidebar_system_state_to_props, shallowEqual);

  const openUrl = useCallback((path: string) => {
    if (!path) return;

    router.push(path);
  }, []);

  const logout = useCallback(() => {
    dispatch(user_logout());
  }, []);

  if (isHideHeader) return <div />;

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" data-widget="fullscreen" href="#" role="button">
            <i className="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={logout} data-widget="control-sidebar" data-slide="true" href="#" role="button">
            Logout
            <i className="fas fa-sign-out-alt pl-2"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Header);

import * as React from "react";
import { PureComponent, memo, useCallback, useMemo } from "react";
// import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { header_and_sidebar_system_state_to_props } from "../../redux/system/Action";
import { shallowEqual, useSelector } from 'react-redux';
import { PAGE_BLOGS, PAGE_DATA, PAGE_EMAIL, PAGE_HOME, PAGE_INSIGHTS, PAGE_LINKS, PAGE_MATCHES, PAGE_PLANS, PAGE_REPORT_REASON, PAGE_STATS, PAGE_SUBSCIRPTIONS, PAGE_USERS, NEWS } from "../../redux/Types";

const Sidebar = () => {
  const router = useRouter();
  const { isHideSideBar, isHideHeader, selectedPage } = useSelector(header_and_sidebar_system_state_to_props, shallowEqual);

  const openUrl = useCallback((path: string) => {
    if (!path) return;

    router.push(path);
  }, []);

  console.log("selectedPage ==> ", selectedPage);
  const getLinkClass = useCallback((page: any) => {
    return page === selectedPage ? "active" : "";
  }, [selectedPage]);

  if (isHideSideBar) return <div />;

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="../../index3.html" className="brand-link">
        <img src="/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: .8 }} />
        <span className="brand-text font-weight-light">Paper Admin</span>
      </a>

      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/")} className={`nav-link ${getLinkClass(PAGE_HOME)} blossom-admin-cursor`}>
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                </p>
              </a>
            </li> */}
            <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/users")} className={`nav-link ${getLinkClass(PAGE_USERS)} blossom-admin-cursor`}>
                <i className="nav-icon fas fa-users"></i>
                <p>
                  Users
                </p>
              </a>
            </li>
            <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/report_reason")} className={`nav-link ${getLinkClass(PAGE_REPORT_REASON)} blossom-admin-cursor`}>
                <i className="nav-icon fas fa-th"></i>
                <p>
                  Report Reason Management
                </p>
              </a>
            </li>

            <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/news")} className={`nav-link ${getLinkClass(NEWS)} blossom-admin-cursor`}>
              <i className="nav-icon fas fa-copy"></i>
                <p>
                 Post
                </p>
              </a>
            </li>
            {/* <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/plans")} className={`nav-link ${getLinkClass(PAGE_PLANS)} blossom-admin-cursor`}>
                <i className="nav-icon fas fa-columns"></i>
                <p>
                  Plan Managment
                </p>
              </a>
            </li>
            <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/matches")} className={`nav-link ${getLinkClass(PAGE_MATCHES)} blossom-admin-cursor`}>
                <i className="nav-icon far fa-plus-square"></i>
                <p>
                  Match Management
                </p>
              </a>
            </li>
            <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/subscriptions")} className={`nav-link ${getLinkClass(PAGE_SUBSCIRPTIONS)} blossom-admin-cursor`}>
                <i className="nav-icon far fa-plus-square"></i>
                <p>
                  Subscription Management
                </p>
              </a>
            </li>
            <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/data")} className={`nav-link ${getLinkClass(PAGE_DATA)} blossom-admin-cursor`}>
                <i className="nav-icon fas fa-th"></i>
                <p>
                  Default Values
                </p>
              </a>
            </li>
            <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/report_reason")} className={`nav-link ${getLinkClass(PAGE_REPORT_REASON)} blossom-admin-cursor`}>
                <i className="nav-icon fas fa-th"></i>
                <p>
                  Report Reason Management
                </p>
              </a>
            </li>
            <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/links")} className={`nav-link ${getLinkClass(PAGE_LINKS)} blossom-admin-cursor`}>
                <i className="nav-icon fas fa-th"></i>
                <p>
                  Join us Links
                </p>
              </a>
            </li>
            <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/email")} className={`nav-link ${getLinkClass(PAGE_EMAIL)} blossom-admin-cursor`}>
                <i className="nav-icon fas fa-th"></i>
                <p>
                  Email Managment
                </p>
              </a>
            </li> */}
            {/* <li className="nav-item has-treeview">
              <a onClick={openUrl.bind(this, "/blog")} className={`nav-link ${getLinkClass(PAGE_BLOGS)} blossom-admin-cursor`}>
                <i className="nav-icon fas fa-copy"></i>
                <p>
                  Blogs
                </p>
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default memo(Sidebar);

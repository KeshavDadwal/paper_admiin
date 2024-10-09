import { Footer } from "../../components/dashboard";
import { memo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { home_system_state_to_props, system_state_to_props } from "../../redux/system/Action";
import { Header, Sidebar } from "../dashboard";

function Wrapper({ children }) {

    const { isAuthenticated, isSetProfile, isSetReminder, loading } = useSelector(home_system_state_to_props, shallowEqual);

    if(loading) return (
        <div className="hold-transition login-page">
                <div className="login-box text-center">
                    <span >please wait...</span>
                </div>
            </div>
    );

    if (!isAuthenticated) return children;

    // if (isAuthenticated && (!isSetProfile || !isSetReminder)) return children;

    return (
        <body className="hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
            <div className="wrapper">
                <Header />
                <Sidebar />
                {children}
                <Footer />
            </div>
        </body>
    );
}

export default memo(Wrapper);
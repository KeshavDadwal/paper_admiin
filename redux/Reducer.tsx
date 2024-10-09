import { combineReducers } from "node_modules/redux";
import Login from "./login/Reducer";
import Signup from "./signup/Reducer";
import UserData from "./user/Reducer";
import SystemData from "./system/Reducer";
import SidebarData from "./sidebar/Reducer";
import HeaderData from "./header/Reducer";
import FooterData from "./footer/Reducer";
import Dashboard from "./dashboard/Reducer";
import ForgotPassword from './forgotpassword/Reducer';
import ResetPassword from './resetpassword/Reducer';
import UpdateProfile from './updateprofile/Reducer';
import OnBoarding from './onboarding/Reducer';
import Users from './users/Reducer';

import {
  LOGIN_ROOT,
  USER_ROOT,
  SYSTEM_DATA_ROOT,
  SIDEBAR_ROOT,
  HEADER_ROOT,
  FOOTER_ROOT,
  DASHBOARD_ROOT,
  SIGNUP_ROOT,
  UPDATE_PROFILE_ROOT,
  FORGOT_PASSWORD_ROOT,
  RESET_PASSWORD_ROOT,
  ONBOARDING_ROOT,
  USERS_ROOT,
  BLOGS_ROOT,
  PLANS_ROOT
} from "./Types";

export default combineReducers({
  [LOGIN_ROOT]: Login,
  [SIGNUP_ROOT]: Signup,
  [USER_ROOT]: UserData,
  [SYSTEM_DATA_ROOT]: SystemData,
  [SIDEBAR_ROOT]: SidebarData,
  [HEADER_ROOT]: HeaderData,
  [FOOTER_ROOT]: FooterData,
  [DASHBOARD_ROOT]: Dashboard,
  [FORGOT_PASSWORD_ROOT]: ForgotPassword,
  [RESET_PASSWORD_ROOT]: ResetPassword,
  [UPDATE_PROFILE_ROOT]: UpdateProfile,
  [ONBOARDING_ROOT]: OnBoarding,
  [USERS_ROOT]: Users,
});

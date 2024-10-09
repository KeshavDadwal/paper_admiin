/**
 * Common Constants
 */
export const SUCCESS = "success";
export const UPDATE = "update";
export const LOADING = "loading";
export const ERROR = "error";
export const NOT_FOUND = "not_found";
export const MESSAGE = "message";
export const STATUS = "status";
export const PENDING = "pending";
export const EMPTY = "empty";
export const RESPONSE = "response";
export const LOG_OUT = "log_out";
export const TOKEN_NOT_FOUND = "token_not_found";
export const ACTIVE = 1;
export const DEACTIVE = 0;
export const USER_ACTIVE = "active";
export const USER_INACTIVE = "inactive";
export const DISCOUNT = "Discount not greater than 100";
export const OFFERS_ALL_PRODUCTS = "all_products";
export const OFFERS_ALL_CATEGORY_PRODUCTS = "category_products";
export const OFFERS_ALL_SUB_CATEGORY_PRODUCTS = "sub_category_products";
export const OFFERS_PRODUCT_PRODUCTS = "custom_products";

export const DOCUMENTS = "documents";
export const VIDEOS = "videos";

export const LOGIN_TYPE_GOOGLE= "google";
export const LOGIN_TYPE_LINKEDIN= "linkedin";

//Server response
export const SERVER_USER_DATA = "user_data";
export const SERVER_SUCCESS = "success";
export const SERVER_ERROR = "error";
export const SERVER_NOT_VALID = "not_valid";
export const SERVER_NOT_CHANGED = "not_changed";
export const SERVER_PRESENT = "present";
export const SERVER_EMAIL_PRESENT = "email_present";
export const SERVER_PHONE_PRESENT = "phone_present";
export const SERVER_NO_VALUE = "no_value";
export const SERVER_NOT_AUTHORIZED = "not_authorized";
export const SERVER_EMPTY_OBJECT = "empty_object";
export const SERVER_BAD_REQUEST = "bad_request";
export const SERVER_VALIDATION_ERROR = "validation_error";
export const SERVER_MODEL_VALIDATION_ERROR = "model_validation_error";
export const SERVER_VERIFICATION_ERROR = "verification_error";
export const SERVER_FORBIDDEN = "forbidden";
export const SERVER_LOGGED_IN = "logged_in";
export const SERVER_LOGGED_OUT = "logged_out";
export const SERVER_INTERNAL_SERVER_ERROR = "internal_server_error";
export const SERVER_DOC_TYPE_DRIVING_LICENSE = "driving_license";
export const SERVER_DOC_TYPE_ADDRESS_PROOF = "address_proof";
export const SERVER_DOC_TYPE_OTHER = "other";

/** ---------------------------------------------- */

/**
 * Header data
 * */
export const HEADER_ROOT = "header";
export const HEADER_UPDATE = "header_update";
export const HEADER_KEY = "header_key";

//UI constants
export const HEADER_PROPS = "header_props";
export const HEADER_IS_SHOW = "header_is_show";
/** ------------------------------ */


//UI constants
export const PAGE_HOME = "home";
export const PAGE_STATS = "stats";
export const PAGE_INSIGHTS = "insights";
export const PAGE_REFLECT = "reflect";
export const PAGE_USERS = "users";
export const PAGE_DATA = "data";
export const PAGE_MATCHES = "matches";
export const PAGE_LINKS = "links";
export const PAGE_REPORT_REASON = "report_reason";
export const NEWS = "news";
export const PAGE_SUBSCIRPTIONS = "subscriptions";
export const PAGE_PLANS = "plans";
export const PAGE_EMAIL = "email";
export const PAGE_BLOGS = "blogs";
/** ------------------------------ */

/** Local database */
export const AOR_LOGIN_DATA = "blossom_alogin_data";
export const AOR_LOGIN_DATA_EXPIRES_IN = 7 * 24 * 60 * 60;
export const AOR_LOGIN_REMEMBER_ME = "blossom_login_remember_me";
/** ------------------------------ */

/**
 * Sidebar data
 * */
export const SIDEBAR_ROOT = "sidebar";
export const SIDEBAR_UPDATE = "sidebar_update";
export const SIDEBAR_KEY = "sidebar_key";

//UI constants
export const SIDEBAR_PROPS = "sidebar_props";
export const SIDEBAR_IS_SHOW = "sidebar_is_show";
export const SIDEBAR_PAGE_PATH = "sidebar_page_path";
/** ------------------------------ */

/**
 * Footer data
 * */
export const FOOTER_ROOT = "footer";
export const FOOTER_UPDATE = "footer_update";
export const FOOTER_KEY = "footer_key";
export const FOOTER_FORM = "footer_form";

//UI constants
export const FOOTER_PROPS = "footer_props";
export const FOOTER_IS_SHOW = "footer_is_show";
export const FOOTER_IS_SIGNUP_BTN = "footer_is_signup_btn";

export const PURCHASE_MODAL_SHOW = "purchase_is_show";
export const PAYMENT_MODAL_SHOW = "payment_is_show";
export const SUPPORT_MODAL_SHOW = "support_is_show";

/** ------------------------------ */

/**
 * Login constant key
 * */
export const LOGIN_ROOT = "login";
export const LOGIN_UPDATE = "login_update";
export const LOGIN_RESET = "login_reset";
export const LOGIN_KEY = "login_key";

//UI constants
export const LOGIN_ERRORS = "login_errors";
export const LOGIN_REQUEST_STATUS = "login_request_status";
export const LOGIN_REQEUST_LOADING = "login_request_loading";
export const LOGIN_REQEUST_GOOGLE_LOADING = "login_request_google_loading";
export const LOGIN_REQEUST_LINKEDIN_LOADING = "login_request_linkedin_loading";
export const LOGIN_REQEUST_SESSION_LOADING = "login_request_session_loading";
export const LOGIN_REQUEST_SESSION_STATUS = "login_request_session_status";
export const LOGIN_REQEUST_LOGOUT_LOADING = "login_request_logout_loading";



//Form constants
export const LOGIN_FORM = "login_form";
export const LOGIN_FORM_EMAIL = "login_form_email";
export const LOGIN_FORM_PASSWORD = "login_form_password";
export const LOGIN_FORM_REMEMBER_ME = "login_form_remember_me";
/** ------------------------------ */

/**
 * Forgot password constant key
 * */
export const FORGOT_PASSWORD_ROOT = "forgot_password";
export const FORGOT_PASSWORD_UPDATE = "forgot_password_update";
export const FORGOT_PASSWORD_RESET = "forgot_password_reset";
export const FORGOT_PASSWORD_KEY = "forgot_password_key";

//UI constants
export const FORGOT_PASSWORD_ERRORS = "forgot_password_errors";
export const FORGOT_PASSWORD_REQUEST_STATUS = "forgot_password_request_status";
export const FORGOT_PASSWORD_REQEUST_LOADING = "forgot_password_request_loading";

//Form constants
export const FORGOT_PASSWORD_FORM = "forgot_password_form";
export const FORGOT_PASSWORD_FORM_EMAIL = "forgot_password_form_email";
/** ------------------------------ */

/**
 * Reset password constant key
 * */
export const RESET_PASSWORD_ROOT = "reset_password";
export const RESET_PASSWORD_UPDATE = "reset_password_update";
export const RESET_PASSWORD_RESET = "reset_password_reset";
export const RESET_PASSWORD_KEY = "reset_password_key";

//UI constants
export const RESET_PASSWORD_ERRORS = "reset_password_errors";
export const RESET_PASSWORD_REQUEST_STATUS = "reset_password_request_status";
export const RESET_PASSWORD_REQEUST_LOADING = "reset_password_request_loading";

//Form constants
export const RESET_PASSWORD_FORM = "reset_password_form";
export const RESET_PASSWORD_FORM_UID = "reset_password_form_uid";
export const RESET_PASSWORD_FORM_TOKEN = "reset_password_form_token";
export const RESET_PASSWORD_FORM_PASSWORD = "reset_password_form_password";
export const RESET_PASSWORD_FORM_CONFIRM_PASSWORD = "reset_password_form_confirm_password";
/** ------------------------------ */

/**
 * User data
 * */
export const USER_ROOT = "user";
export const USER_UPDATE = "user_update";
export const USER_KEY = "user_key";

//UI constants
export const USER_DATA = "user_data";
/** ------------------------------ */

/**
 * System data
 * */
export const SYSTEM_DATA_ROOT = "system_data";
export const SYSTEM_DATA_UPDATE = "system_data_update";
export const SYSTEM_DATA_KEY = "system_data_key";

//UI constants
export const SYSTEM_DATA_IS_AUTHENTICATED = "system_data_is_authenticated";
export const SYSTEM_DATA_IS_SETUP_PROFILE = "system_data_is_setup_profile";
export const SYSTEM_DATA_IS_SETUP_REMINDER = "system_data_is_setup_reminder";
export const SYSTEM_DATA_IS_SKIP_REMINDER = "system_data_is_skip_reminder";
export const SYSTEM_DATA_IS_HIDE_SIDEBAR = "system_data_is_hide_sidebar";
export const SYSTEM_DATA_IS_HIDE_HEADER = "system_data_is_hide_header";
export const SYSTEM_DATA_PAGE_TITLE = "system_data_page_title";
export const SYSTEM_DATA_SELECTED_PAGE = "system_data_selected_page";
export const SYSTEM_DATA_ACCREDITED_INVESTOR_DATA = "system_data_accredited_investor_data";
/** ------------------------------ */

/** --------Dashboard Constant------------- */

export const DASHBOARD_ROOT = "dashboard";
export const DASHBOARD_UPDATE = "dashboard_update";
export const DASHBOARD_RESET = "dashboard_reset";
export const DASHBOARD_KEY = "dashboard_key";
export const DASHBOARD_REQUEST_STATUS = "dashboard_request_sattus";

export const DASHBOARD_DATA = "dashboard_data";
export const DASHBOARD_LOADING = "dashboard_loading";
export const DASHBOARD_RELECTION_LOADING = "dashboard_reflection_loading";
export const DASHBOARD_ERRORS = "dashboard_errors";
export const DASHBOARD_DATE = "dashboard_date";
export const DASHBOARD_REFLECTION_DATA = "dashboard_reflection_data";
export const DASHBOARD_SELECTED_REFLECTION_DATA = "dashboard_selected_reflection";
/** ---------------------------------------- */

/**
 * Signup constant key
 * */
export const SIGNUP_ROOT = "signup";
export const SIGNUP_UPDATE = "signup_update";
export const SIGNUP_RESET = "signup_reset";
export const SIGNUP_KEY = "signup_key";

//UI constants
export const SIGNUP_ERRORS = "signup_errors";
export const SIGNUP_REQUEST_STATUS = "signup_request_status";
export const SIGNUP_REQEUST_LOADING = "signup_request_loading";

//Form constants
export const SIGNUP_FORM = "signup_form";

export const SIGNUP_FORM_FIRST_NAME = "signup_form_first_name";
export const SIGNUP_FORM_LAST_NAME = "signup_form_last_name";
export const SIGNUP_FORM_EMAIL = "signup_form_email";
export const SIGNUP_FORM_PASSWORD = "signup_form_password";

export const SIGNUP_FORM_ACCOUNT_TYPE = "signup_form_account_type";

export const SIGNUP_FORM_ACCOUNT_TYPE_INVESTMENT_OWNER = "investment_owner";
export const SIGNUP_FORM_ACCOUNT_TYPE_INVESTOR = "investor";

export const SIGNUP_FORM_ACCREDITED_INVESTOR = "signup_form_accredited_investor";
export const SIGNUP_FORM_ACCREDITED_INVESTOR_TYPE_YES = "yes";
export const SIGNUP_FORM_ACCREDITED_INVESTOR_TYPE_NO = "no";
export const SIGNUP_FORM_ACCREDITED_INVESTOR_TYPE_I_DONT = "I Don't";
export const SIGNUP_FORM_ACCREDITED_INVESTOR_AGREE_TERMS = "signup_form_accredited_investor_agree_terms";
export const SIGNUP_FORM_ACCREDITED_INVESTOR_NETWORTH = "signup_form_accredited_investor_networth";
export const SIGNUP_FORM_ACCREDITED_INVESTOR_ANNUAL_INCOME = "signup_form_accredited_investor_annual_income";
export const SIGNUP_FORM_ACCREDITED_INVESTOR_LAST_OFFERING = "signup_form_accredited_investor_last_offering";
export const SIGNUP_FORM_I_AGREE_TERMS_AND_PRIVACY_POLICY = "signup_form_i_aggree_terms_and_privacy_policy";

/** ------------------------------ */

/**
 * Update profile constant key
 * */
export const UPDATE_PROFILE_ROOT = "update_profile";
export const UPDATE_PROFILE_UPDATE = "update_profile_update";
export const UPDATE_PROFILE_RESET = "update_profile_reset";
export const UPDATE_PROFILE_KEY = "update_profile_key";

//UI constants
export const UPDATE_PROFILE_IS_SETUP_PROFILE = "update_profile_is_setup_profile";
export const UPDATE_PROFILE_ERRORS = "update_profile_errors";
export const UPDATE_PROFILE_REQUEST_STATUS = "update_profile_request_status";
export const UPDATE_PROFILE_REQEUST_LOADING = "update_profile_request_loading";

//Form constants
export const UPDATE_PROFILE_FORM = "update_profile_form";

export const UPDATE_PROFILE_FORM_IMAGE_URL = "update_profile_form_image_url";
export const UPDATE_PROFILE_FORM_IMAGE_BLOB = "update_profile_form_image_blob";

export const UPDATE_PROFILE_FORM_FIRST_NAME = "update_profile_form_first_name";
export const UPDATE_PROFILE_FORM_LAST_NAME = "update_profile_form_last_name";
export const UPDATE_PROFILE_FORM_EMAIL = "update_profile_form_email";
export const UPDATE_PROFILE_FORM_PASSWORD = "update_profile_form_password";
export const UPDATE_PROFILE_FORM_CONFIRM_PASSWORD = "update_profile_form_confirm_password";
export const UPDATE_PROFILE_FORM_OLD_PASSWORD = "update_profile_form_old_password";

export const UPDATE_PROFILE_FORM_COMPANY_NAME = "update_profile_form_company_name";
export const UPDATE_PROFILE_FORM_PHONE = "update_profile_form_phone";

export const UPDATE_PROFILE_FORM_JOB_TITLE = "update_profile_form_job_title";
export const UPDATE_PROFILE_FORM_DEPARTMENT = "update_profile_form_department";
export const UPDATE_PROFILE_FORM_LINKDIN_URL = "update_profile_form_linkdin_url";

/** ------------------------------ */

/**
 * Onboarding screens constant key
 * */
export const ONBOARDING_ROOT = "onboarding";
export const ONBOARDING_UPDATE = "onboarding_update";
export const ONBOARDING_RESET = "onboarding_reset";
export const ONBOARDING_KEY = "onboarding_key";

//UI constants
export const ONBOARDING_IS_SETUP_PROFILE = "onboarding_is_setup_profile";
export const ONBOARDING_IS_SKIP_REMINDER = "onboarding_is_skip_reminder";
export const ONBOARDING_HIDE_CATEGORY_BACK_BUTTON = "onboarding_hide_category_back_button";
export const ONBOARDING_HIDE_QUESTIONS_BACK_BUTTON = "onboarding_hide_questions_back_button";
export const ONBOARDING_DATA = "onboarding_data";
export const ONBOARDING_ERRORS = "onboarding_errors";
export const ONBOARDING_REQUEST_STATUS = "onboarding_request_status";
export const ONBOARDING_REQEUST_LOADING = "onboarding_request_loading";
export const ONBOARDING_GET_REQUEST_LOADING = "onboarding_get_request_loading";

export const ONBOARDING_TAB_TYPE = "onboarding_tab_type";
export const ONBOARDING_TAB_TYPE_WELCOME = "onboarding_tab_type_welcome";
export const ONBOARDING_TAB_TYPE_USER_NAME = "onboarding_tab_type_user_name";
export const ONBOARDING_TAB_TYPE_EXTRA_INFO = "onboarding_tab_type_extra_info";
export const ONBOARDING_TAB_TYPE_DAILY_REFLECTION_INFO = "onboarding_tab_type_daily_reflection_info";
export const ONBOARDING_TAB_TYPE_SELECT_CATEGORY = "onboarding_tab_type_category";
export const ONBOARDING_TAB_TYPE_QUESTIONS = "onboarding_tab_type_questions";
export const ONBOARDING_TAB_TYPE_WELL_DONE = "onboarding_tab_type_well_done";
export const ONBOARDING_TAB_TYPE_REFLECT_DAILY = "onboarding_tab_type_reflect_daily";
export const ONBOARDING_TAB_TYPE_SET_REMINDER = "onboarding_tab_type_set_reminder";
export const ONBOARDING_TAB_TYPE_PROGRESS = "onboarding_tab_type_progress";
export const ONBOARDING_TAB_TYPE_PREMIUM = "onboarding_tab_type_premium";
export const ONBOARDING_TAB_TYPE_CHOICE = "onboarding_tab_type_choice";

//Form constants
export const ONBOARDING_FORM = "onboarding_form";

export const ONBOARDING_FORM_NAME = "onboarding_form_name";
export const ONBOARDING_FORM_BRINGS_YOU_TO_AOR = "onboarding_form_brings_you_to_blossom";
export const ONBOARDING_FORM_CATEGORY = "onboarding_form_category";
export const ONBOARDING_FORM_REFLECTION_DATE = "onboarding_form_date";
export const ONBOARDING_FORM_ADD_TODAY_REFLECTION = "onboarding_form_add_today_reflection";
export const ONBOARDING_FORM_QUESTIONS = "onboarding_form_questions";
export const ONBOARDING_FORM_REFLECTION_ID = "onboarding_form_reflection_id";
export const ONBOARDING_FORM_REFLECTION_DATA = "onboarding_form_reflection_data";
export const ONBOARDING_FORM_REMINDER_REPEATS = "onboarding_form_reminder_repeats";
export const ONBOARDING_FORM_REMINDER_TIME = "onboarding_form_reminder_time";

/** ------------------------------ */


/** --------Users Constant------------- */

export const USERS_ROOT = "users";
export const USERS_UPDATE = "users_update";
export const USERS_RESET = "users_reset";
export const USERS_KEY = "users_key";
export const USERS_REQUEST_STATUS = "users_request_sattus";

export const USERS_DATA = "users_data";
export const USERS_LOADING = "users_loading";
export const USERS_DELETE_LOADING = "users_delete_loading";
/** ---------------------------------------- */

/**
 * User detail constant key
 * */
export const USER_DETAIL_ROOT = "user_detail";
export const USER_DETAIL_UPDATE = "user_detail_update";
export const USER_DETAIL_RESET = "user_detail_reset";
export const USER_DETAIL_KEY = "user_detail_key";

//UI constants
export const USER_DETAIL_ERRORS = "user_detail_errors";
export const USER_DETAIL_REQUEST_STATUS = "user_detail_request_status";
export const USER_DETAIL_REQEUST_LOADING = "user_detail_request_loading";
export const USER_DETAIL_UID = "user_detail_uid";
export const USER_DETAIL_DATA = "user_detail_data";

/** ------------------------------ */

/** --------Blogs Constant------------- */

export const BLOGS_ROOT = "blogs";
export const BLOGS_UPDATE = "blogs_update";
export const BLOGS_RESET = "blogs_reset";
export const BLOGS_KEY = "blogs_key";
export const BLOGS_REQUEST_STATUS = "blogs_request_sattus";

export const BLOGS_DATA = "blogs_data";
export const BLOGS_LOADING = "blogs_loading";
export const BLOGS_DELETE_LOADING = "blogs_delete_loading";
/** ---------------------------------------- */

/** --------Users Constant------------- */

export const PLANS_ROOT = "plans";
export const PLANS_UPDATE = "plans_update";
export const PLANS_RESET = "plans_reset";
export const PLANS_KEY = "plans_key";
export const PLANS_REQUEST_STATUS = "plans_request_sattus";
export const PLANS_REQUEST_LOADING = "plans_request_loading";

export const PLANS_DATA = "plans_data";
export const PLANS_LOADING = "plans_loading";

/** ---------------------------------------- */

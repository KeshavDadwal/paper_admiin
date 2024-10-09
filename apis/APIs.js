import AppConfig from "../configs/AppConfig";
import Utils from "../components/util/Utils";
import Helper from "./Helper";

const RESOURCE_URL = AppConfig.base_url;
const LINKEDIN_EMAIL_URL = AppConfig.linkedin_url;

const authorize_token = Helper.getAuthrizeToken();

const setHeaders = (value = {}) =>
  new Headers({
    "content-type": "application/json",
    Authorization: authorize_token,
    ...value,
  });

const setHeadersForMultipartData = (value = {}) =>
  new Headers({
    Authorization: authorize_token,
    ...value,
  });

const setHeadersData = (value = {}) =>
  new Headers({
    Authorization: authorize_token,
    ...value,
  });

const POST = (baseUrl, endpoint, body, headers) =>
  fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: setHeaders(headers),
    body: JSON.stringify(body),
  }).then(Utils.verifyResponse);

const POST_WITHOUT_DEFAULT_HEADER = (baseUrl, endpoint, body, headers) =>
  fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: setHeadersData(headers),
    body: JSON.stringify(body),
  }).then(Utils.verifyResponse);

const GET_WITHOUT_DEFAULT_HEADER = (baseUrl, endpoint, headers) =>
  fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: setHeadersData(headers)
  }).then(Utils.verifyResponse);

const POST_WITH_MULTIPART = (baseUrl, endpoint, body, headers) =>
  fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: setHeadersForMultipartData(headers),
    body: body,
  }).then(Utils.verifyResponse);

const PUT = (baseUrl, endpoint, body, headers) =>
  fetch(`${baseUrl}${endpoint}`, {
    method: "PUT",
    headers: setHeaders(headers),
    body: JSON.stringify(body),
  }).then(Utils.verifyResponse);

const DELETE = (baseUrl, endpoint, headers) =>
  fetch(`${baseUrl}${endpoint}`, {
    method: "DELETE",
    headers: setHeaders(headers),
  }).then(Utils.verifyResponse);

const GET = (baseUrl, endpoint, headers) =>
  fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: setHeaders(headers),
  }).then(Utils.verifyResponse);

export const login = (body) =>
  POST(RESOURCE_URL, `/login`, body)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const auth2_login = (body) =>
  POST(RESOURCE_URL, `/user/auth2/login`, body)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const signup = (body) =>
  POST(RESOURCE_URL, `/user/signup`, body)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const session_login = (headers) =>
  GET(RESOURCE_URL, `/session/login`, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const forgot_password = (body) =>
  POST(RESOURCE_URL, `/forgot_password?is_admin=${true}`, body)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const reset_password = (body) =>
  POST(RESOURCE_URL, `/reset_password_via_token`, body)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const update_profile = (body) =>
  POST(RESOURCE_URL, `/user/udpate`, body)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const upload_profile_image = (body) =>
  POST_WITH_MULTIPART(RESOURCE_URL, `/upload/profile/image`, body)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const change_password = (body, headers) =>
  POST(RESOURCE_URL, `/change/password`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const get_welcome_screen_data = (body, headers) =>
  POST(RESOURCE_URL, `/user/onboarding_data`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const update_name_and_options = (body, headers) =>
  PUT(RESOURCE_URL, `/user/udpate/name_options`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const create_reflection = (body, headers) =>
  POST(RESOURCE_URL, `/answer`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const update_reflection = (body, headers) =>
  PUT(RESOURCE_URL, `/answer`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const update_reminder = (body, headers) =>
  PUT(RESOURCE_URL, `/user/udpate/reminder`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const get_linkedin_access_token = (url, body, headers) =>
  POST_WITHOUT_DEFAULT_HEADER(url, ``, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const get_linkedin_profile = (url, headers) =>
  GET_WITHOUT_DEFAULT_HEADER(url, ``, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const create_reminder = (body, headers) =>
  POST(RESOURCE_URL, `/user/reminder`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const get_month_reflections = (body, headers) =>
  POST(RESOURCE_URL, `/user/reflections`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const get_reflection_via_date = (body, headers) =>
  POST(RESOURCE_URL, `/user/reflection`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const get_user_insights = (body, headers) =>
  POST(RESOURCE_URL, `/user/get/insights`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);


export const users_list = (body, headers = {}) =>
  POST(RESOURCE_URL, `/admin/users`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const delete_user = (uid, status, headers = {}) =>
  DELETE(RESOURCE_URL, `/admin/user/${uid}/${status}`, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const get_user_detail = (uid, headers = {}) =>
  GET(RESOURCE_URL, `/admin/user/${uid}`, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const create_blog = (body, headers = {}) =>
  POST(RESOURCE_URL, `/blog`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const get_blog_detail = (bid, headers = {}) =>
  GET(RESOURCE_URL, `/blog/${bid}`, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const edit_blog = (body, headers = {}) =>
  PUT(RESOURCE_URL, `/blog`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const blogs_list = (body, headers = {}) =>
  POST(RESOURCE_URL, `/blog/list`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const delete_blog = (uid, headers = {}) =>
  DELETE(RESOURCE_URL, `/blog/${uid}`, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const logout_user = (body, headers) =>
  POST(RESOURCE_URL, `/logout`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const get_dashboard_stats = (body, headers) =>
  POST(RESOURCE_URL, `/admin/stats`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const plans_list_api = (body, headers) =>
  GET(RESOURCE_URL, `/subscription`, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const create_plan_api = (body, headers) =>
  POST(RESOURCE_URL, `/subscription`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const update_plan_api = (body, headers) =>
  PUT(RESOURCE_URL, `/subscription`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const get_default_values_api = (body, headers) =>
  GET(RESOURCE_URL, `/default`, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const create_default_values_api = (body, headers) =>
  POST(RESOURCE_URL, `/default`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const matches_list = (body, headers = {}) =>
  POST(RESOURCE_URL, `/admin/matches`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const subscriptions_list = (body, headers = {}) =>
  POST(RESOURCE_URL, `/admin/subscriptions`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const subscription_refund = (body, headers = {}) =>
  POST(RESOURCE_URL, `/admin/subscription/refund`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const get_link_values_api = (body, headers) =>
  GET(RESOURCE_URL, `/link`, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const create_link_values_api = (body, headers) =>
  POST(RESOURCE_URL, `/link`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const report_reasons_list = (body, headers = {}) =>
  POST(RESOURCE_URL, `/report_reasons/list`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

export const send_email_api = (body, headers = {}) =>
  POST(RESOURCE_URL, `/default/email`, body, headers)
    .then((response) => response.json())
    .catch(Utils.handleError);

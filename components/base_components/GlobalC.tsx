import AORStorage from "../../apis/AORStorage";
import { system_header_state_to_props, system_state_to_props, updateSystemData } from "../../redux/system/Action";
import { PAGE_BLOGS, PAGE_DATA, PAGE_EMAIL, PAGE_HOME, PAGE_INSIGHTS, PAGE_LINKS, PAGE_MATCHES, PAGE_PLANS, PAGE_REPORT_REASON, PAGE_STATS, PAGE_SUBSCIRPTIONS, PAGE_USERS, SYSTEM_DATA_SELECTED_PAGE, NEWS } from "../../redux/Types";
import { useRouter } from "next/router";
import { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { user_session_login } from "../../redux/login/Action";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { Utils } from "../util";

function GlobalC() {
    console.log("Page ===> Global Component");

    const dispatch = useDispatch();
    const router: any = useRouter();

    useEffect(() => {

        const firebaseConfig = {
            apiKey: "AIzaSyDsfqOHToDDWPLCAdMUzTpULkleHhp6NrE",
            authDomain: "stagingpaper-96dfa.firebaseapp.com",
            projectId: "stagingpaper-96dfa",
            storageBucket: "stagingpaper-96dfa.appspot.com",
            messagingSenderId: "505328447333",
            appId: "1:505328447333:web:b9f15fef55f09b34433b8c",
            measurementId: "G-F1B26RD8TS"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const db = getFirestore(app);
        Utils.setFirestoreDb(db);

        const handleRouteChange = (url: any) => {
            if (typeof window.scrollTo === "function") window.scrollTo(0, 0);

            url = url ? url.replace("/", "") : "";
            if (url === "") {
                dispatch(updateSystemData({
                    [SYSTEM_DATA_SELECTED_PAGE]: PAGE_HOME
                }))
            } else if (url.includes("user")) {
                dispatch(updateSystemData({
                    [SYSTEM_DATA_SELECTED_PAGE]: PAGE_USERS
                }))
            } else if (url.includes("blog")) {
                dispatch(updateSystemData({
                    [SYSTEM_DATA_SELECTED_PAGE]: PAGE_BLOGS
                }))
            } else if (url.includes("plans")) {
                dispatch(updateSystemData({
                    [SYSTEM_DATA_SELECTED_PAGE]: PAGE_PLANS
                }))
            } else if (url.includes("data")) {
                dispatch(updateSystemData({
                    [SYSTEM_DATA_SELECTED_PAGE]: PAGE_DATA
                }))
            } else if (url.includes("matches")) {
                dispatch(updateSystemData({
                    [SYSTEM_DATA_SELECTED_PAGE]: PAGE_MATCHES
                }))
            } else if (url.includes("subscriptions")) {
                dispatch(updateSystemData({
                    [SYSTEM_DATA_SELECTED_PAGE]: PAGE_SUBSCIRPTIONS
                }))
            } else if (url.includes("report_reason")) {
                dispatch(updateSystemData({
                    [SYSTEM_DATA_SELECTED_PAGE]: PAGE_REPORT_REASON
                }))
            } else if (url.includes("links")) {
                dispatch(updateSystemData({
                    [SYSTEM_DATA_SELECTED_PAGE]: PAGE_LINKS
                }))
            } else if (url.includes("email")) {
                dispatch(updateSystemData({
                    [SYSTEM_DATA_SELECTED_PAGE]: PAGE_EMAIL
                }))
            } else if (url.includes("news")) {
                dispatch(updateSystemData({
                    [SYSTEM_DATA_SELECTED_PAGE]: NEWS
                }))
            }
        }

        router?.events?.on('routeChangeComplete', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router?.events?.off('routeChangeComplete', handleRouteChange)
        }
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const data = await AORStorage.getAORLoginRememberMe();
                dispatch(user_session_login());
            } catch (error) {
            }
        })();
    }, []);

    return (<></>)
}

export default memo(GlobalC);
import Utils from '../components/util/Utils';
import { AOR_LOGIN_DATA, STATUS, SUCCESS, ERROR, RESPONSE, AOR_LOGIN_REMEMBER_ME, AOR_LOGIN_DATA_EXPIRES_IN } from '../redux/Types';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export default class AORStorage {

    /** Store AOR Login data */
    static storeAORLoginData = async (data) => {
        try {
            await localStorage.setItem(AOR_LOGIN_DATA, JSON.stringify(data));

            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Store AOR Login Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }

    /** Get AOR Login data */
    static getAORLoginData = async (key) => {
        try {
            const data = await localStorage.getItem(AOR_LOGIN_DATA);
            const res = data && data.length ? JSON.parse(data) : {};

            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS,
                [RESPONSE]: res && key && res[key] ? res[key] : res
            }));
        } catch (e) {
            // error
            Utils.log("Get AOR Login Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR,
                [RESPONSE]: e
            }));
        }
    }

    /** Clear AOR Login data */
    static clearAORLoginData = async () => {
        try {
            await localStorage.removeItem(AOR_LOGIN_DATA);
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Remove AOR Login Data ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }

    /** Store AOR Login remember me */
    static storeAORLoginRememberMe = async (data, expires_in) => {
        try {
            expires_in = typeof expires_in === "number" ? expires_in : Utils.getDate(AOR_LOGIN_DATA_EXPIRES_IN);
            window.document.cookie = `${AOR_LOGIN_REMEMBER_ME}=${JSON.stringify(data)}; expires= ${expires_in}`
            // cookies.set(AOR_LOGIN_REMEMBER_ME, JSON.stringify(data), {
            //     expires: expires_in,
            //     httpOnly: true
            // });
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Store AOR Login remember me ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }

    /** Get AOR Login remember me */
    static getAORLoginRememberMe = async (key) => {
        try {
            const data = await cookies.get(AOR_LOGIN_REMEMBER_ME);
            const res = data && data ? data : {};

            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS,
                [RESPONSE]: res && key && res[key] ? res[key] : res
            }));
        } catch (e) {
            // error
            Utils.log("Get AOR Login remember me ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR,
                [RESPONSE]: e
            }));
        }
    }

    /** Clear AOR Login remember me */
    static clearAORLoginRememberMe = async () => {
        try {
            await cookies.remove(AOR_LOGIN_REMEMBER_ME);
            return new Promise(resolve => resolve({
                [STATUS]: SUCCESS
            }));
        } catch (e) {
            // error
            Utils.log("Remove AOR Login remember me ===> error ", e);

            return new Promise((resolve, rejects) => rejects({
                [STATUS]: ERROR
            }));
        }
    }
    
}
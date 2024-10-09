import { SERVER_FORBIDDEN } from '../../redux/Types';
import { Provider } from 'react-redux'
import { Store } from 'redux';
import { render as rtlRender, screen } from '@testing-library/react'
import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'node_modules/redux';
import { applyMiddleware } from 'node_modules/redux';
import ReduxThunk from 'redux-thunk'

let firestoreDB: any = undefined;

export default class Utils {

    static verifyResponse = (response: any) => new Promise((resolve, rejects) => response && response.ok ? resolve(response) : rejects(response))

    static handleError = (error: any) => {
        if (error && (error.status === 409)) {
            // ToastsStore.error("Not Authorized!");
            window.location.reload();
        }

        if (error && (error.status === 422 || error.status === 501 || error.status === 401 || error.status === 404 || error.status === 409 || error.status === 401 || error.status === 400 || error.status === 304 || error.status === 409 || error.status === 500)) return error.json();
        return error;
    }

    static log = (prefix: any, ...args: any) => {
        // if (__DEV__) {
        console.log(prefix, args);
        // }
    }

    static readURL = (file: any) => {
        return new Promise((resolve, reject) => {
            if (file) {
                try {
                    var reader = new FileReader();

                    reader.onload = function (e: any) {
                        resolve(e.target.result);
                    }

                    reader.readAsDataURL(file);
                } catch (error) {
                    resolve(null);
                }
            } else return resolve(null);
        })
    }

    static parseToken = (token: any) => `Bearer ${token}`;

    static getDate = (sec: number) => {
        const date = new Date();
        date.setSeconds(sec, 0);

        return date;
    }

    static scrollTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    static render = (
        ui: any,
        data?: any
    ) => {
        const makeStore = () => Store;
        const wrapper = createWrapper(makeStore);

        const Wrapper: any = ({ children }: any) => <Provider store={createStore(() => [], {} as any, applyMiddleware(ReduxThunk))}>{children}</Provider>;

        return rtlRender(ui, { wrapper: Wrapper, ...data });
    }

    static setFirestoreDb = (db: any) => {
        firestoreDB = db;
    }

    static getFirestoreDB = () => {
        return firestoreDB
    }
}
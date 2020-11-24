import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

/**
 * Login user using email/password
 * @param {String} email
 * @param {String} password
 * @returns {Promise<JSON>}
 */
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST,
            });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/users/login",
                { email, password },
                config,
            );

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.response,
            });
        }
    };
};

/**
 * User logout action
 * @returns {null}
 */
export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem("userInfo");
        dispatch({
            type: USER_LOGOUT,
        });
    };
};

/**
 * Register a new user
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @returns {Promise<JSON>}
 */
export const register = (name, email, password) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST,
            });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/users",
                { name, email, password },
                config,
            );

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.response,
            });
        }
    };
};

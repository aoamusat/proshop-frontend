import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
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

/**
 * Fetch User profile
 * @param {String} id
 * @returns {Promise<JSON>}
 */
export const getUserDetails = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: USER_DETAILS_REQUEST,
            });

            const { userInfo } = getState().userLogin;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`/api/users/${id}`, config);

            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.response,
            });
        }
    };
};

/**
 * Fetch User profile
 * @param {String} id
 * @returns {Promise<JSON>}
 */
export const updateUserProfile = (user) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: USER_UPDATE_REQUEST,
            });

            const { userInfo } = getState().userLogin;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                `/api/users/profile`,
                user,
                config,
            );

            dispatch({
                type: USER_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.response,
            });
        }
    };
};

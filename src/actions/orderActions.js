import axios from "axios";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ORDER_CREATE_REQUEST,
            });

            const { userInfo } = getState().userLogin;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(`/api/orders/`, order, config);

            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.response,
            });
        }
    };
};

export const getOrderDetails = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ORDER_DETAIL_REQUEST,
            });

            const { userInfo } = getState().userLogin;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`/api/orders/${id}`, config);

            dispatch({
                type: ORDER_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ORDER_DETAIL_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.response,
            });
        }
    };
};

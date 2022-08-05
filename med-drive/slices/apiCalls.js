import {loginFailure, loginStart, loginSuccess, logout} from "./userSlice";
import {publicRequest, userRequest} from "../requestMethods";
// import {addProduct} from "./cartRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("authentication/login", user);
        dispatch(loginSuccess(res.data));
        // const cart = await publicRequest.get("cart/user/" + res.data._id);
        // if (cart.data !== null) {
        //     for (let product of cart.data.products) {
        //         dispatch(addProduct(product));
        //     }
        // }
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const logoutCall = async (dispatch) => {
    try {
        dispatch(logout());
    } catch (err) {
        console.log(err);
    }

};


export const register = async (dispatch, user) => {
    try {
        const res = await publicRequest.post("authentication/register", user);
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};
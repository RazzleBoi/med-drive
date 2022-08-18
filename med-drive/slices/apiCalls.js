import {loginFailure, loginStart, loginSuccess, logout} from "./userSlice";
import {publicRequest, userRequest} from "../requestMethods";
// import {addProduct} from "./cartRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("authentication/login", user);
        dispatch(loginSuccess(res.data));
        return res.data;
    } catch (err) {
        dispatch(loginFailure());
        return null;
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
        login(dispatch, user);
        console.log(res);
    } catch (err) {
        console.log(err.message);
    }
};
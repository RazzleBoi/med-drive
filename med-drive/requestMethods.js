import axios from "axios";
import { useSelector } from "react-redux";
const BASE_URL = "http://localhost:8080/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const currentUser = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
// const TOKEN = currentUser ? currentUser.accessToken : null;
const TOKEN =  null;//useSelector((state) => state.user.currentUser);

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = (token) => {
    return axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${token}` },
})};
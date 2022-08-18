import axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;
export const BASE_URL = `http://${(typeof manifest.packagerOpts === 'object') && manifest.packagerOpts.dev
? manifest.debuggerHost.split(':').shift().concat(':8080'): `api.example.com`}/api/`
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
    headers: { token: `${token}` },
})};
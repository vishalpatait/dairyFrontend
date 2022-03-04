import axios from "axios";
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer
} from "axios-extensions";

const baseURL = "http://localhost:8080/";

const Api = axios.create({
  baseURL: baseURL,
  timeout: 180000,
  headers: { "Cache-Control": "no-cache" },
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
});

// function saveToken(accessToken) {
//   localStorage.setItem("accessToken", accessToken);
// }
// function destroyToken() {
//   localStorage.removeItem("accessToken");
// }
// function refresh() {
//   return new Promise((resolve, reject) => {
//     Api.post("/api/v1/refresh", {
//       refresh_token: localStorage.getItem("refresh_token"),
//     })
//       .then((response) => {
//         saveToken(response.data.accessToken, response.data.refresh_token);
//         return resolve(response.data.accessToken);
//       })
//       .catch((error) => {
//         destroyToken();
//         return reject(error);
//       });
//   });
// }

Api.interceptors.response.use(
  res => res,
  error => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      localStorage.removeItem("x-auth-token");
    }
    // status might be undefined
    // if (!status) {
    //   refresh();
    // }
    return Promise.reject(error);
  }
);

Api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem("x-auth-token");

  config.headers["x-access-token"] = accessToken;

  return config;
});

export { Api };

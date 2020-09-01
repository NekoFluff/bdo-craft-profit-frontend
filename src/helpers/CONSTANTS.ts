export const GOOGLE_OAUTH_CLIENT_ID =
  "714430909981-lqfhr7q7a0960uqbkd62pbdccv9956d1.apps.googleusercontent.com";
//910044004110-57c6p6scva4cj70vp3810uco553fq4a3.apps.googleusercontent.com
export const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://bdocraftprofit-api.herokuapp.com/api"
    : "http://localhost:5000/api";
console.log("API ENDPOINT:", API_ENDPOINT);

export const USER_ENDPOINT = API_ENDPOINT + "/user";
export const LOGIN_ENDPOINT = USER_ENDPOINT + "/login";
export const SIGN_UP_ENDPOINT = USER_ENDPOINT + "/signup";

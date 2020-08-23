export const API_ENDPOINT = process.env.NODE_ENV === 'production' ? "https://bdocraftprofit-api.herokuapp.com/api" : "http://localhost:5000/api"
console.log("API ENDPOINT:", API_ENDPOINT)

export const USERS_ENDPOINT = API_ENDPOINT + '/users'
export const LOGIN_ENDPOINT = USERS_ENDPOINT + '/login'
export const SIGN_UP_ENDPOING = USERS_ENDPOINT + '/signup'

export let API_ENDPOINT = process.env.NODE_ENV === 'production' ? "https://bdocraftprofit-api.herokuapp.com/api" : "localhost:5000/api"
console.log("API ENDPOINT:", API_ENDPOINT)
// import axios from "axios";

// const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_KEY;
// const NYT_API_KEY = process.env.REACT_APP_NYT_KEY;
// const NEWS_API = process.env.REACT_APP_NEWS_API;

// const NEWS_API_BASE_URL = `https://newsapi.org/v2/everything?apiKey=${NEWS_API}`

// export const fetchFromNewsApi = (search:string)=>{
//   const requestWithSearch = encodeURI(`${NEWS_API_BASE_URL}&q=${search}`)
//   const response = axios.get(requestWithSearch);

// }

// export default NEWS_API_BASE_URL;

export * from "./news"

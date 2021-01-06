import axios from "axios";

export default axios.create({
  // Or use the deployed baseURL https://address-book-api-2021.herokuapp.com/api
  baseURL: "http://localhost:9000/api",
  headers: {
    "Content-type": "application/json"
  }
});

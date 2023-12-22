import axios from "axios";
//npm i axios
// axios make sign in using backend data
export default axios.create({
  baseURL: "http://localhost:3500",
});

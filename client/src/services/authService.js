import axios from "axios";

const setToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
export default setToken;

//Mosh's implementation
// //const tokenKey = "token";
// //To avoid Bi-directional dependencies with auth module, declare a function
// export default function setToken(jwt) {
//   //Configuring default headers
//   //whenever axios tries to send a http request, make sure to include this header in the req.
//   if (jwt) axios.defaults.headers.common["x-auth-token"] = jwt;
//   delete axios.defaults.headers.common["x-auth-token"];
// }

// // setToken(getJwt());

// // function getJwt() {
// //   localStorage.getItem(tokenKey);
// // }

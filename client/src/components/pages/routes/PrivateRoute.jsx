import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../../context/authContext/authContext";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userAuth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        !userAuth ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

// const PrivateRoute = ({ component: Component }) => {
//   const { userAuth } = useContext(AuthContext);
//   return (
//     <Route>
//       {/* {...rest} */}
//       render =
//       {props =>
//         !userAuth ? <Redirect to="/login" /> : <Component {...props} />
//       }
//     </Route>
//   );
// };

export default PrivateRoute;

//Mosh's Implementation

// const ProtectedRoute = ({ path, component: Component, render }) => {
//     //Here we will simply return a route component.
//     //Whereever we use a Protected Route component,
//     //Output of that component will be a standard Route component in React Router.
//     return (
//       <Route>
//         path={path}
//         {/* with{...rest} we can simply add any additional property here. */}
//         render =
//         {props => {
//           //console.log(props);
//           if (!auth.getCurrentUser())
//             return (
//               <Redirect
//                 to={{ pathname: "/login", state: { from: props.location } }}
//               />
//             );
//           return Component ? <Component {...props} /> : render(props);
//         }}
//       </Route>
//     );

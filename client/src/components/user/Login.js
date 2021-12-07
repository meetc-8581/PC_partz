import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  async function login(e) {
    e.preventDefault();
    console.log("login exec");
    try {
      const loginData = {
        email,
        password,
      };

      const res = await axios.post("http://localhost:3000/login", loginData, {
        withCredentials: true,
      });
      console.log(res.headers);
      await getLoggedIn();
      history("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container  mt-5 position-relative text-center">
      <div className="page-title m-auto" style={{ maxWidth: "1000px" }}>
        <h2>Welcome back!</h2>
        <h4>Log in to your account.</h4>
      </div>
      <form onSubmit={login} className="w-25 m-auto mt-4 fs-4">
        <div className="form text-start">
          <div className="mb-3">
            <label htmlFor="username" class="form-label">
              Username
            </label>
            <input
              class="form-control"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary btn-lg">
            Login
          </button>
        </div>
      </form>
      <div className="page-title mt-5">
        Forgot password?
        <a style={{ textDecoration: "underline", color: "blue" }} href="/login">
          Reset
        </a>
        <br></br>
        Don't have an account?
        <a
          style={{ textDecoration: "underline", color: "blue" }}
          href="/register"
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Login;

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// //import axios from "axios";
// import AuthContext from "../../context/AuthContext";
// import "./Login.css";
// import { Formik } from "formik";
// //import * as EmailValidator from "email-ValidationError";
// import * as Yup from "yup";

// const Login = () => (
//   <Formik
//     initialValues={{ email: "", password: "" }}
//     onSubmit={(values, { setSubmitting }) => {
//       setTimeout(() => {
//         console.log("Logging in", values);
//         setSubmitting(false);
//       }, 500);
//     }}
//     validationSchema={Yup.object().shape({
//       email: Yup.string().email().required("Required"),
//       password: Yup.string()
//         .required("No password provided.")
//         .min(8, "Password is too short - should be 8 chars minimum.")
//         .matches(/(?=.*[0-9])/, "Password must contain a number."),
//     })}
//   >
//     {(props) => {
//       const {
//         values,
//         touched,
//         errors,
//         isSubmitting,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//       } = props;
//       return (
//         <div className="container  mt-5 position-relative text-center">
//           <div className="page-title m-auto" style={{ maxWidth: "1000px" }}>
//             <h2>Welcome back!</h2>
//             <h4>Log in to your account.</h4>
//           </div>
//           <form onSubmit={handleSubmit} className="m-auto w-50  mt-4 fs-4">
//             <div className="form text-start">
//               <div className="mb-3">
//                 <label htmlFor="email" class="form-label">
//                   Email
//                 </label>
//                 <input
//                   name="email"
//                   type="text"
//                   placeholder="Enter your email"
//                   value={values.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   class="form-control"
//                   className={errors.email && touched.email && "error"}
//                 />
//                 {errors.email && touched.email && (
//                   <div className="input-feedback fs-4">{errors.email}</div>
//                 )}
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="email" class="form-label">
//                   Password
//                 </label>
//                 <input
//                   name="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   value={values.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   class="form-control"
//                   className={errors.password && touched.password && "error"}
//                 />
//                 {errors.password && touched.password && (
//                   <div className="input-feedback fs-4">{errors.password}</div>
//                 )}
//               </div>
//               <div className="mb-3 text-center">
//                 <button
//                   className="btn btn-primary btn-lg"
//                   type="submit"
//                   disabled={isSubmitting}
//                 >
//                   Login
//                 </button>
//               </div>
//             </div>
//           </form>
//           <div className="page-title mt-5">
//             Forgot password?
//             <a
//               style={{ textDecoration: "underline", color: "blue" }}
//               href="/login"
//             >
//               Reset
//             </a>
//             <br></br>
//             Don't have an account?
//             <a
//               style={{ textDecoration: "underline", color: "blue" }}
//               href="/register"
//             >
//               Sign up
//             </a>
//           </div>
//         </div>
//       );
//     }}
//   </Formik>
// );

// export default Login;

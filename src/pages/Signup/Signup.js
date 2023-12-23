import { Link, useNavigate } from "react-router-dom";
import "./signup.scss";
import { useRef } from "react";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../localStorageManager";
import { setSpinner, showToast } from "../../redux/slices/appConfigSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  googleLogout,
} from "@react-oauth/google";
import { TOAST_FAILURE } from "../../App";

function Signup() {
  const email = useRef("");
  const name = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        !email.current.value.includes("@") ||
        email.current.value.length < 5 ||
        !email.current.value.includes(".") ||
        email.current.value.includes("@.")
      ) {
        dispatch(
          showToast({
            type: TOAST_FAILURE,
            message: { message: "Valid email required" },
          })
        );
        return;
      }
      dispatch(setSpinner(false));

      const response = await axiosClient.post("/auth/signup", {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      });

      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
   
      navigate("/profile/update");
      window.location.reload(false);
    } catch (error) {
      
    } finally {
      dispatch(setSpinner(false));
    }
  }

  async function handleGoogleSucceed(e) {
    try {
      const decode = jwtDecode(e.credential);

      const response = await axiosClient.post("/auth/googlesignup", {
        email: decode.email,
        name: decode.name,
      });
      

      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);

      navigate("/profile/update");
    } catch (e) {
      
    }
  }

  return (
    <div className="center" id="signup">
      <div className="content flexcol">
        <div className="top">
          <h2 className="text-white text-3xl sm:text-4xl font-bold">Sign up</h2>
        </div>

        <form
          onKeyUp={(e) => (e.key === "Enter" ? handleSubmit() : undefined)}
          className="mid flexcol"
        >
          <div id="name">
            <input
              autoFocus
              maxLength={14}
              ref={name}
              autoComplete="off"
              placeholder="Name"
              type="text"
              autoCapitalize="on"
              id=""
            />
          </div>

          <div id="email">
            <input
              ref={email}
              autoComplete="off"
              placeholder="E-mail"
              type="email"
              id="input-email"
              required
            />
          </div>

          <div id="password">
            <input
              ref={password}
              autoComplete="off"
              placeholder="Password"
              type="password"
              id="input-password"
            />
          </div>

          <div onClick={handleSubmit} className="btn btn-login">
            <button id="submit">Signup</button>
          </div>
        </form>
        <div className=" flex justify-center">
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            scope="profile email"
          >
            <GoogleLogin
              onSuccess={handleGoogleSucceed}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </GoogleOAuthProvider>
        </div>
        <div className="bottom">
          <span>
            Already a member? <Link to={"/login"}>Login</Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;

import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { axiosClient } from "../../utils/axiosClient";
import { useState } from "react";
import { KEY_ACCESS_TOKEN, setItem } from "../../localStorageManager";
import { useDispatch } from "react-redux";
import { setSpinner, showToast } from "../../redux/slices/appConfigSlice";
import {jwtDecode} from 'jwt-decode'
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { TOAST_FAILURE } from "../../App";
import Footer from "../../components/footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
        if(!email.includes('@') || email.length<5 || !email.includes(".") || email.includes("@.")){
            dispatch(showToast({
                type: TOAST_FAILURE,
                message:{message:"Valid email required"}
            }))
            return
          }
      dispatch(setSpinner(true));
      const response = await axiosClient.post("/auth/login", {
        email: email,
        password: password,
      });

      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/");
    } catch (error) {
      return Promise.reject(error);
    } finally {
      dispatch(setSpinner(false));
    }
  }

  async function handleGoogleSucceed(e) {
    try {
      
        const decode = jwtDecode(e.credential)
       
       
        const response = await axiosClient.post("/auth/googlesignup", {
            email: decode.email,
            name: decode.name,
      
          });

          setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
          navigate("/profile/update");
    
        
    } catch (e) {
      console.log(e);
        
    }
  }
  return (
    <div className="center" id="login">
      <div className="content flexcol">
        <div className="top">
          <h2 className="text-white text-3xl sm:text-4xl font-bold ">Login</h2>
        </div>

        <form
          onKeyUp={(e) => (e.key === "Enter" ? handleSubmit() : null)}
          className="mid flexcol"
        >
          <div id="email">
            <input
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              placeholder="E-mail"
              type="email"
              required
              id="input-email"
            />
          </div>

          <div id="password">
            <label htmlFor="input-password"></label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              placeholder="Password"
              type="password"
              id="input-password"
            />
          </div>

          <div onClick={handleSubmit} className="btn btn-login">
            <button type="submit" id="submit">Login</button>
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
            Not a member? <Link to={"/signup"}>SignUp</Link>{" "}
          </span>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;

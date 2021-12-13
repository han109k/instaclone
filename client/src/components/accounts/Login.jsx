import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/InstantProvider";
import ApiCaller from "../api/ApiCaller";
// Components
import Footer from "../Footer";
// Resources
import Logo from "../imgs/insramtag.svg";
import appstoreImg from "../imgs/appstore.png";
import playstoreImg from "../imgs/playstore.png";

function Login() {
  const { dispatch } = useGlobalContext();
  const [message, setMessage] = useState('');
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { ...inputs };

    ApiCaller.post("/accounts/login", body)
      .then((res) => {
        console.log(res);
        if (res.status === 200) dispatch({ type: "AUTH", isAuth: true, user: res.data.user });
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setMessage(error.response.data.message);
      });
  };

  const handleRegister = () => {
    navigate("/accounts/register");
  };

  return (
    <>
      <article className="relative flex flex-row flex-wrap content-center justify-center min-h-screen">
        <div className="flex flex-col">
          <div className="md:border-2 md:bg-white border-gray-200 px-5 pt-5 pb-10">
            <img src={Logo} width="175px" alt="logo" className="mx-auto mb-5" />
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                placeholder="Email"
                className="mb-2 text-xs bg-gray-50 rounded-sm border-gray-300"
              />
              <input
                type="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                placeholder="Password"
                className="mb-2 text-xs bg-gray-50 rounded-sm border-gray-300"
              />
              <button className="btn-fblue mt-1">Sign Up</button>
            </form>
            {/* Error Message */}
            <p className="text-red-500 text-xs font-normal pt-6 text-center">{message}</p>
            <p className="text-blue-900 text-xs font-normal mt-2 text-center">
              Forgot password?
            </p>
          </div>
          {/* Direct to log in page */}
          <div className="md:bg-white md:border-2 text-sm text-center font-normal py-5 mt-3">
            <p>
              Don't have an account?
              <button
                className="text-blue-450 font-bold ml-2"
                onClick={handleRegister}
              >
                Sign up
              </button>
            </p>
          </div>
          {/* App links */}
          <div className="text-sm text-center font-normal py-5">
            <p>Get the app</p>
            <div className="flex flex-row justify-center mt-5 gap-2">
              <img src={playstoreImg} alt="playstore" width="136px" />
              <img src={appstoreImg} alt="appstores" width="136px" />
            </div>
          </div>
        </div>
      </article>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Login;

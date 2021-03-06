import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/InstantProvider";
import ApiCaller from "../api/ApiCaller";
// Components
import Footer from "../Footer";
// Resources
import Logo from "../imgs/insramtag.svg";
import registerImg from "../imgs/register.png";
import appstoreImg from "../imgs/appstore.png";
import playstoreImg from "../imgs/playstore.png";

function Register() {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState('');

  // const { email, password, fullname, password } = inputs;

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { ...inputs };

    ApiCaller.post("/accounts/register", body)
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) dispatch({ type: "AUTH", payload: true });
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrorMsg(error.response.data.message);
        dispatch({ type: "AUTH", payload: false });
      });
  };

  const handleLogIn = () => {
    navigate("/accounts/login");
  };

  return (
    <>
      <article className="relative flex flex-row flex-wrap content-center justify-center min-h-screen">
        <div className="mt-10">
          <img
            src={registerImg}
            width="386px"
            alt="signup"
            className="hidden lg:block"
          />
        </div>
        <div className="flex flex-col max-w-xs max-h-full mt-5 md:ml-5">
          <div className="md:border-2 md:bg-white border-gray-200 px-10 py-5">
            <img src={Logo} width="175px" alt="logo" className="mx-auto mb-5" />
            <p className="text-gray-500 font-bold text-center mb-5">
              Sign up to see photos from your friends.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                placeholder="Email"
                className="mb-2 text-xs bg-gray-50 rounded-sm border-gray-300"
                required
              />
              <input
                type="text"
                value={inputs.fullname}
                onChange={(e) =>
                  setInputs({ ...inputs, fullname: e.target.value })
                }
                placeholder="Full Name"
                className="mb-2 text-xs bg-gray-50 rounded-sm border-gray-300"
                required
              />
              <input
                type="text"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                placeholder="Username"
                className="mb-2 text-gray-700 text-xs bg-gray-50 rounded-sm border-gray-300"
                required
              />
              <input
                type="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                placeholder="Password"
                className="mb-2 text-xs bg-gray-50 rounded-sm border-gray-300"
                required
              />
              <button className="btn-fblue mt-1">Sign Up</button>
            </form>
            <p className="text-gray-400 text-xs font-normal mt-3 text-center">
              By signing up, you agree to our <b>Terms, Data Policy</b> and{" "}
              <b>Cookie Policy</b>.
            </p>
            <p className="text-red-500 text-xs font-bold mt-3 text-center">
              {errorMsg}
            </p>
          </div>
          {/* Direct to log in page */}
          <div className="md:bg-white md:border-2 text-sm text-center font-normal py-5 mt-3">
            <p>
              Have an account?{" "}
              <button className="text-blue-450" onClick={handleLogIn}>
                {" "}
                Log in{" "}
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

export default Register;

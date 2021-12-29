import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import ShareVideo from "../assets/share.mp4";
import Logo from "../assets/logowhite.png";
import client from "../client";

const Login = () => {
  const navigate = useNavigate();
  const responceGoogle = (responce) => {
    localStorage.setItem("user", JSON.stringify(responce.profileObj));

    const { name, googleId, imageUrl } = responce.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });

    // console.log(responce);
  };

  return (
    <div className=" flex justify-start items-center flex-col h-screen ">
      <div className="relative w-full h-full">
        <video
          src={ShareVideo}
          autoPlay
          type="video/mp4"
          loop
          controls={false}
          muted={true}
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center right-0 top-0 left-0 bottom-0  bg-gradient-to-r from-stone-800 ">
          <div className="p-5">
            <img src={Logo} width="130px" alt="Logo" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_AUTH_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-slate-200 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" />
                  Sign In With Google
                </button>
              )}
              onSuccess={responceGoogle}
              onFailure={responceGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

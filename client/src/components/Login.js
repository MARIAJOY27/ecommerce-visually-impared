import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
require('dotenv').config({ path: '.env.development' });


const GoogleSignIn = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response);
    if (response.accessToken) {
      // User is logged in
      navigate('/checkout');
    } else {
      // Handle login failure or other scenarios
      // You can display an error message or perform any other desired actions
    }
  };

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleSignIn;

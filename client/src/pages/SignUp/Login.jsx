import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../util/constant';
import annyang from 'annyang';
import { BsMicFill } from 'react-icons/bs';
import './style.css';

const SignUp = () => {
  const [msg, setMsg] = useState('');
  const [recognizedText, setRecognizedText] = useState('');
  const { setUser } = useContext(AuthContext);
  const submitRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!annyang) {
      console.log('Speech recognition is not supported in your browser.');
    } else {
      const commands = {
        'username is *username': (username) => {
          const usernameInput = document.getElementById('exampleUsername');
          if (usernameInput) {
            const trimmedUsername = username.trim().replace(/\.$/, '');
            usernameInput.value = trimmedUsername;
          }
        },
        'password is *password': (password) => {
          const passwordInput = document.getElementById('examplePassword');
          if (passwordInput) {
            const trimmedPassword = password.trim().replace(/\.$/, '');
            passwordInput.value = trimmedPassword;
          }
        },
        login: () => {
          const form = document.getElementById('loginForm');
          if (form) {
            setRecognizedText('Login');
            submitRef.current.disabled = false; // Enable the button
          }
        },
      };

      annyang.addCommands(commands);
      annyang.start();

      return () => {
        annyang.removeCommands(Object.keys(commands));
        annyang.abort();
      };
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');

    const username = e.target.elements.exampleUsername.value;
    const password = e.target.elements.examplePassword.value;

    if (username.trim() === '' || password.trim() === '') {
      return alert('Please provide credentials.');
    }

    submitRef.current.disabled = true;
    submitRef.current.innerHTML = 'Please wait...';

    try {
      let res = await axios.post(`${BASE_URL}/login`, { username, password });
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      navigate('/', { replace: true });
    } catch (err) {
      setMsg(err.response.data.message);
      submitRef.current.disabled = false;
      submitRef.current.innerHTML = 'Login';
      e.target.reset();
    }
  };

  return (
    <div className="form-container">
      <form id="loginForm" onSubmit={handleLogin}>
        <h1>Login Here</h1>
        <div className="input-controls-signup-login">
          <label>Username</label>
          <input id="exampleUsername" type="text" required />
        </div>
        <div className="input-controls-signup-login">
          <label>Password</label>
          <input id="examplePassword" type="password" required />
        </div>
        <p className="error-message">{msg}</p>
        <div className="input-controls-signup-login">
          <button ref={submitRef} >Login</button> {/* Button initially disabled */}
        </div>
        <p className="signup-login-link">
          New User? <Link to="/signup">Sign up</Link>
        </p>
      </form>
      <div className="microphone-container">
        <BsMicFill
          className="microphone-icon"
          onClick={() => annyang.trigger('login')}
        />
      </div>
      {/* Display the recognized text on the screen
      {recognizedText && <p>Recognized Text: {recognizedText}</p>} */}
    </div>
  );
};

export default SignUp;
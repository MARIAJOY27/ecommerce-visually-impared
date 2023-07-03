import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../util/constant';
import './style.css';
import { BsMicFill } from 'react-icons/bs';
import annyang from 'annyang';

const SignUp = () => {
  const [msg, setMsg] = useState('');
  const { setUser } = useContext(AuthContext);
  const submitRef = useRef();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMsg('');

    const username = e.target.elements[0].value.replace('.', ''); // Remove '.' from the end
    const password = e.target.elements[1].value.replace('.', ''); // Remove '.' from the end

    if (username.trim() === '' || password.trim() === '') {
      return alert('Provide credentials');
    }

    submitRef.current.disabled = true;
    submitRef.current.innerHTML = 'Please wait...';

    try {
      submitRef.current.disabled = true;
      submitRef.current.innerHTML = 'Please wait...';

      let res = await axios.post(`${BASE_URL}/signup`, { username, password });
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      navigate('/', { replace: true });
    } catch (err) {
      setMsg(err.response.data.message);
      submitRef.current.disabled = false;
      submitRef.current.innerHTML = 'Sign Up';
      e.target.reset();
    }
  };

  const handleVoiceCommand = (field, value) => {
    const inputField = document.querySelector(`input[name=${field}]`);
    if (inputField) {
      inputField.value = value.replace('.', ''); // Remove '.' from the end
    }
  };

  useEffect(() => {
    const commands = {
      'username is *name': (name) => {
        handleVoiceCommand('username', name);
      },
      'password is *password': (password) => {
        handleVoiceCommand('password', password);
      },
    };

    annyang.addCommands(commands);
    annyang.start(); // Initialize Annyang

    return () => {
      annyang.removeCommands(Object.keys(commands));
      annyang.abort();
    };
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={handleSignUp}>
        <h1>Create New Account</h1>
        <div className="input-controls-signup-login">
          <label>Username</label>
          <input type="text" name="username" required />
        </div>
        <div className="input-controls-signup-login">
          <label>Password</label>
          <input type="password" name="password" required />
        </div>
        <p className="error-message">{msg}</p>
        <div className="input-controls-signup-login">
          <button ref={submitRef}>Sign Up</button>
        </div>
        <p className="signup-login-link">
          Already a user? <Link to="/login">Login</Link>
        </p>
      </form>
      <div className="microphone-container">
        <BsMicFill
          className="microphone-icon"
          onClick={() => annyang.trigger('login')}
        />
      </div>
    </div>
  );
};

export default SignUp;
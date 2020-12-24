import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AuthForm from './sub/AuthForm';
import '../../styles/home.scss';

function Login({ setIsAuth }) {
  const authURL = process.env.AUTH;
  const [showReg, setShowReg] = useState(false);

  function clickHandler() {
    setShowReg(!showReg);
  }

  return (
    <div className="login-page">
      <h3>Service Login</h3>
      {showReg && (
        <>
          <div className="login-container">
            <div className="container">
              <h1>Register</h1>
              <AuthForm id="Register" setIsAuth={setIsAuth} url={`/api/auth/register`} />
            </div>
          </div>
          <div className="sm-container">
            <p>
              Already registered?
              <span onClick={clickHandler}>Login here.</span>
            </p>
          </div>
        </>
      )}
      {!showReg && (
        <>
          <div className="login-container">
            <div className="container">
              <h1>Login</h1>
              <AuthForm id="Login" setIsAuth={setIsAuth} url={`/api/auth/login`} />
            </div>
          </div>
          <div className="sm-container">
            <p>
              Don't have an account?
              <span onClick={clickHandler}>Register here.</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

Login.propTypes = {
  setIsAuth: PropTypes.func,
};

export default Login;

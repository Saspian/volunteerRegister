import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Noty from 'noty';

const Login = () => {
  const [users, setUsers] = useState([]);

  //Notifications
  const showNotification = () => {
    new Noty({
      type: 'success',
      theme: 'mint',
      layout: 'topCenter',
      text: 'Login successfull',
      buttons: [
        Noty.button('Ok', 'btn btn-success btn-block', () => {
          window.location = '/welcome';
        })
      ]
    }).show();
  };
  const showEmailError = () => {
    new Noty({
      type: 'error',
      theme: 'mint',
      layout: 'topCenter',
      text: 'Email does not exist',
      timeout: 2000
    }).show();
  };
  const showPwdError = () => {
    new Noty({
      type: 'error',
      theme: 'mint',
      layout: 'topCenter',
      text: 'Invalid password',
      timeout: 2000
    }).show();
  };

  const changeHandler = e => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };
  const checkuser = e => {
    e.preventDefault();
    axios
      .post('http://192.168.1.69:3001/api/user/login', users)
      .then(response => {
        console.log(response);
        console.log(users);
        showNotification();
      })
      .catch(error => {
        if (error.response.data.emailStatus) {
          console.log(error.response.data.emailStatus);
          showEmailError();
        }
        if (error.response.data.pwdStatus) {
          console.log(error.response.data.pwdStatus);
          showPwdError();
        }
      });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <h1>Login</h1>
        </div>
        <div className="login-btn">
          <Link to="/signup">
            <button className="btn btn-primary btn-sm">Sign Up</button>
          </Link>
        </div>
      </div>
      <hr />
      <form className="login-form" onSubmit={checkuser}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={changeHandler}
            required="required"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            className="form-control"
            required="required"
          />
        </div>
        <div className="form-group">
          <span className="errors"></span>
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

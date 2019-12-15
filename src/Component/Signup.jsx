import React, { useState } from 'react';
import axios from 'axios';
import Noty from 'noty';
import { Link } from 'react-router-dom';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';

//user state
const SignupForm = () => {
  const [volunteers, setVolunteers] = useState({
    name: '',
    contact: '',
    role: '',
    email: '',
    password: '',
    repassword: ''
  });

  //notifications
  const showNotification = () => {
    new Noty({
      type: 'success',
      theme: 'mint',
      layout: 'topCenter',
      text: 'Added successfull',
      buttons: [
        Noty.button('Ok', 'btn btn-success btn-block', () => {
          window.location = '/signup';
        })
      ]
    }).show();
  };
  const showEmailError = () => {
    new Noty({
      type: 'error',
      theme: 'mint',
      layout: 'topCenter',
      text: 'Email already exist',
      timeout: 2000
    }).show();
  };
  const passwordError = () => {
    new Noty({
      type: 'error',
      theme: 'mint',
      layout: 'topCenter',
      text: 'password doesnt match',
      timeout: 2000
    }).show();
  };
  const phnError = () => {
    new Noty({
      type: 'error',
      theme: 'mint',
      layout: 'topCenter',
      text: 'Contact number should be 10 digit long',
      timeout: 2000
    }).show();
  };
  const startNum = () => {
    new Noty({
      type: 'error',
      theme: 'mint',
      layout: 'topCenter',
      text: 'Number should begin with 98..',
      timeout: 2000
    }).show();
  };
  const phoneExist = () => {
    new Noty({
      type: 'error',
      theme: 'mint',
      layout: 'topCenter',
      text: 'Phone number already exist',
      timeout: 2000
    }).show();
  };

  //onChange
  const changeHandler = e => {
    setVolunteers({ ...volunteers, [e.target.name]: e.target.value });
  };

  //adding user
  const addVolunteer = e => {
    e.preventDefault();
    console.log(volunteers);
    axios
      .post('http://192.168.1.69:3001/api/user/register', volunteers)
      .then(response => {
        console.log(response);
        showNotification();
      })
      .catch(error => {
        if (error.response.data.emailError) {
          showEmailError();
        }
        if (error.response.data.phoneStatus) {
          phnError();
        }
        if (error.response.data.phoneNum) {
          startNum();
        }
        if (error.response.data.phoneError) {
          phoneExist();
        }
        if (error.response.data.pwdError) {
          passwordError();
        }
      });
  };
  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <h1>Sign up</h1>{' '}
        </div>
        <div className="login-btn">
          <Link to="/login">
            <button className="btn btn-primary btn-sm btn-login">Login</button>
          </Link>
        </div>
      </div>

      <hr />
      <form onSubmit={addVolunteer}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={changeHandler}
            required="required"
          />
        </div>
        <div className="form-group">
          <label>Contact number</label>
          <input
            type="number"
            name="contact"
            id="phnum"
            className="form-control"
            placeholder="98XXXXXXXX"
            onChange={changeHandler}
            required="required"
          />
        </div>
        <div className="form-group">
          <label>You are</label>
          <select name="role" className="form-control" onChange={changeHandler}>
            <option value="-1">--select role---</option>
            <option value="volunteer" defaultValue="default">
              Volunteers
            </option>
            <option value="gm">General member</option>
            <option value="executive">Executive member</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={changeHandler}
            required="required"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={changeHandler}
            required="required"
          />
        </div>
        <div className="form-group">
          <label>Repeat Password</label>
          <input
            type="password"
            name="repassword"
            className="form-control"
            onChange={changeHandler}
            required="required"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignupForm;

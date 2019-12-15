import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <h1>Volunteers registration</h1>
        </div>
        <div className="login-btn">
          <Link to="/signup">
            <button className="btn btn-primary btn-sm">Sign Up</button>
          </Link>
          &nbsp; &nbsp;
          <Link to="/login">
            <button className="btn btn-primary btn-sm btn-login">Login</button>
          </Link>
        </div>
      </div>
      <hr />
      <h3> About </h3>
      <p>
        This application was build sole purpose of Attandance of Volunteers
        through out the major event of PrimeIT Club. User, in this case
        volunteers, can sign up and Attandance daily. Application will then
        record your check in time as well as check out time. Admin can view the
        daily attance plus other features provided. <br />
        <i>Sign up if you are new, Login for Attandance</i>
      </p>
    </div>
  );
};
export default Home;

import React from 'react';

const Welcome = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <h1>Welcome</h1>
        </div>
        <div className="login-btn">
          <button className="btn btn-primary btn-sm">Profile</button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Welcome;

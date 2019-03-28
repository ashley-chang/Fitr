import React from 'react';
import { Link } from 'react-router-dom';

/*
  TODO:
    - If user is already logged in, provide sign out link & link to dashboard
*/

const PublicHome = (props) => {
  return (
    <Link to="/login">Login</Link>
  );
}

export default PublicHome;

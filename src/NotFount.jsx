/* eslint-disable no-unused-vars */
// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404 - Page Not Found</h1>
      <p style={paragraphStyle}>
        Sorry, the page you are looking for does not exist. You can always go back to the <Link to="/" style={linkStyle}>homepage</Link>.
      </p>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  textAlign: 'center',
  backgroundColor: '#f8f8f8',
  color: '#333',
};

const headingStyle = {
  fontSize: '3rem',
  marginBottom: '1rem',
};

const paragraphStyle = {
  fontSize: '1.5rem',
};

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none',
};

export default NotFound;

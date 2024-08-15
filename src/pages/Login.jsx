/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Login_User } from '../Redux/features/loginUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from './Chat_Container';

export const LoginForm = () => {
  // Initialize the useForm hook

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm();

  const navigate = useNavigate();

  const LoggedIn = useSelector((state)=>state.loggedInUser.userLogin);

  useEffect(()=>{
    if(LoggedIn?.length > 0)
      navigate('/');
  },[LoggedIn])

  // Define the onSubmit function
  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(Login_User(data));
    reset();
    // Handle form submission, e.g., send data to an API
  };

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <h2 style={headingStyle}>Login</h2>
      
      {/* Email Field */}
      <div style={inputGroupStyle}>
        <label htmlFor="email" style={labelStyle}>Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          style={inputStyle}
        />
        {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
      </div>

      {/* Username Field */}
      <div style={inputGroupStyle}>
        <label htmlFor="username" style={labelStyle}>Username</label>
        <input
          id="username"
          type="text"
          {...register('username', { required: 'Username is required' })}
          style={inputStyle}
        />
        {errors.username && <span style={errorStyle}>{errors.username.message}</span>}
      </div>

      {/* Password Field */}
      <div style={inputGroupStyle}>
        <label htmlFor="password" style={labelStyle}>Password</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          style={inputStyle}
        />
        {errors.password && <span style={errorStyle}>{errors.password.message}</span>}
      </div>

      {/* Submit Button */}
      <button type="submit" style={buttonStyle}>Login</button>
      <a href='/signup' style={{color:'blue',paddingTop:'10px'}}>Do not have account</a>
    </form>
  </div>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '400px',
  margin:'5% auto',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
  marginBottom: '20px',
  color: '#333',
};

const inputGroupStyle = {
  width: '100%',
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
  color: '#555',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #ddd',
};

const errorStyle = {
  color: 'red',
  fontSize: '14px',
  marginTop: '5px',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

/* eslint-disable no-unused-vars */
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { User_Register } from '../Redux/features/loginUser';

const Signup = () => {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm();

  // fullName,email,username,password,gender

  // Define the onSubmit function
  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(User_Register(data));
    reset();
    // Handle form submission, e.g., send data to an API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <h2 style={headingStyle}>Sign up</h2>
      
      {/* FullName Field */}
      <div style={inputGroupStyle}>
        <label htmlFor="name" style={labelStyle}>Full Name</label>
        <input
          id="fullname"
          type="text"
          {...register('fullName', { required: 'Full name is required' })}
          style={inputStyle}
        />
        {errors.fullName && <span style={errorStyle}>{errors.fullName.message}</span>}
      </div>


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

      {/* Gender Field */}
      <div style={inputGroupStyle}
      >
        <label htmlFor="gender" style={labelStyle}>Gender</label> 
        <div style={{display:'flex',gap:'10'}}>
        <p>Male</p>
        <input
          id="gender"
          name='gender'
          type="radio"
          style={inputStyle}
          value={'male'}
          {...register('gender', { required: 'gender is required' })}

        />

        <p>Female</p>
        <input
          id="gender"
          name='gender'
          type="radio"
          style={inputStyle}
          value={'female'}
          {...register('gender', { required: 'gender is required' })}
        />
        </div>
        {errors.gender && <span style={errorStyle}>{errors.gender.message}</span>}
      </div>


      {/* Submit Button */}
      <button type="submit" style={buttonStyle}>Sign up</button>
      <a href='/login' style={{color:'blue',paddingTop:'10px'}}>Already have an account</a>

    </form>
  )
}

export default Signup

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

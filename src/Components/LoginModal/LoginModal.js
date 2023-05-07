import React, { useState } from 'react';
import { Link, Button, Modal, TextField, Box } from '@mui/material';

import './LoginModal.css'

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [hasError, setHasError] = useState(false);

  
  const handleChange = (event) => {
    setHasError(false);
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      setPasswordsMatch(formData.password === value);
    }
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setFormData({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
    setHasError(false); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Check if all fields are filled
    const isFormFilled = Object.values(formData).every((value) => value.trim() !== '');
    
    if (!isFormFilled) {
      setHasError(true);
      return;
    }
    
    // Access the form data from the formData state variable here
    console.log(formData.email);
    console.log(formData.password);
    if (isSignUpMode) {
      console.log(formData.username);
      console.log(formData.confirmPassword);
      console.log("handling sign up")
  
      if (!passwordsMatch) {
        console.log("Passwords don't match, cannot sign up.");
        return;
      }
    } else {
      console.log("handling login")
    }
    // Close the modal after the form is submitted
    setHasError(false);
    onClose();
   
  };
  
  
  const handlePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  }

  return (
    <Modal className="SignUp" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none',
          borderRadius: '10px',
          width: '500px', // set the width to 500px
          height: '470px', // set the height to 400px
        }}
      >
        <h2>{isSignUpMode ? 'Sign Up' : 'Log In'}</h2>
        <div style={{ color: 'red', fontWeight: 600 }}>
                {hasError ? <div>Please fill out all the fields.</div> : null}
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          {isSignUpMode && (
            <TextField
              name="username"
              type="username"
              label="Username"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.username}
              onChange={handleChange}
            />
          )}
          <TextField
            name="password"
            type={isPasswordHidden ? "password" : "text"}
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <Button  onClick={handlePasswordVisibility}>
                  {isPasswordHidden ? "show" : "hide"}
                </Button>
              ),
            }}
          />
           {isSignUpMode && (
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!passwordsMatch && formData.confirmPassword.length > 0}
            helperText={
            !passwordsMatch && formData.confirmPassword.length > 0
            ? "Passwords do not match"
            : null
          }
        />
      )}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {isSignUpMode ? 'Sign Up' : 'Log In'}
          </Button>
          <br></br> 
          <Button
            sx={{ ml: 'auto', pl: 32 }}
          
            onClick={toggleMode}
          >
            {isSignUpMode
              ? 'Already have an account? Log in.'
              : 'Don\'t have an account? Sign up.'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;

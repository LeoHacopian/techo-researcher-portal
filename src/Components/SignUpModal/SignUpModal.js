import React, { useState } from 'react';
import { Link, Button, Modal, TextField, Box } from '@mui/material';
import './SignUpModal.css'

const SignUpModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isSignUpMode, setIsSignUpMode] = useState(true);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    onClose();
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setFormData({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  };

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
          minWidth: 400,
          outline: 'none',
          borderRadius: '10px',
        }}
      >
        <h2>{isSignUpMode ? 'Sign Up' : 'Log In'}</h2>
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
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {isSignUpMode ? 'Sign Up' : 'Log In'}
          </Button>
          <Link
            sx={{ ml: 'auto', pl: 35 }}
            variant="subtitle2"
            onClick={toggleMode}
          >
            {isSignUpMode
              ? 'Already have an account? Log in.'
              : 'Don\'t have an account? Sign up.'}
          </Link>
        </form>
      </Box>
    </Modal>
  );
};

export default SignUpModal;

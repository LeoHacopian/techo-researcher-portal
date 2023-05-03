import React from 'react';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ErrorMessageSnackbar({ message, onClose, open }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={60000}
      onClose={handleClose}
      message={
        <div style={{ whiteSpace: 'pre-line' }}>
          {message}
        </div>
      }
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}

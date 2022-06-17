import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.changeOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={props.severity}
          sx={{ width: '100%' }}
        >
          {props.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

CustomizedSnackbars.propTypes = {
  open: PropTypes.bool.isRequired,
  changeOpen: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
};

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import LoginIcon from '@mui/icons-material/Login';
import MenuDrawer from './MenuDrawer';
import '../../css/IndexStyle.css';
import ScheduleItemEditDialog from '../schedule/ScheduleItemEditDialog';
import SnackbarsServerMessage from '../alert/SnackbarsServerMessage';

export default function AppBarMenu(props) {
  const { isLogin, setIsLogin } = props;

  const [isOpen, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [field, setField] = React.useState('');

  const navigate = useNavigate();

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: '#19294f' }}>
          <Toolbar variant="dense">
            {isLogin && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={openDrawer}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              ККЭП
            </Typography>
            {isLogin && (
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                Назад
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {isOpen && (
        <MenuDrawer closeDrawer={closeDrawer} setIsLogin={setIsLogin} />
      )}
      <SnackbarsServerMessage
        changeOpen={setOpenAlert}
        open={openAlert}
        code={code}
        field={field}
      />
    </div>
  );
}

AppBarMenu.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  setIsLogin: PropTypes.func.isRequired,
};

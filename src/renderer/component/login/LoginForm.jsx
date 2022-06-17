import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Authorization } from '../../grpc/User';

const ariaLabel = { 'aria-label': 'description' };

export default function LoginForm(props) {
  const { setIsLogin } = props;
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);

  const navigate = useNavigate();

  const handleChangeLogin = (event) => {
    setLogin(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const loginFunc = () => {
    Authorization(login, password)
      .then((result) => {
        if (result.isLogin) {
          setIsLogin(true);
          navigate('/schedule/create', { replace: true });
        }
        return null;
      })
      .catch(() => {});
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiFormControl-root': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ width: '40%', margin: '10% 30% 0' }}>
        <span className="login_form_title">Авторизация</span>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="input_login">
            Логин <font style={{ color: 'red' }}>*</font>
          </InputLabel>
          <Input
            id="input_login"
            value={login}
            onChange={handleChangeLogin}
            placeholder="mail@mail.ru"
          />
          <FormHelperText id="component-helper-text">Почта</FormHelperText>
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="input_password">
            Пароль <font style={{ color: 'red' }}>*</font>
          </InputLabel>
          <Input
            type="password"
            id="input_password"
            value={password}
            onChange={handleChangePassword}
            placeholder="Пароль"
          />
          <FormHelperText id="component-helper-text">Ваш пароль</FormHelperText>
        </FormControl>
        {/* <FormControlLabel */}
        {/*  sx={{ ml: -0.5 }} */}
        {/*  value="end" */}
        {/*  control={ */}
        {/*    <Checkbox onChange={(event, checked) => setRemember(checked)} /> */}
        {/*  } */}
        {/*  label="Запомнить пароль" */}
        {/*  labelPlacement="end" */}
        {/*  size="small" */}
        {/* /> */}
        <br />
        <Button variant="contained" sx={{ float: 'right' }} onClick={loginFunc}>
          Войти
        </Button>
      </div>
    </Box>
  );
}

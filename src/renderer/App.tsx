import * as React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AppBarMenu from './component/menu/AppBarMenu';
import DataRouter from './component/router/DataRouter';
import ScheduleRouter from './component/router/ScheduleRouter';
import ReportRouter from './component/router/ReportRouter';
import LoginForm from './component/login/LoginForm';

export default function App() {
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <Router>
      <AppBarMenu isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path="/" element={<LoginForm setIsLogin={setIsLogin} />} />
        <Route path="/login" element={<LoginForm setIsLogin={setIsLogin} />} />
        <Route path="/data/*" element={<DataRouter />} />
        <Route path="/schedule/*" element={<ScheduleRouter />} />
        <Route path="/report/*" element={<ReportRouter />} />
      </Routes>
    </Router>
  );
}

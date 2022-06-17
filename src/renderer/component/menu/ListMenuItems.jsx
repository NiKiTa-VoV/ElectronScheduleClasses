import * as React from 'react';
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { bgRed } from 'chalk';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import ListItemLink from './ListItemLink';

export default function MenuDrawer(props) {
  const { setIsLogin } = props;

  const [openSchedule, setOpenSchedule] = React.useState(false);
  const [openData, setOpenData] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);

  const navigate = useNavigate();

  const handleClick = (collapseNumber) => {
    switch (collapseNumber) {
      case 1:
        setOpenSchedule(!openSchedule);
        break;
      case 2:
        setOpenData(!openData);
        break;
      case 3:
        setOpenReport(!openReport);
        break;
      default:
        break;
    }
  };
  return (
    <Box
      sx={{ width: '300px', bgcolor: 'background.paper' }}
      role="presentation"
    >
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          onClick={() => {
            navigate('../login', { replace: true });
            setIsLogin(false);
          }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Выйти" />
        </ListItemButton>

        <ListItemButton onClick={() => handleClick(1)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Расписание" />
          {openSchedule ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSchedule} timeout="auto" unmountOnExit>
          <List sx={{ pl: 4 }} component="div" disablePadding>
            <ListItemLink
              to="/schedule/create"
              primary="Составить"
              icon={<InboxIcon />}
            />
            <ListItemLink
              to="/schedule/list"
              primary="История"
              icon={<InboxIcon />}
            />
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleClick(2)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Справочники" />
          {openData ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openData} timeout="auto" unmountOnExit>
          <List sx={{ pl: 4 }} component="div" disablePadding>
            <ListItemLink
              to="/data/department"
              primary="Отделения"
              icon={<InboxIcon />}
            />
            <ListItemLink
              to="/data/specialization"
              primary="Специальности"
              icon={<InboxIcon />}
            />
            <ListItemLink
              to="/data/group"
              primary="Группы"
              icon={<InboxIcon />}
            />
            <ListItemLink
              to="/data/subject"
              primary="Предметы"
              icon={<InboxIcon />}
            />
            <ListItemLink
              to="/data/curriculum"
              primary="Учебные планы"
              icon={<InboxIcon />}
            />{' '}
            <ListItemLink
              to="/data/rooms"
              primary="Аудитории"
              icon={<InboxIcon />}
            />
            <ListItemLink
              to="/data/schedule"
              primary="Учебные планы"
              icon={<InboxIcon />}
            />
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleClick(3)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Отчёты" />
          {openReport ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openReport} timeout="auto" unmountOnExit>
          <List sx={{ pl: 4 }} component="div" disablePadding>
            <ListItemLink
              to="/report/teacherWorkload"
              primary="Нагрузка"
              icon={<InboxIcon />}
            />
          </List>
        </Collapse>
      </List>
    </Box>
  );
}

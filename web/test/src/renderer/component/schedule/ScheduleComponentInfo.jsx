import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import ScheduleItem from './ScheduleItem';

function getWeekDay(date) {
  const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  if (date) {
    const day = date.getDay();
    return days[day];
  }
  return '';
}

function getWeekNumber(date) {
  if (!date) return -1;
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
}

function evenWeek(weekNumber) {
  if (weekNumber === -1) return '';
  return (weekNumber + 6) % 2 ? '2' : '1';
}

export default function ScheduleComponentInfo(props) {
  const { date } = props;

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{ flexGrow: 1 }}
    >
      <span className="schedule_title_info">
        Неделя: {date && evenWeek(getWeekNumber(date))}
      </span>
      <span className="schedule_title_info">
        День недели: {date && getWeekDay(date)}
      </span>
    </Stack>
  );
}

ScheduleComponentInfo.propTypes = {
  date: PropTypes.object,
};

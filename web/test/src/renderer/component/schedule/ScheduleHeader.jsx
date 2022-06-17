import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Button, Divider, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PropTypes from 'prop-types';
import ScheduleComponentInfo from './ScheduleComponentInfo';

export default function ScheduleHeader(props) {
  const { valueDate, changeDate, saveSchedule, scheduleType } = props;

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{
        ml: 2,
        mt: 2,
        mr: 2,
      }}
    >
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ruLocale}
      >
        <DatePicker
          readOnly={scheduleType !== 'create'}
          label="Дата расписания"
          value={valueDate}
          onChange={changeDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <ScheduleComponentInfo date={valueDate} />
      {scheduleType !== 'view' && (
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<AddCircleOutlineIcon />}
          onClick={saveSchedule}
        >
          Сохранить
        </Button>
      )}
    </Stack>
  );
}

ScheduleHeader.propTypes = {
  valueDate: PropTypes.object,
  changeDate: PropTypes.func.isRequired,
  saveSchedule: PropTypes.func.isRequired,
  scheduleType: PropTypes.string.isRequired,
};

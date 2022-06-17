import * as React from 'react';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import ScheduleItem from './ScheduleItem';

export default function ScheduleViewPanel(props) {
  const {
    items,
    findTeacher,
    findSubject,
    findGroup,
    findClassRoom,
    classRooms,
    valueDate,
    scheduleType,
  } = props;

  const listItems = items?.map((item) => (
    <ScheduleItem
      key={item.teacherId}
      item={item}
      findTeacher={findTeacher}
      findSubject={findSubject}
      findGroup={findGroup}
      findClassRoom={findClassRoom}
      classRooms={classRooms}
      dialog={scheduleType !== 'view'}
    />
  ));

  return (
    <Stack>
      {valueDate && (
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="baseline"
          spacing={2}
          sx={{ mt: 3 }}
          elevation={4}
        >
          {listItems}
        </Grid>
      )}
    </Stack>
  );
}

ScheduleViewPanel.propTypes = {
  items: PropTypes.array,
  valueDate: PropTypes.object,
  classRooms: PropTypes.array.isRequired,
  findTeacher: PropTypes.func.isRequired,
  findSubject: PropTypes.func.isRequired,
  findGroup: PropTypes.func.isRequired,
  findClassRoom: PropTypes.func.isRequired,
  scheduleType: PropTypes.string.isRequired,
};

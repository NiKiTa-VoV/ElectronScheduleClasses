import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { readAllTeacher } from '../../grpc/Teacher';
import { readAllSubject } from '../../grpc/Subject';
import { readAllGroup } from '../../grpc/Group';
import { readAllClassRoom } from '../../grpc/ClassRoom';
import { createSchedule, ReadDefaults } from '../../grpc/Schedule';
import ScheduleHeader from './ScheduleHeader';
import ScheduleViewPanel from './ScheduleViewPanel';

export default function ScheduleView(props) {
  const { scheduleType } = props;
  const [items, setItems] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [classRooms, setClassRooms] = React.useState([]);
  const [valueDate, setValueDate] = React.useState();

  const navigate = useNavigate();

  React.useEffect(() => {
    readAllTeacher()
      .then((result) => {
        setTeachers(result.responses);
        return null;
      })
      .catch(() => {});
    readAllSubject()
      .then((result) => {
        setSubjects(result.responses);
        return null;
      })
      .catch(() => {});
    readAllGroup()
      .then((result) => {
        setGroups(result.responses);
        return null;
      })
      .catch(() => {});
    readAllClassRoom()
      .then((result) => {
        setClassRooms(result.responses);
        return null;
      })
      .catch(() => {});
  }, []);

  const findTeacher = (id) => {
    return teachers.find((row) => {
      return row.userId === id;
    });
  };
  const findSubject = (id) => {
    return subjects.find((row) => {
      return row.id === id;
    });
  };
  const findGroup = (id) => {
    return groups.find((row) => {
      return row.id === id;
    });
  };
  const findClassRoom = (id) => {
    return classRooms.find((row) => {
      return row.id === id;
    });
  };

  const changeDate = (newValue) => {
    setValueDate(newValue);
    ReadDefaults(newValue)
      .then((result) => {
        setItems(result.schedules);
        return null;
      })
      .catch(() => {});
  };

  const saveSchedule = () => {
    items.forEach((item) => {
      createSchedule(item, valueDate)
        .then(() => {
          return null;
        })
        .catch(() => {});
    });

    setTimeout(() => {
      navigate('../view', { replace: true });
    }, 1000);
  };

  return (
    <Stack>
      <ScheduleHeader
        valueDate={valueDate}
        changeDate={changeDate}
        saveSchedule={saveSchedule}
        scheduleType={scheduleType}
      />
      <Divider
        sx={{
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          fontWeight: 400,
          fontSize: '20px',
        }}
      >
        Расписание
      </Divider>
      <ScheduleViewPanel
        items={items}
        valueDate={valueDate}
        classRooms={classRooms}
        findClassRoom={findClassRoom}
        findGroup={findGroup}
        findSubject={findSubject}
        findTeacher={findTeacher}
        scheduleType={scheduleType}
      />
    </Stack>
  );
}

ScheduleView.propTypes = {
  scheduleType: PropTypes.string.isRequired,
};

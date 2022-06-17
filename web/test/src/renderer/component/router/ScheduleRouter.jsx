import * as React from 'react';
import {Route, Routes} from 'react-router-dom';
import DataGridDepartment from '../dataGrids/DataGridDepartment';
import ScheduleView from '../schedule/ScheduleView';

export default function ScheduleRouter() {
  return (
    <Routes>
      <Route path="/create" element={<ScheduleView scheduleType="create" />} />
      <Route path="/view" element={<ScheduleView scheduleType="view" />} />
      <Route path="/list" element={<DataGridDepartment />} />
    </Routes>
  );
}

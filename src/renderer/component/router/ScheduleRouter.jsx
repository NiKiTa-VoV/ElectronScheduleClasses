import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import DataGridDepartment from '../dataGrids/DataGridDepartment';
import DataGridSpecialization from '../dataGrids/DataGridSpecialization';
import DataGridGroup from '../dataGrids/DataGridGroup';
import DataGridSubject from '../dataGrids/DataGridSubject';
import DataGridCurriculum from '../dataGrids/DataGridCurriculum';
import ScheduleViewPanel from '../schedule/ScheduleViewPanel';
import DataGridClassRoom from '../dataGrids/DataGridClassRoom';
import ScheduleView from '../schedule/ScheduleView';
import { ScheduleType } from '../schedule/ScheduleType';

export default function ScheduleRouter() {
  return (
    <Routes>
      <Route path="/create" element={<ScheduleView scheduleType="create" />} />
      <Route path="/view" element={<ScheduleView scheduleType="view" />} />
      <Route path="/list" element={<DataGridDepartment />} />
    </Routes>
  );
}

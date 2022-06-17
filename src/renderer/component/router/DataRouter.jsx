import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import DataGridDepartment from '../dataGrids/DataGridDepartment';
import DataGridSpecialization from '../dataGrids/DataGridSpecialization';
import DataGridGroup from '../dataGrids/DataGridGroup';
import DataGridSubject from '../dataGrids/DataGridSubject';
import DataGridCurriculum from '../dataGrids/DataGridCurriculum';
import ScheduleViewPanel from '../schedule/ScheduleViewPanel';
import DataGridClassRoom from '../dataGrids/DataGridClassRoom';

export default function DataRouter() {
  return (
    <Routes>
      <Route path="/department" element={<DataGridDepartment />} />
      <Route path="/specialization" element={<DataGridSpecialization />} />
      <Route path="/group" element={<DataGridGroup />} />
      <Route path="/subject" element={<DataGridSubject />} />
      <Route path="/curriculum" element={<DataGridCurriculum />} />
      <Route path="/rooms" element={<DataGridClassRoom />} />
    </Routes>
  );
}

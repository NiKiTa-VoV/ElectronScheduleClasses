import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChartTeacherWorkload from '../chart/ChartTeacherWorkload';

export default function ReportRouter() {
  return (
    <Routes>
      <Route path="/teacherWorkload" element={<ChartTeacherWorkload />} />
    </Routes>
  );
}

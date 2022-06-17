import * as React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TeacherWorkload } from '../../grpc/Report';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartTeacherWorkload() {
  const [teacherInfo, setTeacherInfo] = React.useState([]);

  React.useEffect(() => {
    TeacherWorkload()
      .then((result) => {
        setTeacherInfo(result.teachers);
        return null;
      })
      .catch(() => {});
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Нагрузка преподователей',
      },
    },
    parsing: {
      xAxisKey: 'nameAbbreviation',
      yAxisKey: 'numberHours',
    },
  };

  const data = {
    datasets: [
      {
        label: 'Нагрузка',
        data: teacherInfo,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} type="bar" />;
}

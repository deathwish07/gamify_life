// src/components/XPChart.jsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import dayjs from 'dayjs';
import { useUser } from '../context/userContext';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const XPChart = () => {
  const { logs } = useUser();

  if (!logs || logs.length === 0) {
    return <p className="mt-4 text-center text-gray-500">No data to display in chart yet.</p>;
  }

  // Step 1: Group by ISO date (yyyy-MM-dd) to ensure correct ordering
  const grouped = logs.reduce((acc, log) => {
    const date = dayjs(log.timestamp).startOf('day').format('YYYY-MM-DD');
    if (!acc[log.type]) acc[log.type] = {};
    acc[log.type][date] = (acc[log.type][date] || 0) + log.gainedXP;
    return acc;
  }, {});

  // Step 2: Get all unique sorted dates
  const allDates = Array.from(
    new Set(logs.map(log => dayjs(log.timestamp).startOf('day').format('YYYY-MM-DD')))
  ).sort((a, b) => dayjs(a).isAfter(dayjs(b)) ? 1 : -1);

  const colors = {
    fitness: 'rgba(255, 99, 132, 0.8)',
    productivity: 'rgba(54, 162, 235, 0.8)',
    emotional: 'rgba(153, 102, 255, 0.8)',
  };

  // Step 3: Create datasets with data aligned to allDates
  const datasets = Object.entries(grouped).map(([type, data]) => ({
    label: type,
    data: allDates.map(date => data[date] || 0),
    borderColor: colors[type],
    backgroundColor: colors[type],
    tension: 0.3,
    fill: false
  }));

  const chartData = {
    labels: allDates.map(date => dayjs(date).format('MMM D')),
    datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'XP Trend'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default XPChart;

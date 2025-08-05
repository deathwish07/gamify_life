// src/components/MoodPieChart.jsx
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useUser } from '../context/userContext';
import React from 'react';
import dayjs from 'dayjs';

ChartJS.register(ArcElement, Tooltip, Legend);

const emojiColors = {
  '😄': '#facc15', // yellow
  '😐': '#a3a3a3', // gray
  '😔': '#60a5fa', // blue
  '😠': '#f87171', // red
  '😢': '#6366f1'  // indigo
};

const MoodPieChart = () => {
  const { logs } = useUser();

  // ✅ Step 1: Collect mood counts from logs
  const moodCounts = logs
    .filter(log => log.type === 'emotional')
    .reduce((acc, log) => {
      const emojiMatch = log.description.match(/[\u{1F600}-\u{1F64F}]/u); // general emoji match
      if (emojiMatch) {
        const emoji = emojiMatch[0];
        acc[emoji] = (acc[emoji] || 0) + 1;
      }
      return acc;
    }, {});

  const emojis = Object.keys(moodCounts);
  const counts = Object.values(moodCounts);

  if (emojis.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow mt-6 text-center text-gray-500">
        No mood data yet. Try logging emotional actions with emojis like 😄 😐 😔 😠 😢
      </div>
    );
  }

  const data = {
    labels: emojis,
    datasets: [
      {
        data: counts,
        backgroundColor: emojis.map(e => emojiColors[e] || '#d1d5db'),
        borderColor: 'white',
        borderWidth: 2
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 18
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = data.labels[tooltipItem.dataIndex];
            const count = data.datasets[0].data[tooltipItem.dataIndex];
            return `${label} - ${count}`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-2 text-black">🧠 Mood Distribution</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default MoodPieChart;

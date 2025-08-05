import { useUser } from '../context/userContext';
import dayjs from 'dayjs';

const calculateStreak = (logs, type) => {
  const logDates = new Set(
    logs
      .filter((log) => log.type === type)
      .map((log) => dayjs(log.timestamp).format('YYYY-MM-DD'))
  );

  let streak = 0;
  let day = dayjs();

  while (logDates.has(day.format('YYYY-MM-DD'))) {
    streak++;
    day = day.subtract(1, 'day');
  }

  return streak;
};

const getLastLogged = (logs, type) => {
  const filtered = logs
    .filter((log) => log.type === type)
    .sort((a, b) => dayjs(b.timestamp).diff(dayjs(a.timestamp)));

  if (filtered.length === 0) return 'Never';
  return dayjs(filtered[0].timestamp).format('MMM D');
};

const Streaks = () => {
  const { logs } = useUser();
  const categories = ['fitness', 'productivity', 'emotional'];

  return (
    <div className="bg-white p-4 rounded shadow mt-6 text-black">
      <h2 className="text-xl font-bold mb-2">🔥 Current Streaks</h2>
      <ul className="space-y-1">
        {categories.map((cat) => (
          <li key={cat} className="capitalize text-sm">
            {cat}: {calculateStreak(logs, cat)} day streak -- Last log: {getLastLogged(logs,cat)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Streaks;

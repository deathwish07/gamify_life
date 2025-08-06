import XPChart from '../components/XPChart';
import Streaks from '../components/Streaks';
import MoodPieChart from '../components/MoodPieChart';
import { useUser } from '../context/userContext';
import XPBar from '../components/XPBar';
import AddLogForm from '../components/AddLogForm';
import ActivityHeatmap from '../components/ActivityHeatmap';
import LifeStats from '../components/LifeStats';

const Dashboard = () => {
  const { xp, level, logs, stats } = useUser();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Levels</h1>
      {Object.entries(stats).map(([type, {level, xp}]) => (
        <XPBar key={type} type={type} level={level} xp={xp} />
      ))}

      <AddLogForm />

      {/* <XPChart /> */}
      <Streaks />
      {/* <MoodPieChart />
      <ActivityHeatmap/>
      <LifeStats/> */}

      <div className="mt-6">
        <h2 className="text-xl font-bold">Recent Logs</h2>
        <ul className="mt-2">
          {logs.slice(-5).reverse().map((log, idx) => (
            <li key={idx} className="text-sm mt-1">🎯 {log.type}: {log.description} (+{log.gainedXP} XP)</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
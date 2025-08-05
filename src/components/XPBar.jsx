const getXPNeeded = (level) => 100 + (level-1) * 50;

const XPBar = ({ type,level, xp }) => {
  const color = {
    fitness: 'bg-red-500',
    productivity: 'bg-blue-500',
    emotional: 'bg-purple-500'
  }[type];

  const maxXP = getXPNeeded(level);
  const percent = (xp / maxXP) * 100;

  return (
    <div className="mb-4">
      <p className="capitalize font-semibold">{type}-Level {level}</p>
      <div className="w-full bg-gray-300 rounded h-4">
        <div className={`h-4 ${color} rounded`} style={{ width: `${percent}%` }} />
      </div>
      <p className="text-sm mt-1">{xp} XP / {maxXP}</p>
    </div>
  );
};

export default XPBar;

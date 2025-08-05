import { useState, useEffect } from 'react';
import { useUser } from '../context/userContext';
import { actionOptions } from '../utils/actions';

const AddLogForm = () => {
  const { addLog } = useUser();
  const [type, setType] = useState('fitness');
  const [action, setAction] = useState('');
  const [xp, setXP] = useState(0);
  const [journal, setJournal] = useState('');
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    const act = actionOptions[type]?.[0];
    if (act) {
      setAction(act.label);
      setXP(act.xp);
    }
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullDescription = `${action}${emoji ? ` ${emoji}` : ''}${journal ? ` — ${journal}` : ''}`;
    addLog(type, fullDescription, parseInt(xp));
    setJournal('');
    setEmoji('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mt-4">
      <div className="mb-2">
        <label className="block font-bold text-black">Category</label>
        <select
          className="w-full border rounded p-1 text-black"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="fitness">Fitness</option>
          <option value="productivity">Productivity</option>
          <option value="emotional">Emotional</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block font-bold text-black">Action</label>
        <select
          className="w-full border rounded p-1 text-black"
          value={action}
          onChange={(e) => {
            setAction(e.target.value);
            const found = actionOptions[type].find((a) => a.label === e.target.value);
            setXP(found?.xp || 0);
          }}
        >
          {actionOptions[type].map((a) => (
            <option key={a.label} value={a.label}>
              {a.label} (+{a.xp} XP)
            </option>
          ))}
        </select>
      </div>

      {type === 'emotional' && (
        <div className="mb-2">
          <label className="block font-bold text-black">Mood</label>
          <div className="flex space-x-2">
            {['😄', '😐', '😔', '😠', '😢'].map((e) => (
              <button
                key={e}
                type="button"
                className={`text-2xl ${emoji === e ? 'scale-125' : ''}`}
                onClick={() => setEmoji(e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-2">
        <label className="block font-bold text-black">XP</label>
        <input
          type="number"
          className="w-full border p-1 rounded text-black"
          value={xp}
          onChange={(e) => setXP(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold text-black">Notes / Journal</label>
        <textarea
          className="w-full border rounded p-1 text-gray-700 "
          rows={2}
          placeholder="(Optional)"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Log It ✅
      </button>
    </form>
  );
};

export default AddLogForm;

// src/context/UserContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const API = 'https://gamify-life-backend-rho.vercel.app/api'; // Update if deploying

export const UserProvider = ({ children }) => {
  const username = 'your_username'; // Replace with dynamic username if needed

  const [stats, setStats] = useState({
    fitness: { level: 1, xp: 0 },
    productivity: { level: 1, xp: 0 },
    emotional: { level: 1, xp: 0 }
  });

  const [logs, setLogs] = useState([]);

  // Load user data from MongoDB
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.post(`${API}/user`, { username });
        setStats(res.data.stats);
        setLogs(res.data.logs);
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };
    loadUser();
  }, []);

  // Add XP log and update stats/logs from server
  const addLog = async (type, description, gainedXP) => {
    try {
      const res = await axios.post(`${API}/log`, {
        username,
        type,
        description,
        gainedXP
      });
      setStats(res.data.stats);
      setLogs(res.data.logs);
    } catch (err) {
      console.error("Error adding log:", err);
    }
  };

  return (
    <UserContext.Provider value={{ stats, logs, addLog }}>
      {children}
    </UserContext.Provider>
  );
};

import { useContext } from 'react';

export const useUser = () => useContext(UserContext);

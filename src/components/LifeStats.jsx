// src/components/LifeStats.jsx
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useUser } from '../context/userContext';

const LifeStats = () => {
    const { logs } = useUser();

    const categories = ['fitness','emotional', 'productivity'];

    const xpByCategory = logs.reduce((acc, log) => {
        const { type, gainedXP } = log;
        if (!acc[type]) acc[type] = 0;
        acc[type] += gainedXP;
        return acc;
    }, {});

    // Convert raw XP to a score out of 100 (you can define better scaling logic later)
    const data = categories.map(category => ({
        stat: category.charAt(0).toUpperCase() + category.slice(1),
        value: Math.min(100, (xpByCategory[category] || 0) / 10), // scale XP -> stat (cap at 100)
    }));

    return (
        <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="text-xl font-bold mb-4 text-black">🎮 Life Stats Overview</h2>
            <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="stat" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Your Stats" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LifeStats;

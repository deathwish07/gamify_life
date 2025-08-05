// src/components/ActivityHeatmap.jsx
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { useUser } from '../context/userContext';
import { subDays, format, isValid, parseISO } from 'date-fns';

const ActivityHeatmap = () => {
    const { logs } = useUser();

    // Safely group logs by valid date
    const logCountByDate = logs.reduce((acc, log) => {
        let dateObj;

        if (typeof log.timestamp === 'string') {
            dateObj = parseISO(log.timestamp);
        } else if (log.timestamp instanceof Date) {
            dateObj = log.timestamp;
        } else {
            dateObj = new Date(log.timestamp);
        }

        if (!isValid(dateObj)) return acc;

        const formatted = format(dateObj, 'yyyy-MM-dd');
        acc[formatted] = (acc[formatted] || 0) + 1;
        return acc;
    }, {});


    const today = new Date();
    const startDate = subDays(today, 180); // last 6 months

    const values = logs.reduce((acc, log) => {
        const parsedDate = new Date(log.timestamp);

        if (!log.timestamp || isNaN(parsedDate)) return acc;

        const dateStr = format(parsedDate, 'yyyy-MM-dd');

        const existing = acc.find(item => item.date === dateStr);
        if (existing) {
            existing.count += 1;
        } else {
            acc.push({ date: dateStr, count: 1 });
        }

        return acc;
    }, []);


    console.log("Processed heatmap values:", values);
    return (
        <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="text-xl font-bold mb-2 text-black">📅 Activity Calendar</h2>
            <CalendarHeatmap
                startDate={startDate}
                endDate={today}
                values={values}
                classForValue={(value) => {
                    if (!value || value.count === 0) return 'color-empty';
                    if (value.count < 2) return 'color-scale-1';
                    if (value.count < 4) return 'color-scale-2';
                    if (value.count < 6) return 'color-scale-3';
                    return 'color-scale-4';
                }}
                showWeekdayLabels
            />
            <style>{`
        .color-empty { fill: #ebedf0; }
        .color-scale-1 { fill: #c6e48b; }
        .color-scale-2 { fill: #7bc96f; }
        .color-scale-3 { fill: #239a3b; }
        .color-scale-4 { fill: #196127; }
      `}</style>
        </div>
    );
};

export default ActivityHeatmap;

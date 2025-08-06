import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-600 text-white px-6 py-4 shadow-md rounded-lg ">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <ul className="flex justify-center gap-10 text-white text-sm font-semibold">
                    <li>
                        <Link to="/dashboard" className="hover:text-gray-400 transition">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/stats" className="hover:text-gray-400 transition">Stats</Link>
                    </li>
                    <li>
                        <Link to="/trend" className="hover:text-gray-400 transition">XP Trend</Link>
                    </li>
                    <li>
                        <Link to="/mood" className="hover:text-gray-400 transition">Mood Distribution</Link>
                    </li>
                    <li>
                        <Link to="/heatmap" className="hover:text-gray-400 transition">Heatmap</Link>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar
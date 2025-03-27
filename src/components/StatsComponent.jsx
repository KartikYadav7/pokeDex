import React, { useEffect, useState, useCallback } from 'react';
import Button from './Button';

const COLORS = [
  {color: "bg-red-800" },
  {  color: "bg-yellow-800" },
  { color: "bg-blue-800" },
  { color: "bg-purple-800" },
  {  color: "bg-green-800" },
  {  color: "bg-gray-800" },
  { color: "bg-indigo-800" },
  { color: "bg-gray-800" },
];

const StatsComponent = ({ responseData }) => {
  const [statColors, setStatColors] = useState([]);

  const getRandomColor = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomIndex].color;
  }, []);

  useEffect(() => {
    if (responseData?.stats) {
      setStatColors(responseData.stats.map(() => getRandomColor()));
    }
  }, [responseData?.stats, getRandomColor]);

  return (
    <>
     
        <div className="space-y-4 ">
            <ul className="space-y-2 space-x-2 flex flex-col md:flex-row w-fit ">
              {responseData.stats.map((stat, index) => (
                <li
                  key={index}
                  className={`${statColors[index]} rounded-lg flex justify-between px-2 py-1`}
                >
                  <span className="capitalize font-bold">{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </li>
              ))}
            </ul>
        </div>
    </>
  )}

export default StatsComponent;

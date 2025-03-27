import React from 'react';

const AbilitiesComponent = ({ abilitiesData }) => {
  if (!abilitiesData || abilitiesData.length === 0) return null;

  return (
    <div className="p-2">
      {/* <h2 className="text-lg font-bold">Abilities</h2> */}
      <ul className='bg-gray-800 p-2 rounded-lg space-y-2'>
        {abilitiesData.map((ability, index) => (
          <li key={index} >
            <strong className="capitalize bg-gray-600 px-2 rounded">{ability.name}:</strong>{" "}
            {ability.effect}{" "}
            {ability.isHidden && <span className="text-gray-500">(Hidden)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AbilitiesComponent;

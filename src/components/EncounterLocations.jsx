import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EncounterLocations = ( {responseData} ) => {

  const [encounters, setEncounters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if responseData exists and has a name
    if (!responseData || !responseData.location_area_encounters) {
        setLoading(false);
        return;
      }
    const fetchEncounters = async () => {
      setLoading(true);
      setError(null);
      try {
        const res =  await axios.get(responseData.location_area_encounters)
        setEncounters(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEncounters();
  }, [responseData]);

  if (loading) return <p>Loading encounter locations...</p>;
  if (error) return <p>Error fetching encounters: {error.message}</p>;
  if (!encounters.length) return <p className='p-2 rounded-lg bg-gray-800'>No encounter locations found.</p>;

  return (
    <div className="p-2">
      {/* <h2 className="text-lg font-bold w-fit bg-gray-700 px-4 rounded">
        Encounter Locations 
      </h2> */}
      <ul  className='grid grid-cols-4 '>
        {encounters.map((encounter, index) => (
          <li key={index}
          className='border p-1 px-2'
         >
            <span className="capitalize">
              {encounter.location_area.name.replace(/-/g, ' ')}
            </span>
            {/* {encounter.version_details && encounter.version_details.length > 0 && 
            (
              <ul className="ml-4">
                {encounter.version_details.map((detail, idx) => (
                  <li key={idx}>
                    Version: {detail.version.name} - Chance: {detail.max_chance}
                  </li>
                ))}
              </ul>
            )
            } */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EncounterLocations;

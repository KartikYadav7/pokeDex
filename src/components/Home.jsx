import React, { useState } from "react";
import Button from "./Button";
const color = [
  { name: "normal", color: "bg-gray-400" },
  { name: "fire", color: "bg-red-400" },
  { name: "water", color: "bg-blue-400" },
  { name: "electric", color: "bg-yellow-400" },
  { name: "grass", color: "bg-green-400" },
  { name: "ice", color: "bg-blue-200" },
  { name: "fighting", color: "bg-red-800" },
  { name: "poison", color: "bg-purple-400" },
  { name: "ground", color: "bg-yellow-800" },
  { name: "flying", color: "bg-blue-800" },
  { name: "psychic", color: "bg-purple-800" },
  { name: "bug", color: "bg-green-800" },
  { name: "rock", color: "bg-gray-800" },
  { name: "ghost", color: "bg-indigo-800" },
  { name: "dragon", color: "bg-red-200" },
  { name: "dark", color: "bg-gray-800" },
  { name: "steel", color: "bg-gray-200" },
  { name: "fairy", color: "bg-pink-400" },
  { name: "stellar", color: "bg-yellow-200" }
];

const Home = ({responseData}) => {
  const[showGeneralInfo, setShowGeneralInfo] = useState(false);
  if (!responseData) return 

 
  return (
    <div className="p-4 flex flex-col items-center rounded-xl">
      <h2 className="text-4xl my-4 mb-0 font-bold capitalize">
        {responseData.name}
      </h2>
      <p>
        {responseData.types.map((t, index) => (
          <span
            key={index}
            className={`mx-2 my-2 inline-block text-white px-2 py-1 rounded text-sm ${color.find((c) => c.name === t.type.name)?.color}`}
          >
            {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
          </span>
        ))}
      </p>
      <div className="flex space-x-4">
        <img
          src={responseData.sprites.front_default}
          alt={responseData.name}
          className="border border-gray-400 rounded-xl"
        />
        <img
          src={responseData.sprites.front_shiny}
          alt={`${responseData.name} shiny`}
          className="border border-gray-400 rounded-xl"
        />
      </div>
     <div className="flex rounded-lg bg-gray-800 my-4 px-4 gap-x-4">
      <p className="w-14 infoClass my-2">
        ID <span>{responseData.id}</span>
      </p>
      <p className="infoClass my-2">
        Base Exp {responseData.base_experience}
      </p>
      </div>
      <Button text="General Info"
      onClick={()=>setShowGeneralInfo(!showGeneralInfo)}/>
{showGeneralInfo && (<>
<div className="flex mt-2 bg-gray-800 p-2 rounded-lg gap-x-4">
      <p className="infoClass my-2">Height {responseData.height} </p>
      <p className="infoClass my-2">Weight {responseData.weight} </p>
      </div>
</>)}
     
    </div>
  );
};

export default Home;

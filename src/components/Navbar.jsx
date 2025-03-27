import React, { useState , useEffect } from "react";
import Button from "./Button";
import AbilitiesComponent from "./AbilitiesComponent";
import MovesComponent from "./MovesComponent";
import StatsComponent from "./StatsComponent";
import EncounterLocations from "./EncounterLocations";
import EvolutionAndAlternateForms from "./EvolutionAndAlternateForms";

import axios from "axios";
import Home from "./Home";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [abilitiesData, setAbilitiesData] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [showMoves, setShowMoves] = useState(false);
  const [showAbilities, setShowAbilities] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showEncounterLocations, setShowEncounterLocations] = useState(false);
  const [showEvolutionAndAlternateForms, setShowEvolutionAndAlternateForms] =
    useState(false);

  
 
  const fetchPokemonData = async (pokemon) => {
    setError("");
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
      );
      setResponseData(response.data);
      const abilities = await Promise.all(
        response.data.abilities.map((ability) =>
          axios.get(ability.ability.url).then((res) => ({
            name: res.data.name,
            effect:
              res.data.effect_entries.find(
                (entry) => entry.language.name === "en"
              )?.effect || "No description",
            isHidden: ability.is_hidden,
          }))
        )
      );
      setAbilitiesData(abilities);
    } catch (err) {
      if (err.response?.status === 404) {
        setError({ message: "Pokémon ID/Name is not in API" });
      } else {
        setError({ message: "An error occurred while searching." });
      }
    }
  };

  useEffect(() => {
    fetchPokemonData("pikachu");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!search) {
      setError({message: "Please enter a Pokémon name/ID"});
      return;
    }
    fetchPokemonData(search);
  };



  return (
    <>
      <div className="flex flex-col items-center justify-between mr-0 space-x-0  space-y-4 p-2 md:flex-row md:space-y-0 md:space-x-2 md:mr-8">
        <div className="flex items-center ">
        <img src="./pokeBall.svg" alt="pokeBall"
        className="w-12 h-12" />
        
          <h1 className="text-5xl">PokeDex</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex  space-x-2">
          <input
            type="text"
            className="border border-gray-400 p-2 w-60 rounded-lg"
            placeholder="Enter Pokémon name/ID"
            onChange={(e) => setSearch(e.target.value.trim())}
          />
          <Button type="submit" text="Search" />
        </form>
      </div>
      {error && <p className="text-red-500 mt-2 text-center">{error.message}</p>}
     

      {responseData && <Home responseData={responseData} />}
      <div className="flex flex-col items-center justify-center gap-y-4 pb-4 ">
        {responseData && (
          <>
            <Button
              text="Statistics"
              onClick={() => setShowStats((prev) => !prev)}
            />
          </>
        )}
        {showStats && <StatsComponent responseData={responseData} />}

        {responseData && (
          <>
            <Button
              text="Attacks"
              onClick={() => setShowMoves((prev) => !prev)}
            />
          </>
        )}
        {showMoves && (
          <>
            {" "}
            <MovesComponent initialMovesData={responseData} />
          </>
        )}

        {responseData && (
          <>
            <Button
              text="Abilities"
              onClick={() => setShowAbilities((prev) => !prev)}
            />
          </>
        )}
        {showAbilities && <AbilitiesComponent abilitiesData={abilitiesData} />}

        {responseData && (
          <>
            <Button
              text="Encounter Locations"
              onClick={() => setShowEncounterLocations((prev) => !prev)}
            />
          </>
        )}
        {showEncounterLocations && (
          <EncounterLocations responseData={responseData} />
        )}

        {responseData && (
          <>
            <Button
              text="Evolutions"
              onClick={() => setShowEvolutionAndAlternateForms((prev) => !prev)}
            />
          </>
        )}
        {showEvolutionAndAlternateForms && (
          <EvolutionAndAlternateForms responseData={responseData} />
        )}

      </div>
   
    </>
  );
};

export default Navbar;

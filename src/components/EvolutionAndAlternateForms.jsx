import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EvolutionAndAlternateForms = ({ responseData }) => {
  // State for evolution chain data, alternate forms and status.
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [alternateForms, setAlternateForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // On component mount (or when responseData changes), fetch species & evolution data.
  useEffect(() => {
    if (!responseData) {
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        // 1. Fetch species data using the URL provided in responseData.
        const speciesRes = await axios.get(responseData.species.url);
        const speciesData = speciesRes.data;
        
        // 2. Get the evolution chain URL from species data.
        const evoChainUrl = speciesData.evolution_chain.url;
        const evoRes = await axios.get(evoChainUrl);
        setEvolutionChain(evoRes.data);
        
        // 3. Save alternate forms from species data (all varieties).
        setAlternateForms(speciesData.varieties);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [responseData]);

  // Helper: Parse the evolution chain recursively.
  const getEvolutionChain = (chainNode) => {
    const chain = [];
    const traverse = (node) => {
      chain.push(node.species);
      if (node.evolves_to && node.evolves_to.length > 0) {
        node.evolves_to.forEach(traverse);
      }
    };
    traverse(chainNode);
    return chain;
  };

  // A card that displays a Pokémon's name and image by fetching its data.
  const PokemonCard = ({ name }) => {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
      const fetchPokemon = async () => {
        try {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
          setPokemonData(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchPokemon();
    }, [name]);

    if (!pokemonData) return <p>Loading {name}...</p>;

    return (
      <div className="border p-2 rounded shadow text-center">
        <h3 className="capitalize font-bold">{name}</h3>
        <img src={pokemonData.sprites.front_default} alt={name} />
      </div>
    );
  };

  // Render the evolution chain if available.
  const renderEvolutionChain = () => {
    if (!evolutionChain) return null;
    const chainArray = getEvolutionChain(evolutionChain.chain);

    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Evolution Chain</h2>
        <div className="flex flex-wrap gap-4">
          {chainArray.map((species, index) => (
            <PokemonCard key={index} name={species.name} />
          ))}
        </div>
      </div>
    );
  };

  // Render alternate forms (includes mega, gigantamax, etc.) if available.
  // We assume alternate forms are in speciesData.varieties.
  const renderAlternateForms = () => {
    // If only the default exists, we don't show alternates.
    if (!alternateForms || alternateForms.length <= 1) return null;

    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Alternate Forms</h2>
        <div className="flex flex-wrap gap-4">
          {alternateForms.map((variety, index) => (
            <PokemonCard key={index} name={variety.pokemon.name} />
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <p>Loading evolution data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      {renderEvolutionChain()}
      {renderAlternateForms()}
    </div>
  );
};

export default EvolutionAndAlternateForms;

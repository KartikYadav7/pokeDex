import React, { useState, useEffect } from "react";
import axios from "axios";

const MovesComponent = ({ initialMovesData }) => {
  const [movesData, setMovesData] = useState(initialMovesData || []);
  const [loadingMoves, setLoadingMoves] = useState(false);

  useEffect(() => {
    if (!initialMovesData || !initialMovesData.moves) return;

    const fetchMoves = async () => {
      setLoadingMoves(true);
      try {
        const moves = initialMovesData.moves;
        const moveResponses = await Promise.all(
          moves.map((move) => axios.get(move.move.url))
        );
        const formattedMoves = moveResponses.map((moveRes, index) => {
          return {
            name: moveRes.data.name,
            type: moveRes.data.type.name,
            power: moveRes.data.power || "N/A",
            accuracy: moveRes.data.accuracy || "N/A",
            pp: moveRes.data.pp,
          };
        });
        setMovesData(formattedMoves);
      } catch (error) {
        console.error("Error fetching moves data:", error);
        setMovesData([]);
      } finally {
        setLoadingMoves(false);
      }
    };

    fetchMoves();
  }, [initialMovesData]);

  if (loadingMoves) return
  if (!movesData.length) return 
  return (
    <div className="p-2">
      {/* <h2 className="text-lg font-bold">Moves</h2> */}
      <ul className="p-1 grid grid-cols-3">
        {movesData.map((move, index) => (
          <li key={index}
          className="border p-2">
            <strong className="inline-block capitalize text-white ">
              {move.name}
            </strong>
            <span className="capitalize px-2 text-gray-400">{move.type}</span>
            <div className="text-gray-400 grid grid-cols-3">
              <span className="">Power {move.power}</span>
              <span>Accuracy {move.accuracy}</span> 
                <span>PP {move.pp}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovesComponent;

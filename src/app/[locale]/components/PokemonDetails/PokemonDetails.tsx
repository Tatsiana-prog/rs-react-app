import React from 'react';
import { useGetPokemonDetailsQuery } from '../../apiSlice';
import './PokemonDetails.css';

interface PokemonDetailsProps {
  name: string;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ name }) => {
  const { data, error, isLoading } = useGetPokemonDetailsQuery(name);

  if (!name) {
    return <div>No Pokémon name provided</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching Pokémon data.</div>;
  }

  const types = data?.types.map((t) => t.type.name) || [];

  return (
    <div className="block-details">
      <h2 style={{ color: 'orange' }}>Details</h2>
      <h3>{name}</h3>
      <p>{types.join(', ') || 'No types available'}</p>
      <button className="button" onClick={() => window.history.back()}>
        Close
      </button>
    </div>
  );
};

export default PokemonDetails;

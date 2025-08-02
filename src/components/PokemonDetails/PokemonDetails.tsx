import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PokemonDetails.css';

type RouteParams = {
  name?: string;
};

type PokemonType = {
  type: {
    name: string;
  };
};

type PokemonAPIResponse = {
  types: PokemonType[];
};

const PokemonDetails: React.FC = () => {
  const { name } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    if (!name) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data: PokemonAPIResponse) => {
        const fetchedTypes = data.types.map((t) => t.type.name);
        setTypes(fetchedTypes);
      })
      .catch((error) => {
        console.error('Failed to fetch Pokémon data:', error);
        navigate('/404');
      });
  }, [name, navigate]);

  if (!name) return <div>No Pokémon name provided</div>;

  return (
    <div className="block-details">
      <h2 style={{ color: 'orange' }}>Details</h2>
      <h3>{name}</h3>
      <p>{types.join(', ') || 'Loading...'}</p>
      <button className="button" onClick={() => navigate(-1)}>
        Close
      </button>
    </div>
  );
};

export default PokemonDetails;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div
      style={{
        width: '300px',
        height: '200px',
        border: '3px solid black',
        padding: '10px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
        textAlign: 'center',
      }}
    >
      <h2 style={{ color: 'orange' }}>Details</h2>
      <h3>{name}</h3>
      <p>{types.join(', ') || 'Loading...'}</p>
      <button onClick={() => navigate(-1)}>Close</button>
    </div>
  );
};

export default PokemonDetails;

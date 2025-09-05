import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://pokeapi.co/api/v2';

interface PokemonListResponse {
  count: number;
  results: { name: string; url: string }[];
}

interface PokemonDetailsResponse {
  name: string;
  types: { type: { name: string } }[];
}

interface PokemonSpeciesResponse {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, number>({
      query: (page) => {
        const limit = 18;
        const offset = (page - 1) * limit;
        return `pokemon?limit=${limit}&offset=${offset}`;
      },
    }),
    getPokemonDetails: builder.query<PokemonDetailsResponse, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonSpecies: builder.query<PokemonSpeciesResponse, string>({
      query: (name) => `pokemon-species/${name}`,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailsQuery,
  useGetPokemonSpeciesQuery,
} = apiSlice;

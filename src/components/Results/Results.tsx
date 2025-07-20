import React from 'react';

interface ResultsProps {
  searchTerm: string;
  onComplete: () => void;
  showError: boolean;
}

interface PokemonListEntry {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListEntry[];
  next: string | null;
  previous: string | null;
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonDetails {
  name: string;
  types: PokemonType[];
}

interface ResultsState {
  loading: boolean;
  error: string | null;
  items: { name: string; description: string }[];
  nextUrl: string | null;
  prevUrl: string | null;
}

class Results extends React.Component<ResultsProps, ResultsState> {
  pageSize = 18;

  constructor(props: ResultsProps) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      items: [],
      nextUrl: null,
      prevUrl: null,
    };
  }

  componentDidMount() {
    this.fetchPage(this.buildUrl());
  }

  componentDidUpdate(prevProps: ResultsProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.fetchPage(this.buildUrl());
    }
  }

  buildUrl(url?: string) {
    if (url) return url;
    return this.props.searchTerm
      ? `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(
          this.props.searchTerm.toLowerCase()
        )}`
      : `https://pokeapi.co/api/v2/pokemon?limit=${this.pageSize}&offset=0`;
  }

  async fetchPage(url: string) {
    this.setState({ loading: true, error: null });
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

      if ('results' in data) {
        const typedData = data as PokemonListResponse;
        const items = await Promise.all(
          typedData.results.map(async (entry: PokemonListEntry) => {
            const pokemonRes = await fetch(entry.url);
            if (!pokemonRes.ok)
              throw new Error(`Failed to fetch ${entry.name}`);
            const pokemonData: PokemonDetails = await pokemonRes.json();
            return {
              name: pokemonData.name,
              description:
                pokemonData.types.map((t) => t.type.name).join(', ') ||
                'No types',
            };
          })
        );
        this.setState(
          {
            items,
            nextUrl: typedData.next,
            prevUrl: typedData.previous,
            loading: false,
          },
          this.props.onComplete
        );
      } else {
        const pokemonData: PokemonDetails = data;
        this.setState(
          {
            items: [
              {
                name: pokemonData.name,
                description:
                  pokemonData.types.map((t) => t.type.name).join(', ') ||
                  'No types',
              },
            ],
            nextUrl: null,
            prevUrl: null,
            loading: false,
          },
          this.props.onComplete
        );
      }
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      this.setState({ error: message, loading: false }, this.props.onComplete);
    }
  }

  render() {
    const { loading, error, items, nextUrl, prevUrl } = this.state;
    const { showError } = this.props;

    if (loading) return <div>Loading...</div>;
    if (showError)
      return (
        <h1 style={{ color: 'red', textAlign: 'center' }}>
          Something went wrong.
        </h1>
      );
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
      <div style={{ marginTop: '20px' }}>
        {items.length === 0 ? (
          <div>No results found.</div>
        ) : (
          <div
            style={{
              marginTop: '100px',
              display: 'flex',
              gap: '30px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  width: '180px',
                  height: '180px',
                  background: 'black',
                  borderRadius: '20px',
                }}
              >
                <h2 style={{ textAlign: 'center', color: 'white' }}>
                  {item.name}
                </h2>
                <p style={{ textAlign: 'center', color: 'white' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => prevUrl && this.fetchPage(prevUrl)}
            disabled={!prevUrl}
          >
            « Prev
          </button>
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => nextUrl && this.fetchPage(nextUrl)}
            disabled={!nextUrl}
          >
            Next »
          </button>
        </div>
      </div>
    );
  }
}

export default Results;

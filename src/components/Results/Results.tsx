import React from 'react';
import Card from '../Card/Card';

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
    this.fetchPage(this.getUrl());
  }

  componentDidUpdate(prevProps: ResultsProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.fetchPage(this.getUrl());
    }
  }

  getUrl(url?: string): string {
    if (url) return url;
    return this.props.searchTerm
      ? `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(this.props.searchTerm.toLowerCase())}`
      : `https://pokeapi.co/api/v2/pokemon?limit=${this.pageSize}&offset=0`;
  }

  async fetchPage(url: string) {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();

      if ('results' in data) {
        const list = data as PokemonListResponse;
        const items = await Promise.all(
          list.results.map(async (entry: PokemonListEntry) => {
            const res = await fetch(entry.url);
            if (!res.ok) throw new Error(`Failed to fetch ${entry.name}`);
            const details: PokemonDetails = await res.json();
            return {
              name: details.name,
              description:
                details.types.map((t) => t.type.name).join(', ') || 'No types',
            };
          })
        );
        this.setState(
          { items, nextUrl: list.next, prevUrl: list.previous, loading: false },
          () => {
            if (typeof this.props.onComplete === 'function')
              this.props.onComplete();
          }
        );
      } else {
        const details: PokemonDetails = data;
        this.setState(
          {
            items: [
              {
                name: details.name,
                description:
                  details.types.map((t) => t.type.name).join(', ') ||
                  'No types',
              },
            ],
            nextUrl: null,
            prevUrl: null,
            loading: false,
          },
          () => {
            if (typeof this.props.onComplete === 'function')
              this.props.onComplete();
          }
        );
      }
    } catch (error) {
      console.error(error);
      this.setState(
        {
          error: error instanceof Error ? error.message : String(error),
          loading: false,
        },
        () => {
          if (typeof this.props.onComplete === 'function')
            this.props.onComplete();
        }
      );
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
            {items.map((item) => (
              <Card
                key={item.name}
                name={item.name}
                description={item.description}
              />
            ))}
          </div>
        )}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => prevUrl && this.fetchPage(prevUrl)}
            disabled={!prevUrl}
            aria-label="Previous page"
          >
            « Prev
          </button>
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => nextUrl && this.fetchPage(nextUrl)}
            disabled={!nextUrl}
            aria-label="Next page"
          >
            Next »
          </button>
        </div>
      </div>
    );
  }
}
export default Results;

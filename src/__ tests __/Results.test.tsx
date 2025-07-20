import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import Results from '../components/Results/Results';

test('fetches and displays Pokemon data correctly', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        name: 'pikachu',
        types: [{ type: { name: 'electric' } }],
      }),
  });

  const onCompleteMock = jest.fn();
  const { getByText } = render(
    <Results
      searchTerm="pikachu"
      onComplete={onCompleteMock}
      showError={false}
    />
  );

  expect(getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(getByText('pikachu')).toBeInTheDocument();
    expect(getByText('electric')).toBeInTheDocument();
  });

  expect(onCompleteMock).toHaveBeenCalled();
});

test('displays error message when fetch fails', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 404,
  });

  const onCompleteMock = jest.fn();
  const { getByText } = render(
    <Results
      searchTerm="invalidpokemon"
      onComplete={onCompleteMock}
      showError={false}
    />
  );

  expect(getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(getByText('Error: HTTP error! Status: 404')).toBeInTheDocument();
  });

  expect(onCompleteMock).toHaveBeenCalled();
});

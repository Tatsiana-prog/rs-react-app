import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Button from '../app/[locale]/components/Button/Button';

describe('Button component', () => {
  it('renders button with correct text', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button btnName="Search" onClick={onClickMock} />
    );
    const button = getByText('Search');
    expect(button).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import App from "../src/App";


describe('App', () => {
  it('renders headline', () => {
    render(<App />)
    const headline = screen.getByText('Home Page');
    expect(headline).toBeTruthy();
    expect(true).toBe(true);
  });
});
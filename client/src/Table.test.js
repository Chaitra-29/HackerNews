import React from 'react';
import { render,screen } from '@testing-library/react';;
import Table from './Table';

test('renders TODO header', () => {
  render(<Table />);
  const text = screen.getByText(/TODO/i);
  expect(text).toBeInTheDocument();
});

test('componentDidMount and callAPI are called' , () => {
  const componentDidMount = jest.spyOn(Table.prototype, 'componentDidMount');
  const callAPI = jest.spyOn(Table.prototype, 'callAPI');
  render(<Table />);
  expect(componentDidMount).toHaveBeenCalledTimes(1);
  expect(callAPI).toHaveBeenCalledTimes(1);
});

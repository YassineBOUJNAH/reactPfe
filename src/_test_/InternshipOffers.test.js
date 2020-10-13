import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import InternshipOffers from '../views/studentViews/InternshipOffers'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InternshipOffers />, div);
  ReactDOM.unmountComponentAtNode(div);
});
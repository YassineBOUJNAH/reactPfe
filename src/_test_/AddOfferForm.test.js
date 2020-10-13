import React from 'react';
import ReactDOM from 'react-dom';
import ProtectedComponent from '../index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProtectedComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
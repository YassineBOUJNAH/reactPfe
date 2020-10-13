import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UsersManagement from '../views/UsersManagement'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UsersManagement />, div);
  ReactDOM.unmountComponentAtNode(div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StudentsInterships from '../views/adminViews/StudentsInterships'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StudentsInterships />, div);
  ReactDOM.unmountComponentAtNode(div);
});
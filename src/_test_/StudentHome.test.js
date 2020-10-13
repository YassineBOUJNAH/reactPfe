import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StudentHome from '../views/studentViews/StudentHome'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StudentHome />, div);
  ReactDOM.unmountComponentAtNode(div);
});
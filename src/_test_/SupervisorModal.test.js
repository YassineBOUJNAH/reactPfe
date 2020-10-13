import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SupervisorModal from '../views/studentViews/SupervisorModal'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SupervisorModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
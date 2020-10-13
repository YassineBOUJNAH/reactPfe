import React from 'react';
import ReactDOM from 'react-dom';
import StudentReport from '../views/studentViews/StudentReport'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StudentReport />, div);
  ReactDOM.unmountComponentAtNode(div);
});
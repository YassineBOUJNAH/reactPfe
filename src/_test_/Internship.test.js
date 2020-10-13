import React from 'react';
import ReactDOM from 'react-dom';
import Internship from '../views/studentViews/Internship'
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Internship />, div);
  ReactDOM.unmountComponentAtNode(div);
});
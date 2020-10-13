import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StudentPosts from '../views/studentViews/StudentPosts'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StudentPosts />, div);
  ReactDOM.unmountComponentAtNode(div);
});
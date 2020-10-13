import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/Login';
import User from '../views/User';
import StudentsInterships from '../views/adminViews/StudentsInterships'
import IntershipsOffers from '../views/adminViews/IntershipsOffers'
import StudentPosts from '../views/studentViews/StudentPosts'
import meetings from '../views/supervisorViews/meetings'


it('User renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<User />, div);
  ReactDOM.unmountComponentAtNode(div);


  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Login renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('IntershipsOffers renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<IntershipsOffers />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('StudentInterships renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<StudentsInterships />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('StudentPosts renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<StudentPosts />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('meetings renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<meetings />, div);
  ReactDOM.unmountComponentAtNode(div);
});
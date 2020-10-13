import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StudentMeetings from '../views/studentViews/StudentMeetings'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StudentMeetings />, div);
  ReactDOM.unmountComponentAtNode(div);
});
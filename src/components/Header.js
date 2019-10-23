import React from 'react';
import { Link } from 'react-router-dom';
import {
  APP_NAME,
  SERVER_INSTANCES_STRING } from '../constants';

export default () => {
  return (
    <nav className="nav-wrapper">
      <ul>
        <li>
          <Link className="link-style" to="/" style={{ fontSize: 30, marginLeft: 10 }}>{APP_NAME}</Link>
        </li>
        <li>
          <Link className="link-style" to="/serverinstances">{SERVER_INSTANCES_STRING}</Link>
        </li>
      </ul>
    </nav>
  );
};

import React from 'react';
import getCookie from '../cookie/getCookie';
import { Redirect } from 'react-router-dom';
import Homepage from '../Homepage';
import checkRole from './checkRole';

const checkRoleRedirect = () => {

  const token = getCookie('token');
  if ( token === null) {
    return <Redirect to='/' />;
  }

  const role = checkRole();
  console.log(role, 2);

  var component = <Homepage />;
  return component;

}

export default checkRoleRedirect;

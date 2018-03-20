import React, { Component } from 'react';

import LSForm from './components/LSForm';

import { Link } from 'react-router-dom'; //Links for router

import 'normalize.css';
import 'styles/index.scss';



class App extends Component {

  render () {
    return (
      <div className='App'>

            <LSForm />          

          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/admin'>Admin</Link></li>
            <li><Link to='/user'>User</Link></li>
          </ul>

      </div>
    );
  }
}

export default App;

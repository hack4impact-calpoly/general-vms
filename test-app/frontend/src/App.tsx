import React from 'react';
import logo from './logo.svg';
import ManageVolunteers from './ManageVolunteers/ManageVolunteers';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <br />
      <div className='TestManageVolunteers'>
        
      </div>
    </div>
  );
}

export default App;

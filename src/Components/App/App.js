// App.js
import React from 'react';
import QPortalNavbar from '../QPortalNavbar/QPortalNavbar'
import './App.css';
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

function App() {
  return (
    <div className="App">
    <QPortalNavbar/>
    </div>
  );
}

export default App;
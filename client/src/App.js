import React from 'react';
import './App.css';
import Cars from './components/Cars'
import Filter from './components/Filter';
function App() {
  return (
    <div className="App">
      <h1>Car Board</h1>
      <Filter />
      <Cars />
    </div>
  );
}

export default App;

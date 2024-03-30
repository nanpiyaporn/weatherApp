import React, { useEffect, useState } from 'react';
import Search from './Components/Search';
import './App.css';

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  }
   
  return (
    <div className="container">
      <Search onSearchChange ={handleOnSearchChange}/>
      
    </div>
  );
}

export default App;

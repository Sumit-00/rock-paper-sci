import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import EntryScreen from './components/EntryScreen';
import UsersList from './components/UsersList';
import PlayScreen from './components/PlayScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryScreen />} />
      <Route path="/user-list/:id" element={<UsersList />} />
      <Route path="/play/:id/:oppId" element={<PlayScreen />} />
    </Routes>
  )
}

export default App;

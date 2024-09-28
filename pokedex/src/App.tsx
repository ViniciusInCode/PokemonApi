// src/App.tsx
import React from 'react';
import PokemonList from './components/PokemonList';
import './App.css';

const App: React.FC = () => {
    return (
        <div>
            <PokemonList />
        </div>
    );
};

export default App;

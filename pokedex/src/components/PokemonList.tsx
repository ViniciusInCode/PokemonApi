// src/components/PokemonList.tsx
import React, { useEffect, useState } from 'react';
import { Pokemon } from '../types/Pokemon';
import './PokemonList.css'; // Adicionamos o CSS aqui

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
                const data = await response.json();

                const pokemonData: Pokemon[] = await Promise.all(
                    data.results.map(async (pokemon: any) => {
                        const pokemonResponse = await fetch(pokemon.url);
                        const pokemonInfo = await pokemonResponse.json();
                        return {
                            id: pokemonInfo.id,
                            name: pokemonInfo.name,
                            sprites: pokemonInfo.sprites,
                        };
                    })
                );
                setPokemons(pokemonData);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="pokemon-list">
            <h1>Pokémon List</h1>
            <ul>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.id}>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;

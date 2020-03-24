import React, { useState, useEffect } from 'react';

export default function App() {

    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        async function fetchData () {
            const response = await fetch('https://api.github.com/users/lucaslz/repos');
            const data = await response.json();
            setRepositories(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const favoriteRepositories = repositories.filter( repo => repo.favorite );

        document.title = `Você tem ${favoriteRepositories.length} favoritos!`;
    }, [repositories]);

    function handleClickFavoritar(id) {
        const newRepositories = repositories.map( repo => {
            return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
        });
        setRepositories(newRepositories);
    }

    return (
        <ul>
            {repositories.map(repo => (
                <li key={repo.id}>
                    {repo.name} |&nbsp;
                    {repo.favorite && <span>Favorito |&nbsp;</span>}
                    <button onClick={() => handleClickFavoritar(repo.id)}>Favoritar</button>
                </li>
            ))}
        </ul>
    );
}
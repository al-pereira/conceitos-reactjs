import React from "react";

import "./styles.css";
import { useState, useEffect } from "react";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New repository - ${Date.now()}`,
      url: "github.com",
      techs: [
        "Node",
        "Express",
        "TypeScript"
      ],
      likes: 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204){
      const repositoryListUpdated = repositories.filter(r => r.id !== id);    
      setRepositories(repositoryListUpdated);
    }    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

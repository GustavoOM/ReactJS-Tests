import React, {useState, useEffect} from "react";

import api from "./services/api"

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Novo repositório ${Date.now()}`,
      url: `http://${Date.now()}`,
      techs: ["JavaScript", "Node"]
    })
    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const filterRepositories = repositories.filter(repository => repository.id !== id)
    setRepositories(filterRepositories)
  }
  //{repositories.map(repository => <li key={repository.id}><br/>Nome: {repository.title}<br/>URL: {repository.url}<br/>Techs: {repository.techs} <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>)}
  return (
    <div>
      <h1>Repositories</h1>
      <ul data-testid="repository-list">
      {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

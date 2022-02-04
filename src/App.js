import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newTodoText, setNewTodoText] = useState(""); //"" null type



  const loadPost = async () => {
    const response = await axios.get('http://localhost:4000/api/todos');
    console.log("response of todo api", response.data.data.todos);
    setPosts(response.data.data.todos);
  }

  useEffect(() => {

    loadPost()
  }, [])

  useEffect(() => {
    console.log("here is new todo text", newTodoText)
  }, [newTodoText]) //if there is change in new todo text then trigger

  const createPostApi = async () => {
    await axios.post('http://localhost:4000/api/todos', {
      "text": newTodoText
    })
    loadPost()

  }

  const deleteApi = async (item) => {
    console.log("delete api", item.id);
    await axios.post('http://localhost:4000/api/todoss', {
      "id": item.id
    })
    loadPost()

  }

  return (
    <div>

      <h1>Todo App</h1>
      <input type="text" onChange={(e) => { setNewTodoText(e.target.value) }} />
      <button onClick={() => createPostApi()}>Add</button>

      {
        posts.length
          ? posts && posts.map(item => (
            <div>
              <h4>{item.text}</h4>

              <button onClick={() => deleteApi(item)}>Delete</button>

            </div>
          ))
          : <h4>no data</h4>
      }

    </div>
  );
}

export default App;


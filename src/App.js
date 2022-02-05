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
    <div className='maincontainer'>
      <div className='container'>

        <h1>Todo App</h1>
        <input type="text" placeholder='write your todo' onChange={(e) => { setNewTodoText(e.target.value) }} />
        <button className='btnadd' onClick={() => createPostApi()}>Add</button>

        {
          posts.length
            ? posts && posts.map(item => (
              <div className='displayTodo'>
                <h3>{item.text}</h3>

                <button className='btndelete' onClick={() => deleteApi(item)}>Delete</button>

              </div>
            ))
            : <h3>no data</h3>
        }

      </div>
    </div>
  );
}

export default App;


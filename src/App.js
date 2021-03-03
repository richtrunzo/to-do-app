import './App.css';
import React, { useState, useEffect } from "react";

function Todo({todo, index, completeTodo, deleteTodo}) {
  return <div style={{textDecoration: todo.isCompleted ? 'line-through' : ""}} className="todo d-flex justify-content-center bg-light bg-gradient mt-3 rounded-pill dshadow animate__animated animate__bounceInLeft
">
           <div className="text">{todo.text}</div>
          <div className="mt-2 mx-4">
            <button className="btn btn-lg btn-outline-success" onClick={() => completeTodo(index)}>Complete</button>
            <button className="btn btn-lg btn-outline-danger ms-2" onClick={() => deleteTodo(index)}>Delete</button>
          </div>
        </div>

}

function Todoform({addtodo}) {
  const [value, setvalue] = useState('');

  const handleSubmit = e => {
  e.preventDefault();
  if(!value) return;
  addtodo(value);
  setvalue("")
  }


  return (<form className="d-flex justify-content-center mt-3" onSubmit={handleSubmit}>
          <input type="text" value={value} placeholder="Add a todo..." className="form-width text" onChange={e => setvalue(e.target.value)}></input>
        </form>)

}

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      setTodos(todos);
    }
  }, []);

const addtodo = text => {
  const newTodos = [...todos, {text}];
  setTodos(newTodos)
  console.log(todos)
  let todosJSON = JSON.stringify(newTodos);
  localStorage.setItem('todos', todosJSON)
}

const completeTodo = index => {
  const newTodos = [...todos];
  newTodos[index].isCompleted = true;
  setTodos(newTodos);
  let todosJSON = JSON.stringify(newTodos);
  localStorage.setItem('todos', todosJSON)

}

const deleteTodo = index => {
  const newTodos = [...todos];
  newTodos.splice(index, 1)
  setTodos(newTodos);
  let todosJSON = JSON.stringify(newTodos);
  localStorage.setItem('todos', todosJSON)
}

return <div className="app">
        <div className="head mx-auto">
          <h1 className="text-center mt-2 mb-3 head-text">Coding Todos</h1>
          {todos.map((todo, index) => {
            return <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} />
          })}
          <Todoform addtodo={addtodo}/>
        </div>
      </div>

}

export default App;

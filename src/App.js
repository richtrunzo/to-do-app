import './App.css';
import React, { useState, useEffect } from "react";

function Todo({todo, index, completeTodo, deleteTodo}) {
  return <div style={{textDecoration: todo.isCompleted ? 'line-through' : ""}} className="todo">
          {todo.text}
          <div>
            <button onClick={() => completeTodo(index)}>Complete</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
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


  return (<form onSubmit={handleSubmit}>
          <input type="text" value={value} className="input" onChange={e => setvalue(e.target.value)}></input>
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
        <div className="todolist">
          {todos.map((todo, index) => {
            return <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} />
          })}
          <Todoform addtodo={addtodo}/>
        </div>
      </div>

}

export default App;

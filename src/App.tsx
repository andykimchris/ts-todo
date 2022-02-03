import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import InputField from './components/InputField';
import { TodoState } from './model';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<TodoState[]>([]);
  const id: string = uuid();

  const handleTodoAddition = (e: React.FormEvent) => {
    e.preventDefault();
    if(todo) {
      const todo_obj = { id: id, todo: todo, isComplete: false };
      const newTodoList: TodoState[]  = [...todoList,  todo_obj]
      setTodoList(newTodoList); 
    }
  }

  return (
    <div className="App">
      <span className="heading">
        Todo List
      </span>
      <InputField todo={todo} setTodo={setTodo} handleTodoAddition={handleTodoAddition}/>
      <ul>
        {todoList.map((task) => {
          return <li key={task.id}>{ task.todo }</li>
        })}
      </ul>
    </div>
  );
};

export default App;

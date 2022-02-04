import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { TodoState } from './model';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<TodoState[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoState[]>([]);
  const id: string = uuid();

  const handleTodoAddition = (e: React.FormEvent) => {
    e.preventDefault();
    if(todo) {
      const todo_obj = { id: id, todo: todo, isComplete: false };
      const newTodoList: TodoState[]  = [...todoList,  todo_obj]
      setTodoList(newTodoList); 
    }
    setTodo('')
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result
    console.log(result)

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    let add;
    let active = todoList
    let completed = completedTodos

    if (source.droppableId === "TodosList") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = completed[source.index]
      completed.splice(source.index, 1)
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add)
    } else {
      completed.splice(destination.index, 0, add)
    }

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
       <div className="App">
        <span className="heading">
          Todo List
        </span>
        <InputField todo={todo} setTodo={setTodo} handleTodoAddition={handleTodoAddition}/>
        <TodoList todos={todoList} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} setTodoList={setTodoList} />
      </div>
    </DragDropContext>
   
  );
};

export default App;

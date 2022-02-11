import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { TodoState } from './model';
import { useLocalStorage } from "./hooks/useLocalStorage"

const App: React.FC = () => {

  const [todoList, setTodoList] = useLocalStorage("TodosList", []);
  const [todo, setTodo] = useState<string>('');
  const [completedTodos, setCompletedTodos] = useLocalStorage("TodosListCompleted", []);
  const id: string = uuid();

  const handleTodoAddition = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const todo_obj = { id: id, todo: todo, isComplete: false };
      const newTodoList: TodoState[] = [...todoList, todo_obj]
      setTodoList(newTodoList);
    }
    setTodo('')
  }

  useEffect(() => {
    localStorage.setItem("TodosList", JSON.stringify(todoList));
    localStorage.setItem("TodosListCompleted", JSON.stringify(completedTodos));
  }, [todoList, completedTodos]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    let add;
    let active = todoList
    let completed = completedTodos

    // Mark task as complete or incomplete AND add task to todoList or completedTodos array 
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

    if (source.droppableId === "TodosList" && destination.droppableId === "TodosListCompleted") {
      const updatedTodos = completedTodos.map((todo: TodoState) =>
        todo.id === draggableId ? { ...todo, isComplete: !todo.isComplete } : todo
      )
      setCompletedTodos(updatedTodos)
    } else if (source.droppableId === "TodosListCompleted" && destination.droppableId === "TodosList") {
      const updatedTodos = todoList.map((todo: TodoState) =>
        todo.id === draggableId ? { ...todo, isComplete: !todo.isComplete } : todo
      )
      setTodoList(updatedTodos)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">
          Todo List
        </span>
        <h3>
          Drag & Drop
        </h3>

        <InputField todo={todo} setTodo={setTodo} handleTodoAddition={handleTodoAddition} />
        <TodoList todos={todoList} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} setTodoList={setTodoList} />
      </div>
    </DragDropContext>
  );
};

export default App;

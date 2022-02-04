import { TodoState } from "../model";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";

interface SingleTodoProps {
  todos: TodoState[];
  task: TodoState;
  index: number;
  setTodoList: React.Dispatch<React.SetStateAction<TodoState[]>>;
}

const SingleTodo = ({ index, task, todos, setTodoList }: SingleTodoProps) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(task.todo);

    const handleEdit = (e: React.FormEvent, task: TodoState) => {
        e.preventDefault();
        const updatedTodos: TodoState[] = todos.map((todo) =>
            todo.id === task.id ? { ...todo, todo: editTodo } : todo
        )
        setTodoList(updatedTodos)
        setEdit(false)
    }
    
    const handleDelete = (task: TodoState) => {
        if (task.isComplete) {
            const updatedTodos: TodoState[] = todos.filter((todo) => todo.id !== task.id)
            setTodoList(updatedTodos)
        } else {
            const updatedTodos: TodoState[] = todos.filter((todo) => todo.id !== task.id)
            setTodoList(updatedTodos)
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus()
    })

    return ( 
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <form 
                    className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                    onSubmit={e => handleEdit(e, task)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                { edit ? (
                    <input 
                        ref={inputRef}
                        value={editTodo}
                        onChange={e => setEditTodo(e.target.value)}
                        className="todos__single--text"
        
                    />
                ) : task.isComplete ? (
                    <s className="todos__single--text">{task.todo}</s>
                ) : (
                    <span className="todos__single--text">{task.todo}</span>
                )}

                {!task.isComplete && <span className="icon" 
                    onClick={() => {
                        if (!edit && !task.isComplete) {
                        setEdit(!edit)  
                        }
                }}>
                    <AiFillEdit />
                </span>}
                <span className="icon" onClick={() => handleDelete(task)}>
                    <AiFillDelete />
                </span>
            </form>
        )}  
    </Draggable>
    );
}
 
export default SingleTodo;
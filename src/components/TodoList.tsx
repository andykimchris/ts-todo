import './styles.css'
import { TodoState } from '../model';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface TodoListProps {
    todos: TodoState[];
    setTodoList: React.Dispatch<React.SetStateAction<TodoState[]>>;
    completedTodos: TodoState[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<TodoState[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodoList, completedTodos, setCompletedTodos }) => {
    return ( 
        <div className="container">
            <Droppable droppableId="TodosList"
            >
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : "" }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                    <span className="todos__heading">
                          Active
                    </span>
                      {todos.map((task, idx) => {
                          return <SingleTodo index={idx} key={task.id} task={task} todos={todos} setTodoList={setTodoList} />
                      })}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>

            <Droppable droppableId="TodosListCompleted">
                {(provided, snapshot) => (
                <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : "" }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <span className="todos__heading">
                          Completed
                    </span>
                      {completedTodos.map((task, idx) => {
                          return <SingleTodo index={idx} key={task.id} task={task} todos={completedTodos} setTodoList={setCompletedTodos} />
                      })}
                {provided.placeholder}
                </div>
                )}
            </Droppable>

        </div>
    );
}
 
export default TodoList;



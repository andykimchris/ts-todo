import { useRef } from 'react';
import './styles.css';

interface InputFieldProps {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleTodoAddition: (e: React.FormEvent) => void;
}
 
const InputField: React.FC<InputFieldProps> = ({ todo, setTodo, handleTodoAddition }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return ( 
        <form className="form-input" onSubmit={(e) => {
            handleTodoAddition(e)
            inputRef.current?.blur()
        }}>
            <input
                type="text"
                placeholder="Add Todo"
                className="input__box"
                ref={inputRef}
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
        <button type="submit" className="input_submit">Add</button>
      </form>
     );
}
 
export default InputField;
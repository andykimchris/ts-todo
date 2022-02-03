import './styles.css';

interface InputFieldProps {
    
}
 
const InputField: React.FC<InputFieldProps> = () => {
    return ( 
        <form className="form-input">
            <input
                type="text"
                placeholder="Add Todo"
                className="input__box"
            />
        <button type="submit" className="input_submit">Add</button>
      </form>
     );
}
 
export default InputField;
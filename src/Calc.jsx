import { useState } from "react"
import './Calc.css'

function Calc() {
const [Input, setInput] = useState('');

const handleInput = (value) =>{
 setInput((prevInput) => prevInput + value);
}

const clearInput = () =>{
setInput('');
}
const calculateResult = () => {
  try {
    setInput(eval(Input)); // Using eval for simplicity, consider using a safer alternative
  } catch (error) {
    setInput('Error');
  }
};

  
return (
    <>
      <div className="calculator-grid">
         <div className="output">
            <input type="text" value={Input}  readOnly/>
         </div>

         <button onClick={() => clearInput()} className="span-two" >AC</button>
         <button onClick={() => clearInput()}>Del</button>
         <button onClick={()=> handleInput('/')}>/</button>
         <button onClick={()=>handleInput('1')}>1</button>
         <button onClick={()=>handleInput('2')}>2</button>
         <button onClick={()=>handleInput('3')}>3</button>
         <button onClick={()=>handleInput('*')}>*</button>
         <button onClick={()=>handleInput('4')}>4</button>
         <button onClick={()=>handleInput('5')}>5</button>
         <button onClick={()=>handleInput('6')}>6</button>
         <button onClick={()=>handleInput('+')}>+</button>
         <button onClick={()=>handleInput('7')}>7</button>
         <button onClick={()=>handleInput('8')}>8</button>
         <button onClick={()=>handleInput('9')}>9</button>
         <button onClick={()=>handleInput('-')}>-</button>
         <button onClick={()=>handleInput('.')}>.</button>
         <button onClick={()=>handleInput('0')}>0</button>
         <button onClick={()=> calculateResult()}  className="span-two">=</button>
       
      </div>
    </>
  )
}

export default Calc

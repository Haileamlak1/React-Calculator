import { useReducer } from "react"
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

   export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    DELETE_DIGIT: 'delete-digit',
    CLEAR: 'clear-everything',
    EVALUATE: 'evaluate'
  }

  const reducer = (state, {type, payload}) =>{

       switch(type){
        case ACTIONS.ADD_DIGIT:
            if(payload.digit === '0' && state.currentOperand === '0') return state;
            if(payload.digit === '.' && (state.currentOperand || '').includes('.')) return state
            return{
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }
        case ACTIONS.CHOOSE_OPERATION:
            if(state.previousOperand == null && state.currentOperand == null) return state;
            
            if(state.currentOperand == null){
                return{
                    ...state,
                    operation: payload.operation,
                }
            }
            if(state.previousOperand == null){
                return{
                    ...state,
                    previousOperand: state.currentOperand,
                    operation: payload.operation,
                    currentOperand: null
                }
            }

            return{
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null
            }
        case ACTIONS.DELETE_DIGIT:
            if(state.currentOperand == null && 
                state.previousOperand == null && state.operation == null){
                    return state
                }
            if(state.currentOperand == null) return{
                ...state,
                previousOperand: state.previousOperand.slice(0, -1)
            }
            if((state.currentOperand.length == 1) || ""){
                return{
                    ...state,
                    currentOperand: null
                }
            }
            return{
                ...state,
                currentOperand: (state.currentOperand).slice(0, -1)
            }
        case ACTIONS.CLEAR:
            if(state.currentOperand == null && 
                state.previousOperand == null && state.operation == null){
                    return state
            }
            if(state.currentOperand != null || 
                state.previousOperand != null || state.operation != null){
                    return {}
            }
        case ACTIONS.EVALUATE:
            if(state.currentOperand == null || 
                state.previousOperand == null || state.operation == null){
                    return state
            }
            if(state.currentOperand != null && 
                state.previousOperand != null && state.operation != null){
                    return {
                        ...state,
                        previousOperand: null,
                        operation: null,
                        currentOperand: evaluate(state)
                    }
            }

    }
  }
const evaluate = ({currentOperand, previousOperand, operation}) =>{
    const pre = parseFloat(previousOperand)
    const cur = parseFloat(currentOperand)
    if(isNaN(pre) || isNaN(cur)) return "";
    const op = operation
    let result = ''

       switch(op){
        case '+':
            result = pre + cur
            break
        case '*':
            result = pre * cur
            break
        case '-':
            result = pre - cur
            break
        case '/':
            result = pre / cur
            break
       }
       return result.toString()
}

const Intformater = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 0,
})

const formatOperand = (operand) =>{
     if(operand == null) return
     const [integer, decimal] = operand.split('.')
     if(decimal == null) return Intformater.format(integer);

     return `${Intformater.format(integer)}.${decimal}`
}

export default function App(){

    const [{previousOperand, currentOperand, operation}, dispatch] = useReducer(reducer, {})
    
    return (
        <div>
            <div className="calc-grid">
                <div className="output-div">
                    <div className="previousOperand">{formatOperand(previousOperand)}{operation}</div>
                    <div className="currentOperand">{formatOperand(currentOperand)}</div>
                </div>
                <button className="span-two" onClick={()=>dispatch({type: ACTIONS.CLEAR})}>AC</button>
                <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>Del</button>
                <OperationButton dispatch={dispatch} operation= '/'/>
                <DigitButton dispatch={dispatch} digit= '1'/>
                <DigitButton dispatch={dispatch} digit= '2'/>
                <DigitButton dispatch={dispatch} digit= '3'/>
                <OperationButton dispatch={dispatch} operation= '*'/>
                <DigitButton dispatch={dispatch} digit= '4'/>
                <DigitButton dispatch={dispatch} digit= '5'/>
                <DigitButton dispatch={dispatch} digit= '6'/>
                <OperationButton dispatch={dispatch} operation= '+'/>
                <DigitButton dispatch={dispatch} digit= '7'/>
                <DigitButton dispatch={dispatch} digit= '8'/>
                <DigitButton dispatch={dispatch} digit= '9'/>
                <OperationButton dispatch={dispatch} operation= '-'/>
                <DigitButton dispatch={dispatch} digit= '.'/>
                <DigitButton dispatch={dispatch} digit= '0'/>
                <button className="span-two" onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button>
            </div>
        </div>
    )
}

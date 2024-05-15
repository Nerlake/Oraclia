
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import Typewriter from './TypeWriter'
import { TypeAnimation } from 'react-type-animation'

function App() {

  const defaultQuestion = 'Oraclia veux tu repondre a cette question?'
  const [isAutoComplete, setIsAutoComplete] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const [hiddenInputValue, setHiddenInputValue] = useState('');
  const [lastIndex, setLastIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [question, setQuestion] = useState('');

  const handleChange = (e, defaultValue= undefined) => {
    if(defaultValue !== undefined){
      setInputValue(defaultValue);
      return;
    }
    const length = e.target.value.length;
    if(length == 0){
      setInputValue('');
      setHiddenInputValue('');
      setLastIndex(0);
      return;
    }
    const defaultQuestionLength = defaultQuestion.length;
    if(length > defaultQuestionLength){
      setIsAutoComplete(false);
      return;
    }
    const currentLetter = e.nativeEvent.data;
    if (isAutoComplete) {
      const letter = getLetter();
      if(letter === undefined){
        setIsAutoComplete(false);
        return;
      }
      if(currentLetter === null){
        setInputValue(inputValue.substring(0, inputValue.length - 1));
        setLastIndex(lastIndex - 1);
      }
      else{
        setInputValue(inputValue + letter);
      }

      //valeur caché

      if(currentLetter === "."){
        return;
      }
      if(currentLetter === null){
        setHiddenInputValue(hiddenInputValue.substring(0, hiddenInputValue.length - 1));
      }
      else{
        const hiddenValue = hiddenInputValue + currentLetter;
        setHiddenInputValue(hiddenValue);
        console.log(hiddenValue);
      }

    }
    else{
      setInputValue(e.target.value);
      setLastIndex(0);
    }
    // setInputValue(e.target.value);
  };

  const getLetter = () => {
    const letter = defaultQuestion[lastIndex];
    setLastIndex(lastIndex + 1);
    return letter;
  }

  

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey) {
        if(isAutoComplete){
          setIsAutoComplete(false);
        }
        else{
          const letter = getLetter();
          handleChange(null, letter);
          setIsAutoComplete(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup de l'événement
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputValue]);




  return (
    <div className='max-h-screen flex flex-col'>
      <div className='flex h-24 w-full bg-black justify-center text-white items-center font-bold text-5xl'>Oraclia</div>
      <div className='flex h-screen w-full  bg-default-background items-center justify-center p-40'>
        <div className='h-full w-full bg-gray-900 rounded-xl flex flex-col items-center justify-center px-10 gap-5'>
          <h1 className='text-white text-4xl'>Posez moi votre question !</h1>
          <div className='flex gap-5 w-full justify-center items-center '>
            <input type="text" className='text-center h-14 w-2/3 text-xl' placeholder='Votre demande' value={inputValue} onChange={handleChange} disabled={isDisabled}/>
          </div>
          <div className='flex gap-5 w-full justify-center items-center'>
            <input type="text" className='text-center h-14 w-2/3 text-xl' placeholder='Question' disabled={isDisabled} value={question} onChange={(e) => setQuestion(e.target.value)} />
          </div>
          <div className='w-full flex justify-center text-white text-xl gap-5'>
            <button className='bg-red-700 w-32 h-12' onClick={()=>{
              setIsDisabled(true)
              setDisplayText(hiddenInputValue)}}>Verifier</button>
                          <button className='bg-red-700 w-32 h-12' onClick={()=>{
                            setIsDisabled(false)
                            setInputValue('')
                            setHiddenInputValue('')
                            setLastIndex(0)
                            setDisplayText('')
                            setQuestion('')
                            }}>Reset</button>
          </div>
          <div className='flex flex-col items-center w-full gap-5'>
            <h2 className='text-white text-2xl'>Reponse</h2>
            <p className='text-white text-xl'>{displayText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

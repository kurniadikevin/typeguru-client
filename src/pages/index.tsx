import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const [status,setStatus]= useState('null');
  const [index,setIndex]= useState(0);
  const [error,setError]= useState<number>(0);
  //const [timeCount,setTimeCount]= useState(false);
  const [timeElapse,setTimeElapse]= useState<number>(0);
  //const[ inter,setInter]= useState(true);
  const [intervalId,setIntervalId]= useState<any>();
  const [playOn,setPlayOn]= useState(true)
  let count: number=0;


  const sampleText: string='hello world';

// check if the type character is same as the sample text
 const typeCheck=(event: any)=>{
  // typing true
  if(event.key === sampleText[index]){
    setIndex(()=> index+ 1)
    setStatus('true');
    // typing finish
  } else if( index === sampleText.length && playOn === true){
    const grossWpm= (sampleText.length / 5  )/ (timeElapse / 60); 
    alert('game stop in'+ (timeElapse));
    alert('grossWpm : '+ grossWpm);
    alert( 'error :' + error);
    setStatus('finish');
    setPlayOn(false);
    clearInterval(intervalId);// late finish game one keydown after finish
  } 
  // typing condition false
  else{
    setStatus('false');
    setError(()=> error + 1);
  }
 }

const increaseTimeElapse=()=>{
  count++;
  setTimeElapse(count);
}

 const startGame=()=>{
  const textInput: any= document.querySelector('#text-input');
  textInput.value='';
  textInput.focus()
  setPlayOn(true);
  setIndex(0);
  setError(0);
  clearInterval(intervalId)
  const Interval=setInterval(increaseTimeElapse, 1000);
  setIntervalId(Interval);
  return (()=> clearInterval(Interval)) 
}

const stopGame=()=>{
  console.log('stop')
  clearInterval(intervalId)
  setTimeElapse(0);
}


  useEffect(()=>{
  
  },[])



  return (
    <div className='h-full flex flex-col items-center justify-center border-2 gap-5'>
      <div className='h-20'>
        <h1>Typing test</h1>
      </div>
      <div>time elapse: {timeElapse}</div>
      <div className='h-12'>{sampleText}</div>
      <textarea onKeyDown={typeCheck} id='text-input'
      className='text-black h-20 resize-none'></textarea>
      <div > Status: {status}</div>
      <button onClick={startGame}>start</button>
      <button onClick={stopGame}> stop</button>
    </div>
  )
}


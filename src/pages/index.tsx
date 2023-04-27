import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import {textData} from '../../textData';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [status,setStatus]= useState('null');
  const [index,setIndex]= useState(0);
  const [error,setError]= useState<number>(0);
  const [timeElapse,setTimeElapse]= useState<number>(0);
  const [intervalId,setIntervalId]= useState<any>();
  const [playOn,setPlayOn]= useState(true);
  const [textIndex,setTextIndex]= useState<number>(0);
  const [wordIndex,setWordIndex]= useState<number>(0);
  let count: number=0;

  const sampleText: string = textData[textIndex];
  const sampleTextArr: string[]= textData[textIndex].split(' ');
  const userText : string[]=[];

 const typeWordCheck=(event: any)=>{
  const textAreaInput: any= document.querySelector('#text-input');
  console.log(wordIndex+ 'wordIndex')
  console.log(index+ 'index')
  //checkForFinish()
  if( event.key !== 'Backspace'){
    setIndex(()=> index+ 1);
    if(event.key === ' '  ){
      checkForError(textAreaInput.value);
      userText.push(textAreaInput.value);
      setWordIndex(()=> wordIndex + 1);
      textAreaInput.value='';
      setIndex(0);
      } 
    //game finish condition
    else if( 
      wordIndex === sampleTextArr.length -1 &&
       index === (sampleTextArr[sampleTextArr.length -1].length) -1
    ){
      setTimeout(()=>{
        userText.push(textAreaInput.value);
        textAreaInput.value='';
        setPlayOn(false);
        clearInterval(intervalId);
        alert('finish');
        checkForResult(timeElapse,sampleText.length);
      },100)
    }
  }else if(event.key === 'Backspace' && index > 0){
    setIndex(()=> index -1)
  }
 }

const checkForError=(input: string)=>{
  console.log(sampleTextArr[wordIndex] + '=' + input)
  if(sampleTextArr[wordIndex] !== input.replace(/ /g, '')){
    setError(()=> error + 1)
  }
}

const checkForResult=(time:number,textLength:number)=>{
  const grossWpm= (textLength / 5  )/ (time / 60); 
  console.log('gross Wpm: ' +grossWpm);
  const errorWpm= error / (time/60);
  console.log('error wpm: '+errorWpm);
  const nettWpm= grossWpm - errorWpm;
  console.log('nett wpm:' + nettWpm);
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
  setWordIndex(0);
  setError(0);
  selectRandomText();
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

//random text to input
const selectRandomText=()=>{
  setTextIndex(Math.floor(Math.random()* textData.length) )
}

const highlightOnGoindWord=()=>{
  const words: any= document.querySelectorAll('#sample-word');
  words.forEach((item: any)=>{
    item.style.color='white'
  })
  words[wordIndex].style.color='red';
}


useEffect(()=>{
  selectRandomText()
  },[])

useEffect(()=>{
  highlightOnGoindWord()
},[wordIndex])


  return (
    <div className='h-full flex flex-col items-center justify-center border-2 gap-5'>
      <div className='h-20'>
        <h1>Typing test</h1>
      </div>
      <div>time elapse: {timeElapse}</div>
      <div className='h-12 flex flex-row gap-2'>
        {sampleTextArr.map((item)=>{
          return(
            <div id='sample-word'>
               {item}
            </div>
          )
        })}
        </div>
      <textarea onKeyDown={typeWordCheck} id='text-input'
      className='text-black h-20 resize-none'></textarea>
      <div>index: {index}</div>
      <div>Error: {error}</div>
      <div > Status: {status}</div>
      <button onClick={startGame}>start</button>
      <button onClick={stopGame}> stop</button>

    </div>
  )
}


import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import {textData} from '../../textData';
import 'material-icons/iconfont/material-icons.css'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [index,setIndex]= useState(0);
  const [error,setError]= useState<number>(0);
  const [timeElapse,setTimeElapse]= useState<number>(0);
  const [intervalId,setIntervalId]= useState<any>();
  const [playOn,setPlayOn]= useState(false);
  const [textIndex,setTextIndex]= useState<number>(0);
  const [wordIndex,setWordIndex]= useState<number>(0);
  const [wpm,setWpm]= useState<number>();
  let count: number=0;

  const sampleText: string = textData[textIndex];
  const sampleTextArr: string[]= textData[textIndex].split(' ');
  const userText : string[]=[];

 const typeWordCheck=(event: any)=>{
  const textAreaInput: any= document.querySelector('#text-input');
  if( event.key !== 'Backspace' && event.key !== 'Shift'){
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
  setWpm(nettWpm);
}

const increaseTimeElapse=()=>{
  count++;
  setTimeElapse(count);
}

 const restartGame=()=>{
  const textInput: any= document.querySelector('#text-input');
  textInput.value='';
  textInput.focus();
  setPlayOn(false);
  setIndex(0);
  setWordIndex(0);
  setError(0);
  selectRandomText();
  setTimeElapse(0);
  clearInterval(intervalId);
  setWpm(0)
}

const startTimer=()=>{
  clearInterval(intervalId);
  const Interval=setInterval(increaseTimeElapse, 1000);
  setIntervalId(Interval);
  return (()=> clearInterval(Interval)) 
}

const stopGame=()=>{
  console.log('stop')
  clearInterval(intervalId)
  setTimeElapse(0);
}

const triggerStartGameOnType=(event:any)=>{
  console.log(event.key)
  if(playOn===false && event.key !== 'Tab' && event.key !== 'Shift'){
    startTimer();
    setPlayOn(true)
    typeWordCheck(event);
  } else{
    typeWordCheck(event)
  }
}

//random text to input
const selectRandomText=()=>{
  setTextIndex(Math.floor(Math.random()* textData.length) )
}

const highlightOnGoingWord=()=>{
  const words: any= document.querySelectorAll('#sample-word');
  words.forEach((item: any)=>{
    item.style.color='white'
  })
  if(words[wordIndex]){
    words[wordIndex].style.color='red';
  }
}

const  displayCorrectTime=(input:number) :string=>{
    let minutes:number= Math.floor(input /60);
    let seconds:number = input % 60;
    if(minutes===0){
      return `${seconds}`
    } else{
    return `${minutes} : ${seconds}`
    }
  }


useEffect(()=>{
  selectRandomText();
  const textInput: any= document.querySelector('#text-input');
  textInput.focus()
  },[])

useEffect(()=>{
  if(sampleTextArr){
      highlightOnGoingWord()
  }
},[wordIndex])


  return (
    <div className='h-full flex flex-col items-center justify-center gap-5'>
      <div className='h-10 border-2'>
        <div className='text-3xl'>Typing test</div>
      </div>
      <div>Elapse time: {displayCorrectTime(timeElapse)}</div>
      <div>index: {index}</div>
      <div>Error: {error}</div>
      <div > PlayOn: {playOn ? 'true': 'false'}</div>
      <div>Wpm: {wpm}</div>
      <div className='flex flex-wrap gap-2 bg-neutral-900 p-5
       max-w-2xl mb-2'>
        {sampleTextArr.map((item)=>{
          return(
            <div id='sample-word' className='text-lg'>
               {item}
            </div>
          )
        })}
        </div>
      <textarea onKeyDown={triggerStartGameOnType} id='text-input'
      className='text-black w-30 h-10 resize-none text-lg bg-neutral-900
      overlow-hidden text-white focus:text-red '
      ></textarea>
      <button onClick={restartGame}>
      <span className="material-icons">refresh</span>     
      </button>
      <button onClick={stopGame} >
      <span className="material-icons">stop</span>     
      </button>

    </div>
  )
}


import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import {textData,fetchRandomParagraph} from '../../textData';
import 'material-icons/iconfont/material-icons.css';
import { LoaderBuble } from '@/components/loader';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [textTarget,setTextTarget]= useState<string>('');
  const [targetTextLength,setTargetTextLength]= useState<number>(5);// default length medium 5 paragraph
  const [index,setIndex]= useState(0);
  const [error,setError]= useState<number>(0);
  const [timeElapse,setTimeElapse]= useState<number>(0);
  const [intervalId,setIntervalId]= useState<any>();
  const [playOn,setPlayOn]= useState(false);
  const [wordIndex,setWordIndex]= useState<number>(0);
  const [wpm,setWpm]= useState<number>();
  let count: number=0;

  
  const sampleText: string = textTarget;// text input target
  const sampleTextArr: string[]= sampleText.split(' ');
  const userText : string[]=[];

 const typeWordCheck=(event: any)=>{
  const textAreaInput: any= document.querySelector('#text-input');
  // exception key that not increase index backspace and shift
  if( event.key !== 'Backspace' && event.key !== 'Shift'){
    setIndex(()=> index+ 1);
    // push word when keydown space
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
        checkForResult(timeElapse,sampleText.length);
      },100)
    }
  }// reduce index when backspacing and index is more than zero
  else if(event.key === 'Backspace' && index > 0){
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
    selectRandomText(targetTextLength);
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
    clearInterval(intervalId)
    setTimeElapse(0);
  }

  const triggerStartGameOnType=(event:any)=>{
    if(playOn===false && event.key !== 'Tab' && event.key !== 'Shift'){
      startTimer();
      setPlayOn(true)
      typeWordCheck(event);
    } else{
      typeWordCheck(event)
    }
  }

  //random text to input
  const selectRandomText= async(paragraphLength: number)=>{
    //setTextIndex(Math.floor(Math.random()* textData.length) )
    setTextTarget('')
    setTextTarget(await fetchRandomParagraph(1,paragraphLength))
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

  const displayCorrectTime=(input:number) :string=>{
      let minutes:number= Math.floor(input /60);
      let seconds:number = input % 60;
      if(minutes===0){
        return `${seconds}`
      } else{
      return `${minutes} : ${seconds}`
      }}

  const selectTextLength=(length:number, index: number)=>{
    const lengthSelects : any= document.querySelectorAll('#length-select');
    for(let i=0; i< lengthSelects.length;i++){
      lengthSelects[i].style.backgroundColor='rgb(38,38,38)';
    }
    lengthSelects[index].style.backgroundColor='rgb(23 23 23)';
    setTargetTextLength(length);
  } 

  useEffect(()=>{
    selectRandomText(targetTextLength);
    const textInput: any= document.querySelector('#text-input');
    textInput.focus()
    },[])

  useEffect(()=>{
    if(sampleTextArr){
        highlightOnGoingWord()
    }
  },[wordIndex])

  useEffect(()=>{
    restartGame()
  },[targetTextLength])


  return (
    <div className='h-full flex flex-col items-center justify-center gap-5'>
      <div className='h-10 '>
        <div className='text-3xl'>TYPEGURU</div>
      </div>
      <div className='flex flex-row gap-10 font-bold bg-neutral-900 p-6 rounded-xl'>
        <div>Time : {displayCorrectTime(timeElapse)}</div>
        <div>Char : {index}</div>
        <div> Word : {wordIndex}</div>
        <div>Error : {error}</div>
        <div > PlayOn : {playOn ? 'true': 'false'}</div>
        <div>WPM : {wpm?.toFixed(1)}</div>
      </div>

      <div className='flex gap-2'>
        <div>{targetTextLength}</div>
        <div className='bg-neutral-800 px-4 py-2 rounded-xl cursor-pointer hover:bg-neutral-900' 
        id='length-select' onClick={()=>selectTextLength(2,0)}>Short</div>
        <div className='bg-neutral-800 px-4 py-2 rounded-xl cursor-pointer hover:bg-neutral-900'
          id='length-select' onClick={()=>selectTextLength(5,1)}>Medium</div>
        <div className='bg-neutral-800 px-4 py-2 rounded-xl cursor-pointer hover:bg-neutral-900'
          id='length-select' onClick={()=>selectTextLength(10,2)}>Long</div>
      </div>

      {textTarget ?
        <div className='flex flex-wrap gap-2 bg-neutral-900 p-5 rounded-xl
        max-w-4xl mb-2'>
          {sampleTextArr.map((item)=>{
            return(
              <div id='sample-word' className='text-xl'>
                {item}
              </div>
            )
          })}
          </div> : <LoaderBuble/>
        }
      <input onKeyDown={triggerStartGameOnType} id='text-input'
      className='text-black w-30 h-12 p-3 resize-none text-2xl bg-neutral-900
      overlow-hidden text-white focus:text-red '
      ></input>
      <div className='flex flex-row gap-10'>
        <button onClick={restartGame}>
        <span className="material-icons">refresh</span>     
        </button>
        <button onClick={stopGame} >
        <span className="material-icons">stop</span>     
        </button>
      </div>
    </div>
  )
}


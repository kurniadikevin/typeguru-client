import { useEffect, useState } from 'react';
import {textData,fetchRandomParagraph} from '../textData';
import 'material-icons/iconfont/material-icons.css';
import { LoaderBuble } from '@/components/loader';
import { ResultComponent } from '@/components/results';
import { displayCorrectTime, highlightOnGoingWord, changePrimaryColor, changeInputVisibility } from '@/functions';

export default function Home() {

  const [gameMode,setGameMode]= useState<string>('word');
  const [countDown,setCountDown]= useState<number>(15);
  const [textTarget,setTextTarget]= useState<string>('');
  const [targetTextLength,setTargetTextLength]= useState<number>(5);// default length medium 5 paragraph
  const [index,setIndex]= useState(0);
  const [error,setError]= useState<number>(0);
  const [timeElapse,setTimeElapse]= useState<number>(0);
  const [intervalId,setIntervalId]= useState<any>();
  const [playOn,setPlayOn]= useState(false);
  const [wordIndex,setWordIndex]= useState<number>(0);
  const [wpm,setWpm]= useState<number>();
  const [grossWpm,setGrossWpm]= useState<number>();

  let count: number= timeElapse;
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
    //game finish condition word mode
    else if( wordIndex === sampleTextArr.length -1 &&
       index === (sampleTextArr[sampleTextArr.length -1].length) -1 &&
       gameMode === 'word'){
      setTimeout(()=>{
        userText.push(textAreaInput.value);
        setPlayOn(false);
        clearInterval(intervalId);
        checkForResult(timeElapse,sampleText.length);
        setTextTarget('')
      },100)
      changeInputVisibility('none')
    }
    //game finish condition time mode
    else if( timeElapse == 0  &&  gameMode === 'time'){
      setTimeout(()=>{
        setPlayOn(false);
        clearInterval(intervalId);
        checkForResult(countDown,wordIndex * 5);
        setTextTarget('')
      },100)
      changeInputVisibility('none')
    }
  }
  // reduce index when backspacing and index is more than zero
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
    setGrossWpm(grossWpm);
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

  const decreaseTimeElapse=()=>{
    count--;
    setTimeElapse(count);
  }

  const changeGameMode=(input:string)=>{
    setGameMode(input)
    if(input === 'time'){
      count = countDown // time to count down
      console.log('count '+ count)
      restartGame(input)
    } else if(input === 'word'){
      count = 0
      console.log('count '+ count)
       restartGame(input)
    }
  }

  const restartGame=(type:string)=>{
    const textInput: any= document.querySelector('#text-input');
    textInput.value='';
    textInput.focus();
    changeInputVisibility('inline')
    setPlayOn(false);
    setIndex(0);
    setWordIndex(0);
    setError(0);
    selectRandomText(targetTextLength);
    clearInterval(intervalId);
    setWpm(0);
    if(type ==='time'){
      setTimeElapse(countDown);
    } else if(type=== 'word') {
      setTimeElapse(0)
    }
  }

  const startTimer=()=>{
    clearInterval(intervalId);
    // use increaseTime on word mode and decreaseTime when time mode
    const Interval=setInterval(
      gameMode === 'word' ? increaseTimeElapse : decreaseTimeElapse , 1000);
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
    setTextTarget('')
    setTextTarget(await fetchRandomParagraph(1,paragraphLength))
  }

  // set countdown time
  const selectTimeCountDown=(time:number,index:number)=>{
    const lengthSelects : any= document.querySelectorAll('#length-select');
    for(let i=0; i< lengthSelects.length;i++){
      lengthSelects[i].style.backgroundColor='var(--secondaryColor)';
    }
    lengthSelects[index].style.backgroundColor='var(--tertiaryColor)';
    setCountDown(time);
  }

  const selectTextLength=(length:number, index: number)=>{
    const lengthSelects : any= document.querySelectorAll('#length-select');
    for(let i=0; i< lengthSelects.length;i++){
      lengthSelects[i].style.backgroundColor='var(--secondaryColor)';
    }
    lengthSelects[index].style.backgroundColor='var(--tertiaryColor)';
    setTargetTextLength(length);
  } 


  //initial load
  useEffect(()=>{
   selectTextLength(5,1);
    const textInput: any= document.querySelector('#text-input');
    textInput.focus();
    },[])

  //highlight word on chage wordIndex
  useEffect(()=>{
    if(sampleTextArr){
        highlightOnGoingWord(wordIndex);
    }
  },[wordIndex])

  //restart when text length changed
  useEffect(()=>{
    restartGame(gameMode)
  },[targetTextLength,countDown])


  return (
    <div className='h-full flex flex-col items-center justify-center gap-5'>
      <div className='h-10 '>
        <div className='text-3xl font-bold'>TypeGuru</div>
      </div>
      <div className='flex flex-row gap-10 font-bold bg-[color:var(--tertiaryColor)] p-6 rounded-xl'>
        <div>Time : {/* displayCorrectTime */(timeElapse)}</div>
        <div>Char : {index}</div>
        <div> Word : {wordIndex}</div>
        <div>Error : {error}</div>
        <div > PlayOn : {playOn ? 'true': 'false'}</div>
        <div>WPM : {wpm?.toFixed(1)}</div>
        <div>Game mode : {gameMode}</div>
      </div>

    {gameMode === 'word'?
      <div className='flex gap-2'>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer hover:bg-neutral-900 font-bold' 
        id='length-select' onClick={()=>selectTextLength(2,0)}>Short</div>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer hover:bg-neutral-900 font-bold'
          id='length-select' onClick={()=>selectTextLength(5,1)}>Medium</div>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer hover:bg-neutral-900 font-bold'
          id='length-select' onClick={()=>selectTextLength(10,2)}>Long</div>
      </div>
      :
      <div className='flex gap-2'>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer hover:bg-neutral-900 font-bold' 
        id='length-select' onClick={()=>selectTimeCountDown(15,0)}>15</div>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer hover:bg-neutral-900 font-bold'
          id='length-select' onClick={()=>selectTimeCountDown(30,1)}>30</div>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer hover:bg-neutral-900 font-bold'
          id='length-select' onClick={()=>selectTimeCountDown(60,2)}>60</div>
      </div>
      }

      {textTarget ?
        <div className='flex flex-wrap gap-2 bg-[color:var(--secondaryColor)] p-5 rounded-xl
        max-w-4xl mb-2'>
          {sampleTextArr.map((item)=>{
            return(
              <div id='sample-word' className='text-xl'>
                {item}
              </div>
            )
          })}
          </div> : 
          <div className='my-5'>
            <ResultComponent 
              wpm={wpm?.toFixed(1)}
              grossWpm={grossWpm?.toFixed(1)}
              accuracy={ (1-(error/wordIndex))*100 }
              error={error}
              time={timeElapse} />
            <LoaderBuble />
          </div>
        }
      <input onKeyDown={triggerStartGameOnType} id='text-input'
      className=' w-30 h-12 p-3 resize-none text-2xl bg-[color:var(--tertiaryColor)]
      overlow-hidden text-[color:var(--primaryColor)]'
      ></input>
      <div className='flex flex-row gap-10'>
        <button onClick={()=>restartGame(gameMode)}>
        <span className="material-icons">refresh</span>     
        </button>
        <button onClick={stopGame} >
        <span className="material-icons">stop</span>     
        </button>
        <button onClick={()=> changePrimaryColor('beige','black','gray','white','green')}>
          Change text color
        </button>
        <button onClick={()=> changeGameMode('time')}>Time mode</button>
        <button onClick={()=> changeGameMode('word')}>Word mode</button>
      </div>
    </div>
  )
}


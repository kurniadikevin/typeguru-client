import { useEffect, useState } from 'react';
import {fetchRandomParagraph} from '../textData';
import 'material-icons/iconfont/material-icons.css';
import { LoaderBuble } from '@/components/loader';
import { ResultComponent } from '@/components/results';
import { displayCorrectTime, highlightOnGoingWord, changeInputVisibility, autoScrollByPercentage } from '@/functions';
import { ColorToggler } from '@/components/colorToggler';
import { BottomInfo } from '@/components/bottomInfo';

export default function Home() {

  const [gameMode,setGameMode]= useState<string>('word');
  const [countDown,setCountDown]= useState<number>(30);
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
      changeInputVisibility('none');
      setTimeElapse(countDown)
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

  const changeGameMode=(input:string,index:number)=>{
    // change background color selected
    const btnGameMode : any= document.querySelectorAll('#btn-game-mode');
    for(let i=0; i< btnGameMode.length;i++){
      btnGameMode[i].style.backgroundColor='var(--secondaryColor)';
    }
    btnGameMode[index].style.backgroundColor='var(--highlightColor)';

    setGameMode(input)
    if(input === 'time'){
      count = countDown // time to count down
      selectTextLength(30,1);
      selectTimeCountDown(30,1)
    } else if(input === 'word'){
      count = 0;
      selectTextLength(5,1)
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
    autoScrollByPercentage(0,sampleTextArr.length)
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
    const newParagraph= await fetchRandomParagraph(paragraphLength) ?? ""
    setTextTarget(newParagraph)
  }

  // set countdown time
  const selectTimeCountDown=(time:number,index:number)=>{
    const btnGameMode : any= document.querySelectorAll('#length-select');
    for(let i=0; i< btnGameMode.length;i++){
      btnGameMode[i].style.backgroundColor='var(--secondaryColor)';
    }
    btnGameMode[index].style.backgroundColor='var(--highlightColor)';
    setCountDown(time);
  }



  const selectTextLength=(length:number, index: number)=>{
    const btnGameMode : any= document.querySelectorAll('#length-select');
    for(let i=0; i< btnGameMode.length;i++){
      btnGameMode[i].style.backgroundColor='var(--secondaryColor)';
    }
    btnGameMode[index].style.backgroundColor='var(--highlightColor)';
    setTargetTextLength(length);
  } 

  //initial load
  useEffect(()=>{
   selectTextLength(5,1);
   const textInput: any= document.querySelector('#text-input');
   textInput.focus();
   changeGameMode('word',1)// default game mode word
    },[])

  //highlight word on chage wordIndex
  useEffect(()=>{
    if(sampleTextArr){
        highlightOnGoingWord(wordIndex);
        autoScrollByPercentage(wordIndex,sampleTextArr.length)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[wordIndex])

  //restart when text length changed
  useEffect(()=>{
    restartGame(gameMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[targetTextLength,countDown])


  return (
    <div className='h-full flex flex-col items-center justify-center gap-5'>
      <div className='h-10  mb-2'>
        <div className='text-3xl font-bold text-[color:var(--accent)] '>TypeGuru</div>
      </div>
      { wpm ?'':
      <div className='flex flex-row gap-10 font-bold bg-[color:var(--tertiaryColor)] p-6 rounded-xl'>
        <div className='text-[color:var(--highlightColor)]'>Time : {displayCorrectTime(timeElapse)}</div>
        <div> Word : {wordIndex}</div>
        <div>Error : {error}</div>
        <div > PlayOn : {playOn ? 'true': 'false'}</div>
        <div>Game mode : {gameMode}</div>
        <div>Sentences : {targetTextLength}</div>
        <ColorToggler />
      </div>
      }

    {gameMode === 'word'?
      <div className='flex gap-2'>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer font-bold' 
        id='length-select' onClick={()=>selectTextLength(2,0)}>Short</div>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer font-bold'
          id='length-select' onClick={()=>selectTextLength(5,1)}>Medium</div>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer font-bold'
          id='length-select' onClick={()=>selectTextLength(10,2)}>Long</div>
      </div>
      :
      <div className='flex gap-2'>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer font-bold' 
        id='length-select' onClick={()=>selectTimeCountDown(15,0)}>15</div>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer font-bold'
          id='length-select' onClick={()=>selectTimeCountDown(30,1)}>30</div>
        <div className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
         cursor-pointer font-bold'
          id='length-select' onClick={()=>selectTimeCountDown(60,2)}>60</div>
      </div>
      }

      {textTarget   ?
        <div className='flex flex-wrap gap-2 bg-[color:var(--secondaryColor)] p-5 rounded-xl border-8 border-[color:var(--secondaryColor)]
        max-w-4xl mb-2 overflow-auto max-h-60' id='text-target-body'>
          {sampleTextArr.map((item,index)=>{
            return(
              <div id='sample-word' className='text-xl' key={index}>
                {item}
              </div>
            )
          })}
          </div> : 
          <div className='my-5 min-h-80 '>
            <ResultComponent 
              wpm={wpm?.toFixed(1)}
              grossWpm={grossWpm?.toFixed(1)}
              accuracy={ (1-(error/wordIndex))*100 }
              error={error}
              time={timeElapse} 
              wordCount={wordIndex}/>
            <LoaderBuble />
          </div>
        }
      <input onKeyDown={triggerStartGameOnType} id='text-input'
      className=' w-30 h-12 p-3 resize-none text-2xl bg-[color:var(--tertiaryColor)]
      overlow-hidden text-[color:var(--primaryColor)]'
      ></input>
      <div className='flex flex-row gap-5'>
        <button onClick={()=>restartGame(gameMode)}>
        <span className="material-icons">refresh</span>     
        </button>
        <button id='btn-game-mode'
          className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
          cursor-pointer font-bold hover:bg-[color:var(--highlightColor)]'
          onClick={()=> changeGameMode('time',0)}>Time mode
        </button>
        <button id='btn-game-mode'
          className='bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
          cursor-pointer font-bold hover:bg-[color:var(--highlightColor)]'
          onClick={()=> changeGameMode('word',1)}>Word mode
        </button>
      </div>
      <BottomInfo />
    </div>
  )
}


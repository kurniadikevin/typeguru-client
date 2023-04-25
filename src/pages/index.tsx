import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const [status,setStatus]= useState('true');
  const [index,setIndex]= useState(0);
  const [time,setTime]= useState(0)

  const sampleText: string='The quick brown fox jumps over the lazy dog';

  // check if the type character is same as the sample text
 const typeCheck=(event: any)=>{
  if(event.key === sampleText[index]){
    setIndex(()=> index+ 1)
    setStatus('true');
  } else if( index === sampleText.length ){
    alert('game stop');
  } else{
    setStatus('false');
  }
 }

  const incrementTime=()=>{
    setTime(()=> time + 1)
    console.log('time' + time)
  }

  const startTimer=()=>{
    setInterval(incrementTime,1000);
  }
 



  return (
    <main>
      Home
      <div>{time}</div>
      <div>{sampleText}</div>
      <textarea onKeyDown={typeCheck} ></textarea>
      <div>{status}</div>
      <button onClick={startTimer}>Plus</button>
    </main>
  )
}

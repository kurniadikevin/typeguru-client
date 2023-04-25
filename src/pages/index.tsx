import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [point,setPoint]=useState(0)


  // check if the type character is same as the sample text
 const typeCheck=()=>{
  
 }

  const sampleText: string='The quick brown fox jumps over the lazy dog';
  


  return (
    <main>
      Home
      <div>{sampleText}</div>
      <textarea></textarea>
    </main>
  )
}

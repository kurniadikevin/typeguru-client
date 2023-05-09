import { useEffect, useState } from 'react';
import githubLogoWhite from '../assets/github-mark-white.png';
import githubLogoBlack from '../assets/github-mark.png';
import Image from 'next/image';


export const BottomInfo=()=>{
    
    const [theme,setTheme]= useState<string>('')

    const getTheme=()=>{
        const localTheme = JSON.stringify(localStorage.getItem('theme'));
        setTheme(localTheme)
    }
    useEffect(()=>{
        getTheme()
    },[])
    
    return(
        <div id='bottom-desc'>
        <div className='flex items-center justify-center gap-4' >
            <div>
            </div>
            <div id='author-desc'> Created and Maintained by <a href='https://github.com/kurniadikevin' target="_blank">kurniadikevin</a></div>
            <a href='https://github.com/kurniadikevin/typing-test' target="_blank" >
            <Image src={theme === 'night' ?githubLogoWhite : githubLogoBlack} alt='github-logo' width={25} height={25}/>
            </a>
            <div>Text by <a href='https://rapidapi.com/hargrimm/api/wikihow' target="_blank">WikiHowAPI</a></div>
        </div>
        </div>
    )
}
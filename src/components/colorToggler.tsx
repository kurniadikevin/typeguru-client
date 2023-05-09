import { toggleDayNightMode } from "@/functions";
import { useState } from "react";


export const ColorToggler =()=>{

    const [colorMode,setColorMode]= useState<string>('night');

    const toggleColorModeWithState=(mode:string)=>{
        toggleDayNightMode(mode)
        if(mode === 'night'){
        setColorMode('day')
        localStorage.setItem('theme','day')
        } else if( mode ==='day'){
            setColorMode('night')
            localStorage.setItem('theme','night')
        }
    }

    return(
        <div>
            <button onClick={()=>toggleColorModeWithState(colorMode)} className=''>
                <span className="material-icons">
                    {colorMode === 'night' ? 'dark_mode' :'light_mode'}
                </span>
            </button>
        </div>
    )
}
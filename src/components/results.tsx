import { displayCorrectTime } from "@/functions"

export const ResultComponent=(props:any)=>{
    
    return(
        <div >
        {props.wpm >0  ? 
        <div className='flex flex-col text-2xl w-100 gap-2 font-bold
         bg-neutral-800 rounded-xl p-12 px-14 mb-5 text-[color:var(--highlightColor)]'>
            <div className='flex gap-10 justify-between'>
                <div>WPM</div>
                <div>{props.wpm}</div>
            </div>
            <div className='flex gap-10 justify-between'>
                <div>Gross Wpm</div>
                <div>{props.grossWpm}</div>
            </div>
            <div className='flex gap-10 justify-between'>
                <div>Accuracy</div>
                <div>{(props.accuracy).toFixed(1)}%</div>
            </div>
            <div className='flex gap-10 justify-between'>
                <div>Error</div>
                <div>{props.error}</div>
            </div>
            <div className='flex gap-10 justify-between'>
                <div>Time</div>
                <div>{displayCorrectTime(props.time)}</div>
            </div> 
            <div className='flex gap-10 justify-between'>
                <div>Word Count</div>
                <div>{props.wordCount}</div>
            </div> 
        </div>
        : ''}
        </div>
        )
}
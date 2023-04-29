export const ResultComponent=(props:any)=>{
    
    return(
        <div >
        {props.wpm >0  ? 
        <div className='flex flex-col text-2xl w-100 gap-2 font-bold
         bg-neutral-800 rounded-xl p-6 mb-5'>
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
                <div>{props.time}</div>
            </div> 
        </div>
        : ''}
        </div>
        )
}
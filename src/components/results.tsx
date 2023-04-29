export const ResultComponent=(props:any)=>{
    return(
        <div>
            <div>
                <div>WPM</div>
                <div>{props.wpm}</div>
            </div>
            <div>
                <div>Gross WPM</div>
                <div>{props.grossWpm}</div>
            </div>
            <div>
                <div>Accuracy</div>
                <div>{(props.accuracy).toFixed(1)}%</div>
            </div>
            <div>
                <div>Error</div>
                <div>{props.error}</div>
            </div>
            <div>
                <div>Time</div>
                <div>{props.time}</div>
            </div>
        </div>
    )
}
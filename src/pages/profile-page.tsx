import Dashboard from "@/components/dashboard"
import { useEffect, useState } from "react";



export default function ProfilePage (){

    const [bestTimeData,setBestTimeData]= useState([]);

    const getLocalBestTimeData=()=>{
        const data:any =localStorage.getItem('best-time-list')
        if(data){
        const parseData= JSON.parse(data);
        setBestTimeData(parseData);
        console.log(parseData)
        }
    }

    const getUserHighestWpm=()=>{
        if(bestTimeData.length>0){
        const filteredData :any= bestTimeData.map((item:any)=>{
            return item.wpm
        })
        const sortWpm= filteredData.sort((a:number,b:number)=>{
            return b -a
        })
        return sortWpm[0];
    } else{ return '-'}
    }

    const getWpmForSpecificType=(type:string)=>{
        if(bestTimeData.length>0){
        const filteredData :any= bestTimeData.filter((item:any)=>{
            return item.type === type
        })
        if(filteredData.length >0){
            return filteredData[0].wpm
        } else {
            return '-'
        }
        } else {return '-'}
    }

    useEffect(()=>{
        getLocalBestTimeData()
       
    },[])

    return(
        <div className='h-full flex flex-col items-center justify-center gap-5'>
            <Dashboard/>
            <div className='font-bold pt-4 text-xl'>Personal Best WPM</div>
            <div className='flex flex-col gap-10 font-bold  p-6 rounded-xl'>
            <div className="flex gap-8 bg-[color:var(--tertiaryColor)] py-8 px-12 rounded-xl">
                <div className="flex flex-col pb-4 ">
                    <div className="font-bold text-[color:var(--accent)] pb-4">All</div>
                    <div className="text-2xl">{getUserHighestWpm()}</div>
                    <div className="text-l opacity-50">wpm</div>
                </div>
                <div  className="flex flex-col pb-4">
                    <div className="font-bold pb-4 text-[color:var(--accent)]">15s</div>
                    <div className="text-2xl">{getWpmForSpecificType('15')}</div>
                    <div className="text-l opacity-50">wpm</div>
                </div>
                <div className="flex flex-col pb-4">
                    <div className="font-bold pb-4 text-[color:var(--accent)]">30s</div>
                    <div className="text-2xl">{getWpmForSpecificType('30')}</div>
                    <div className="text-l opacity-50">wpm</div>
                </div> 
                <div className="flex flex-col pb-4">
                    <div className="font-bold pb-4 text-[color:var(--accent)]">60s</div>
                    <div className="text-2xl">{getWpmForSpecificType('60')}</div>
                    <div className="text-l opacity-50">wpm</div>
                </div>
            </div>
            <div className="flex gap-8 bg-[color:var(--tertiaryColor)]  py-8 px-12 rounded-xl">
                <div className="flex flex-col pb-4">
                    <div className="font-bold pb-4 text-[color:var(--accent)]">Short</div>
                    <div className="text-2xl">{getWpmForSpecificType('short')}</div>
                    <div className="text-l opacity-50">wpm</div>
                </div>
                <div className="flex flex-col pb-4">
                    <div className="font-bold pb-4 text-[color:var(--accent)]">Medium</div>
                    <div className="text-2xl">{getWpmForSpecificType('medium')}</div>
                    <div className="text-l opacity-50">wpm</div>
                </div>
                <div className="flex flex-col pb-4">
                    <div className="font-bold pb-4 text-[color:var(--accent)]">Long</div>
                    <div className="text-2xl">{getWpmForSpecificType('long')}</div>
                    <div className="text-l opacity-50">wpm</div>
                </div>
            </div>
            </div>
        </div>
    )
}
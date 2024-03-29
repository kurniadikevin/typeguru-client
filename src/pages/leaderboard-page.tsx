import Dashboard from '@/components/dashboard';
import { highlightSelection,assignOptions,formatDate, 
  getTextContent, clearOptionsSelect} from '@/functions';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function LeaderBoardPage() {
  
  const [data,setData]= useState<any>([]);
  const [category,setCategory]= useState<string>('All');
  const [type,setType]= useState<any>('');
  const [topNumber,setTopNumber]= useState<Number>(10);

  const optionTime=['15','30','60'];
  const optionWord=['Short','Medium','Long'];

  const fetchBestTime= async ()=>{
    let url;
    if(category === 'All'){
      url= `${process.env.NEXT_PUBLIC_API_URL}/best-time/top/${topNumber}`
    } 
    else if(category === 'Time' && !type){
      url= `${process.env.NEXT_PUBLIC_API_URL}/best-time/top/${category.toLowerCase()}/${topNumber}`
    } 
    else if(category === 'Word' && !type){
      url= `${process.env.NEXT_PUBLIC_API_URL}/best-time/top/${category.toLowerCase()}/${topNumber}`
    }
    else{
      url= `${process.env.NEXT_PUBLIC_API_URL}/best-time/top/${category.toLowerCase()}/${type}/${topNumber}`
    }

     axios({
      method : 'GET',
      url: url,
      headers :{
        'Bypass-Tunnel-Reminder' : 'bypass'
      }
    }).then((res)=>{
      setData(res.data);

    }).catch((err)=>{
      console.log(err)
    })
  }


  //toggle category and assign option by category time or word
  const toggleCategoryAndOption=(e:any,index:number)=>{
    highlightSelection(e,index,'#cat-select');
    getTextContent(e,setCategory);
    const divText = e.target.textContent;
    if(divText === 'Time'){
      assignOptions(optionTime);
    } else if(divText === 'Word') {
      assignOptions(optionWord);
    }
  }

  const removeOptionWhenCategoryAll=()=>{
    const options= document.querySelectorAll('#option');
    if(category==='All'){
      options.forEach((item:any)=>{
        item.style.color='var(--secondaryColor)'
      })
    } else{
      options.forEach((item:any)=>{
        item.style.color='var(--primaryColor)'
      })
    }
  }


  
  //render leaderboard data
  const renderLeaderBoardData=():any=> {
    return( data.map((item:any, index:number) => (
      <div key={index} className='grid grid-cols-5 gap-8 font-bold bg-[color:var(--tertiaryColor)] p-6'
      id='leaderboard-data'>
        <div>{item.name}</div>
        <div>{item.wpm}</div>
        <div>{item.category}</div>
        <div>{item.type}</div>
        <div>{formatDate(item.date)}</div>
      </div>
    ))
    )
  }


  // highligh all selection for default page load
  useEffect(()=>{
    const catSelect : any=document.querySelectorAll('#cat-select');
    catSelect[0].style.color='var(--highlightColor)';
  },[])

  useEffect(()=>{
    fetchBestTime()
    removeOptionWhenCategoryAll()
  },[category,type])

  return (
      <div className='h-full flex flex-col items-center justify-center gap-5'>
        <Dashboard/>
        <div className='font-bold pt-4 text-xl'>Leaderboard</div>
        <div className='flex flex-row  gap-10 font-bold bg-[color:var(--tertiaryColor)] p-6 rounded-xl'>
          
          {/* ---CATEGORY----- */}
          <div id='cat-select' className='text-[color:var(--accent) cursor-pointer'
           onClick={(ev)=> {toggleCategoryAndOption(ev,0); clearOptionsSelect(setType(''));}}>
           All
          </div>
          <div id='cat-select' className='cursor-pointer' 
           onClick={(ev)=>{toggleCategoryAndOption(ev,1); clearOptionsSelect(setType(''));}}>
            Time
          </div>
          <div id='cat-select' className='cursor-pointer' 
           onClick={(ev)=> {toggleCategoryAndOption(ev,2); clearOptionsSelect(setType(''));}}>
            Word
          </div>

          {/* ----- TYPE --------- */}
          <div id='option' className='cursor-pointer '
             onClick={(e)=>{ if(category !=='All'){
              getTextContent(e,setType);
              highlightSelection(e,0,'#option');}
             }}>
             Short
          </div>
          <div id='option' className='cursor-pointer'
              onClick={(e)=>{ if(category !=='All'){
                getTextContent(e,setType);
                highlightSelection(e,1,'#option');}
               }}>
             Medium
          </div>
          <div id='option' className='cursor-pointer'
            onClick={(e)=>{ if(category !== 'All'){
              getTextContent(e,setType);
              highlightSelection(e,2,'#option');}
             }}>
              Long
          </div>
          <div>
           
          </div>
      </div>
      <div>
        <div className='grid grid-cols-5 gap-8 font-bold bg-[color:var(--tertiaryColor)] 
         text-[color:var(--accent)]  p-6 rounded-xl'>
          <div>Name</div>
          <div>WPM</div>
          <div>Category</div>
          <div>Type</div>
          <div>Date</div>
        </div>
        {renderLeaderBoardData()}
      </div>
      </div>
    )
  }
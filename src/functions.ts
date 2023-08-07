import axios from "axios";

export const displayCorrectTime=(input:number) :string=>{
    let minutes:number= Math.floor(input /60);
    let seconds:number = input % 60;
    if(minutes===0){
      return `${seconds}s`
    } else{
    return `${minutes}m ${seconds}s`
    }}

export const highlightOnGoingWord=(wordIndex:number)=>{
    const words: any= document.querySelectorAll('#sample-word');
    words.forEach((item: any)=>{
        item.style.color='var(--primaryColor)'
    })
    if(words[wordIndex]){
        words[wordIndex].style.color='var(--accent)';
    }}

export const changeInputVisibility=(display:string)=>{
    const input:any = document.querySelector('#text-input');
    input.style.display= display
}

export const toggleDayNightMode=(input:string)=>{
 if(input === 'night'){
    changePrimaryColor('beige','black','rgb(204,205,198)','white','green','green')
 } else if(input === 'day'){
    changePrimaryColor(' rgb(15,15,15)','white','rgb(38,38,38)','rgb(23 23 23)','rgb(244,140,160)','rgb(146,212,212)')
 }
}

export const changePrimaryColor=(background:string,primary:string,secondary:string,
    tertinary:string,highlight:string, accent:string)=>{
 const root: any= document.querySelector(':root');
 root.style.setProperty('--backgroundColor', background);
 root.style.setProperty('--primaryColor', primary);
 root.style.setProperty('--secondaryColor', secondary);
 root.style.setProperty('--tertiaryColor', tertinary);
 root.style.setProperty('--highlightColor', highlight);
 root.style.setProperty('--accent', accent);
}

export const autoScrollByPercentage=( typingIndex:number,textLength:number )=>{
    const textBody:any= document.querySelector('#text-target-body');
    let progress: number= (typingIndex / textLength ) -0.2; 
    if(textBody){
        textBody.scrollTop = progress * textBody.scrollHeight;
    }
}


export const shuffleColorPalette=(colorDataIndex: number, colorData: any)=>{
    const colorDataKey= Object.keys(colorData);
    const colorName=colorData[colorDataKey[colorDataIndex] as keyof typeof colorData];
    changePrimaryColor(colorName[0],colorName[1],colorName[2],colorName[3],colorName[4],colorName[5])
}

export const callModal=(text:string)=>{
    const modal:any=document.querySelector('#modal');
    modal.style.display='block';
    modal.style.opacity=1
    modal.textContent=text;
    setTimeout(()=>{
      modal.style.display='none'
    },2000)
  }

export const highlightSelection=(e:any,index:number,elements:any)=>{
    const catSelect : any=document.querySelectorAll(elements);
    e.target.style.color='var(--highlightColor)';
    for(let i=0;i<catSelect.length;i++){
      if(i !== index){
        catSelect[i].style.color='var(--primaryColor)'
      }
    }
  }

  //clear options when toggle category
  export const clearOptionsSelect=(setState:any)=>{
    const options= document.querySelectorAll('#option');
    options.forEach((item :any)=>{
      item.style.color='var(--primaryColor)';
    })
  }


// assign set of option from array option 
export const assignOptions=(optionType:string[])=>{
  const options= document.querySelectorAll('#option');
  for(let i=0; i< options.length; i++){
    options[i].textContent=optionType[i]
  }
}

export const getTextContent=(event:any,setState: any)=>{
    const divText = event.target.textContent;
    //conver to lowercase if divText is string
    if(typeof divText === 'string'){
      setState(divText)
    }
    setState(divText);
  }

export const formatDate=(input: any)=>{
  const date= input.split('T')[0];
  const day= date.split('-');
   day[day.length-1] = Number(day[day.length -1]) 
  return day.reverse().join('/')
}

export const getUserBestTimeData=async(userId:any)=>{
  axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/best-time/by-user-id/${userId}`,
    headers :{
      'Bypass-Tunnel-Reminder' : 'bypass'
    },
  }).then((res) => {
    console.log(res.data)
    localStorage.setItem("best-time-list", JSON.stringify(res.data));
  }).catch((err)=>{
    console.log(err)
  });
}

export const checkForHigherWpm=(wpm:number,category:string, type:any)=>{
  const data:any= localStorage.getItem("best-time-list")
  const bestTimeList= JSON.parse(data)

  const userData:any= localStorage.getItem('session-data')
  const currentUser=JSON.parse(userData)
  
  //check if data with certain type available
  const catAndTypeList=bestTimeList.filter((item:any)=>{
    return item.type === type
  })

  // filter to check current running test is higher than user wpm data
  const higherWpmData= catAndTypeList.filter((item:any)=>{
    return  item.wpm > wpm
  })

  //update data if there is none of higher wpm on certain type and category
  if(higherWpmData.length === 0 && catAndTypeList.length > 0){
    updateBestTimeData(catAndTypeList[0].id, wpm,currentUser.id)

  } 
  // create best time data if there is not type and category available
  else if(catAndTypeList.length === 0){
    createNewBestTimeData(wpm,category,type,currentUser.id)
  } 
  // do nothing if category and type data available but wpm is not higher 
  else if(catAndTypeList.length > 0 && higherWpmData.length > 0){
    return;
  }
}



const updateBestTimeData=async(bestTimeId:number,wpm:number, userId:number)=>{
  axios({
    method: "POST",
    data : {
      wpm : wpm
    },
    url: `${process.env.NEXT_PUBLIC_API_URL}/best-time/update/${bestTimeId}`,
    headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
  }).then((res) => {
    console.log(res.data)
    callModal('Personal best wpm updated!'+ bestTimeId)
    getUserBestTimeData(userId)// update localstorage best time
  }).catch((err)=>{
    console.log(err)
  });
}

const createNewBestTimeData=async(wpm:number, category:string,type:any,userId:number)=>{
  axios({
    method: "POST",
    data : {
      "user_id" : userId,
      "category" : category,
      "type" : type,
      "wpm" : wpm
  },
    url: `${process.env.NEXT_PUBLIC_API_URL}/best-time/create`,
    headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
  }).then((res) => {
    callModal('New Best wpm created')
    getUserBestTimeData(userId)// update localstorage best time
   
  }).catch((err)=>{
    console.log(err)
  });
}
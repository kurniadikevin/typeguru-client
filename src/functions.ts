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


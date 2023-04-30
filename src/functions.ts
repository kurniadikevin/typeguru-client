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

export const changePrimaryColor=(background:string,primary:string,secondary:string,tertinary:string,highlight:string)=>{
 const root: any= document.querySelector(':root');
 root.style.setProperty('--backgroundColor', background);
 root.style.setProperty('--primaryColor', primary);
 root.style.setProperty('--secondaryColor', secondary);
 root.style.setProperty('--tertiaryColor', tertinary);
 root.style.setProperty('--highlightColor', highlight);
}

export const autoScrollByPercentage=( typingIndex:number,textLength:number )=>{
    const textBody:any= document.querySelector('#text-target-body');
    let progress: number= (typingIndex / textLength ) -0.2; 
    if(textBody){
        textBody.scrollTop = progress * textBody.scrollHeight;

        console.log( textBody.scrollTop);
    }
}
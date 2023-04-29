export const displayCorrectTime=(input:number) :string=>{
    let minutes:number= Math.floor(input /60);
    let seconds:number = input % 60;
    if(minutes===0){
      return `${seconds}`
    } else{
    return `${minutes} : ${seconds}`
    }}

export const highlightOnGoingWord=(wordIndex:number)=>{
    const words: any= document.querySelectorAll('#sample-word');
    words.forEach((item: any)=>{
        item.style.color='var(--primaryColor)'
    })
    if(words[wordIndex]){
        words[wordIndex].style.color='var(--highlightColor)';
    }
    }

export const changePrimaryColor=(background:string,primary:string,secondary:string,tertinary:string,highlight:string)=>{
 const root: any= document.querySelector(':root');
 root.style.setProperty('--backgroundColor', background);
 root.style.setProperty('--primaryColor', primary);
 root.style.setProperty('--secondaryColor', secondary);
 root.style.setProperty('--tertiaryColor', tertinary);
 root.style.setProperty('--highlightColor', highlight);
}
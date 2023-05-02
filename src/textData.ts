import axios from "axios";

export const textData : string[]=[
    'lorem ipsum',
    'hello world',
    'The quick brown fox jumps over the lazy dog',
    'one two three four',
    'the quick brown fox jumps over the lazy dog',
    'This page allows you to generate random text strings using true randomness, which for many purposes is better than the pseudo-random number algorithms',
    "The trees, therefore, must be such old and primitive techniques that they thought nothing of them, deeming them so inconsequential that even savages like us would know of them and not be suspicious. At that, they probably didn't have too much time after they detected us orbiting and intending to land. And if that were true, there could be only one place where their civilization was hidden."
]

const apiKey: string = process.env.NEXT_PUBLIC_API_KEY ?? ""

export const fetchRandomParagraph = async( sentences:number)=>{
    const options = {
        method: 'GET',
        url: 'https://hargrimm-wikihow-v1.p.rapidapi.com/steps',
        params: {count: sentences  },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'hargrimm-wikihow-v1.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          const resData= (response.data);
          const stringData =(
            (Object.values(resData)).join(' ')
             )
          return stringData;
          
      } catch (error) {
          console.error(error);
      }
}
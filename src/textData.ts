export const textData : string[]=[
    'lorem ipsum',
    'hello world',
    'The quick brown fox jumps over the lazy dog',
    'one two three four',
    'the quick brown fox jumps over the lazy dog',
    'This page allows you to generate random text strings using true randomness, which for many purposes is better than the pseudo-random number algorithms',
    "The trees, therefore, must be such old and primitive techniques that they thought nothing of them, deeming them so inconsequential that even savages like us would know of them and not be suspicious. At that, they probably didn't have too much time after they detected us orbiting and intending to land. And if that were true, there could be only one place where their civilization was hidden."
]

export const fetchRandomParagraph =async(paragraphs: number,sentences: number)=>{
    const response = await fetch(`http://metaphorpsum.com/paragraphs/${paragraphs}/${sentences}`);
    const stringData = await response.text();
    return stringData;
}

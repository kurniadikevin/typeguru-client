import Dashboard from '@/components/dashboard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { callModal, getUserBestTimeData } from '@/functions';
import axios from 'axios';


export default function SignPage() {
  const [type,setType]= useState<string>('Sign-in');
  const [username,setUsername]= useState<string>('');
  const [password,setPassword]= useState<string>('');
  const { push } = useRouter();

  const signing= async(input:string)=>{
    let urlExt;
    input === 'Sign-up' ? urlExt = 'create' : urlExt= 'login';
    axios({
      method: "POST",
      data: {
        name: username,
        password: password,
      },
    
      url: `http://localhost:5000/users/${urlExt}`,
    }).then((res) => {
      if(res.data === 'No User Exists'){
        callModal(res.data)
      } else{
        if(input === 'Sign-up'){
         callModal(res.data.message)
          console.log(res.data)
        } 
        // Succesful sign in
        else if( input === 'Sign-in'){
          callModal(res.data.message)
          console.log(res.data)
          if(res.data.status === 200){
           redirectSignIn(res);
          }
        }
      }    
    }).catch((err)=>{
      console.log(err)
    });
}


const redirectSignIn=(res:any)=>{
  const userId=JSON.stringify(res.data.data.id)
  localStorage.setItem("token", (res.data.token));
  localStorage.setItem("session-data", JSON.stringify(res.data.data));
  getUserBestTimeData(userId)
  push('/')
}


  const highlightSelectType=()=>{
    let other;
    type === 'Sign-up' ? other = 'Sign-in' : other = 'Sign-up'
    const element : any = document.querySelector(`#${type}-select`);
    element.style.color='var(--accent)';
    element.style.fontWeight='700';
    const otherElement : any = document.querySelector(`#${other}-select`);
    otherElement.style.color='var(--primaryColor)';
    otherElement.style.fontWeight='400';
}

useEffect(()=>{
  highlightSelectType();

},[type])

useEffect(()=>{
  localStorage.clear();
})

  
    return (
      <div className='h-full flex flex-col items-center justify-center gap-5'>
        <Dashboard/>
        <div className=" w-3/12 flex-col p-4 min-w-fit">
            <div className="h-20 pb-4 text-2xl flex justify-center items-center  
            font-bold break-words">
                Sign Page
            </div>
           
            <div className="bg-[color:var(--secondaryColor)] border-2 border-black rounded-lg  p-8 gap-2">
             <div className="h-20 flex item-end justify-start gap-4 p-4">
                <div id="Sign-in-select" className="text-xl text-[color:var(--accent)]  pt-4 cursor-pointer" onClick={()=> setType('Sign-in')}>
                    Sign-in
                </div>
                <div id="Sign-up-select" className="text-xl  text-[color:var(--accent)] pt-4 cursor-pointer" onClick={()=> setType('Sign-up')}>
                    Sign-up
                </div>
            </div>
            <div className=" h-20 p-4">
                <div className="pb-2 ">Username</div>
                <input className="px-1 text-[color:var(--secondaryColor)]"
                 value={username} onChange={(e)=> setUsername((e.target.value))}>
                </input>
            </div>
            <div className=" h-20 p-4">
                <div className="pb-2">Password</div>
                <input type="password" className="px-1 text-[color:var(--secondaryColor)]"
                 value={password} onChange={(e)=> setPassword((e.target.value))}>    
                </input>
            </div>
            <div className="h-20  flex item-center justify-center pt-6 gap-4">
                <button id='sign-btn' className="bg-[color:var(--highlightColor)] 
                w-20 h-10 rounded-lg font-bold hover:bg-[color:var(--accent)]"
                onClick={()=>signing(type)}>
                    {type}
                </button>
               
            </div>
         </div>
        </div>
      </div>
    )
  }
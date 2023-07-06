import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function Dashboard() {
    const { push } = useRouter();
    const [currentUser,setCurrentUser]=useState<string>('Guest');

    const getCurrentUser=()=>{
        const user :any= localStorage.getItem('session-data');
        if(user){
            setCurrentUser(JSON.parse(user).name)
        }
    }

    useEffect(()=>{
        getCurrentUser()
    },[])

    return (
        <div className='h-10  mb-2 w-full  flex'>
            <div className='w-1/4 flex justify-end items-center font-bold gap-2'>
                <span className="material-icons">account_circle</span>     
                <div>{currentUser}</div>
            </div>
            <div className='text-3xl font-bold text-[color:var(--accent)] 
            w-1/2 flex items-center justify-center cursor-pointer' onClick={()=> push('/')}
            >TypeGuru</div>
            <div className='w-1/4 flex items-center gap-4 justify-center'>
            <button className="
                bg-[color:var(--secondaryColor)] px-4 py-2 rounded-xl
                cursor-pointer font-bold hover:bg-[color:var(--highlightColor)]"
                onClick={()=> push('/leaderboard-page')}>
                    Leaderboard
            </button>
            <button className="
                bg-[color:var(--accent)] px-4 py-2 rounded-xl
                cursor-pointer font-bold hover:bg-[color:var(--highlightColor)]"
                onClick={()=> push('/sign-page')}>
                    Sign
            </button>
            </div>
      </div>
    )
  }
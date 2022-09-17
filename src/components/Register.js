import React, { useContext, useState } from 'react'
import { AppConfig } from '../context/AppConfig'
function Register() {
    const [name, setName] = useState("")
    const [regno, setRegno] = useState("")
    console.log(name, regno)
    const { addMemberR } = useContext(AppConfig);

    // const registerMember = () => {
    //     addMember("gautham", "21brs1032")
    // }
    return (
        <div className='bg-sky-900 h-screen flex items-center justify-center'>
            <div className="registrationBox flex gap-10 justify-center items-center flex-col border-2 border-white border-2 rounded-lg p-6">
                <div className='font-bold text-blue-50 text-2xl'>Leaderboard Registration</div>
                <div className='registrationName flex items-center'>
                    <p className='text-white font-semibold bg-gray-800 rounded-md p-1 m-2 w-fit'>Name</p>
                    <input className='rounded-lg p-2' type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='registrationRegNo flex items-center '>
                    <p className='text-white font-semibold bg-gray-800 rounded-md p-1 m-2 w-fit'>Register Number</p>
                    <input className='rounded-lg p-2' type="text" value={regno} onChange={e => setRegno(e.target.value)} />
                </div>


                <button onClick={e => addMemberR(name, regno)} className="w-fit px-6 py-2 bg-slate-500 rounded-xl active:bg-slate-400  hover:bg-sky-100">Register</button>
            </div>
        </div >
    )
}

export default Register
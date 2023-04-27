import React, { useContext, useState } from 'react'
import { AppConfig } from '../context/AppConfig';

function SetCoordinator() {
    const { setCoordinator } = useContext(AppConfig);
    const [walletAddress, setWalletAddress] = useState("")
    const [role, setRole] = useState("")
    return (
        <div className='flex flex-col gap-6 justify-center items-center'>
            <div className='registrationName flex items-center'>
                <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Wallet Address</p>
                <input onChange={e => setWalletAddress(e.target.value)} className='rounded-lg p-2' type="text" />
                <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Department/Team</p>
                <input onChange={e => setRole(e.target.value)} className='rounded-lg p-2' type="text" />
            </div>
            <button onClick={() => setCoordinator(walletAddress, role)} className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105 hover:bg-red-300">Set Coordinator</button>
        </div>
    )
}

export default SetCoordinator
import React from 'react'
import { useContext, useState } from 'react'
import { AppConfig } from '../context/AppConfig'

function DeductPts() {
    const { membersdata, minusPoints } = useContext(AppConfig);
    const [wallet, setWallet] = useState("")
    const [points, setPoints] = useState("");
    const deductpts = () => {
        for (let i = 0; i < membersdata.length; i++) {
            if (membersdata[i][5] === wallet) {
                minusPoints(wallet, points);
            }
        }
    }
    return (
        <div className='flex flex-col gap-6 justify-center items-center'>
            <div className='registrationName flex items-center gap-6'>
                <div className="flex flex-col">
                    <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Wallet Address</p>
                    <input value={wallet} onChange={e => setWallet(e.target.value)} className='rounded-lg p-2' type="text" />
                </div>
                <div className="flex flex-col">
                    <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Points</p>
                    <input value={points} onChange={e => setPoints(parseInt(e.target.value))} className='rounded-lg p-2 w-24' type="text" />
                </div>


            </div>
            <button onClick={deductpts} className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Deduct Points➖</button>
        </div>
    )
}

export default DeductPts
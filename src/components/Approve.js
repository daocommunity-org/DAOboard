import React, { useContext, useState } from 'react'
import { AppConfig } from '../context/AppConfig';

function Approve() {
    const { approveTokens, isadmin } = useContext(AppConfig);
    const [wallet, setWallet] = useState("")
    const [tokens, setTokens] = useState("")

    const approveTxn = async () => {
        if (isadmin) {
            try {
                await approveTokens(wallet, parseInt(tokens))
                alert(`${tokens} Tokens has approved for ${wallet}. Please wait for 30-40s before you claim your tokens`)
            } catch (error) {
                console.log(error)
                alert("Only contract deployer can invoke this function")
            }

        }
    }

    return (
        <div className='flex flex-col gap-6 justify-center items-center'>
            <div className='flex gap-4'>
                <div className="flex flex-col">
                    <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Wallet Address</p>
                    <input value={wallet} onChange={e => setWallet(e.target.value)} className='rounded-lg p-2' type="text" />
                </div>

                <div className="flex flex-col">
                    <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Tokens</p>
                    <input value={tokens} onChange={e => setTokens(parseInt(e.target.value))} className='rounded-lg p-2 w-24' type="text" />
                </div>
            </div>

            <button onClick={approveTxn} className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Approve✅</button>
        </div>
    )
}

export default Approve
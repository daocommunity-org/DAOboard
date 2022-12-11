import React, { useState, useContext } from 'react'
import { AppConfig } from '../context/AppConfig'
function RoleMember() {
  const { terminateUser, membersdata } = useContext(AppConfig);

  const [regno, setRegno] = useState("")
  const [wallet, setWallet] = useState("")
  const deactivate = () => {
    for (let i = 0; i < membersdata.length; i++) {
      if (membersdata[i][1].toLowerCase() === regno.toLowerCase() && membersdata[i][5] === wallet) {
        terminateUser(wallet);
        console.log("deactivated")
      }
    }
  }
  return (
    <div className='flex flex-col gap-6 justify-center items-center'>
      <div className='registrationRegNo flex items-center '>
        <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Register Number</p>
        <input value={regno} onChange={e => setRegno(e.target.value)} className='rounded-lg p-2' type="text" />
      </div>
      <div className='registrationRegNo flex items-center '>
        <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Wallet Address</p>
        <input value={wallet} onChange={e => setWallet(e.target.value)} className='rounded-lg p-2' type="text" />
      </div>
      <button onClick={deactivate} className="w-fit h-fit p-2 bg-slate-500 rounded-xl border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Deactivate</button>
    </div>
  )
}

export default RoleMember
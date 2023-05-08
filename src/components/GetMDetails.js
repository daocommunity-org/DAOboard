import { BigNumber } from 'ethers';
import React from 'react'
import { useContext, useState } from 'react'
import { AppConfig } from '../context/AppConfig'
import { ethers } from "ethers";
function GetMDetails() {
    const { membersdata } = useContext(AppConfig);
    const [regno, setRegno] = useState("")
    const [found, setFound] = useState([]);
    const [foundStatus, setFoundStatus] = useState(false)

    const searchFunc = () => {
        for (let i = 0; i < membersdata.length; i++) {
            if (membersdata[i][1].toLowerCase() === regno.toLowerCase()) {
                console.log(membersdata)
                setFound(membersdata[i]);
                setFoundStatus(true);
            }
        }
        console.log(found[2]._hex)
    }
    return (
        <div>
            <div className='flex flex-col gap-6 justify-center items-center'>
                <div className='registrationName flex items-center flex-col gap-6'>
                    <p className='text-white font-semibold bg-slate-500 rounded-md p-1 m-2 w-fit'>Registration Number</p>
                    <input className='rounded-lg p-2' type="text" value={regno} onChange={e => setRegno(e.target.value)} />
                    <button type='submit' onClick={searchFunc} className="w-fit h-fit p-2 bg-slate-500 rounded-xl  border-2 border-blue-200 active:bg-slate-400 transition-all ease-in-out hover:scale-105">Search</button>
                </div>
                <div className='flex items-center flex-col'>
                    {foundStatus &&
                        <div className='flex flex-col text-center'>
                            <p className='text-white'>Name : {found[0]}</p>
                            <p className='text-white'>Wallet Address : {found[6]}</p>
                            <p className='text-white'>Role : {found[5]}</p>
                            <p className='text-white'>Status : {found[3] ? "Active" : "Deactivated"}</p>
                            <p className='text-white'>Points : {parseInt(found[2]._hex, 16)} </p>
                        </div>

                    }

                </div>
            </div>
        </div>
    )
}

export default GetMDetails